import { Request, Response } from 'express';
import knex from '../database/knex';
import { error } from 'console';

export const startTask = async (req: Request, res: Response) => {
    try {
        const { task_id } = req.body;
        if(!task_id) return res.status(400).json({error:'Task ID is required'});
        const userId = req.user?.id;
        const task = await knex('tasks').where({ id: task_id }).first();
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        const userTaskProgress = await knex('user_task_progress')
            .where({ user_id: userId, task_id: task_id })
            .first();

        if (userTaskProgress) {
            if (userTaskProgress.status === 'completed') {
                return res.status(400).json({ message: 'Task already completed' });
            } else if (userTaskProgress.status === 'in_progress') {
                return res.status(400).json({ message: 'Task already started' });
            } else if (userTaskProgress.status === 'pending') {
                await knex('user_task_progress')
                    .where({ user_id: userId, task_id: task_id })
                    .update({
                        status: 'in_progress',
                        started_at: new Date(),
                        updated_at: new Date()
                    });
                return res.status(200).json({ message: 'Task started successfully' });
            }
        }
        await knex('user_task_progress').insert({
            user_id: userId,
            task_id: task_id,
            status: 'in_progress',
            started_at: new Date(),
            created_at: new Date(),
            updated_at: new Date()
        });

        return res.status(200).json({ message: 'Task started successfully' });
    } catch (error) {
        console.error('Error starting task:', error);
        return res.status(500).json({ message: 'An error occurred while starting the task' });
    }
};

export const completeTask = async (req: Request, res: Response) => {
  try {
    const task_id = req.body.task_id;
    if(!task_id) return res.status(400).json({error:'Task ID is required'});
    const userId = req.user?.id;

    const userTaskProgress = await knex('user_task_progress')
      .where({ user_id: userId, task_id: task_id })
      .first();

    if (!userTaskProgress) {
      return res.status(404).json({ message: 'Task not found or not started by user.' });
    }

    if (userTaskProgress.status === 'completed') {
      return res.status(400).json({ message: 'Task is already completed.' });
    }

    await knex('user_task_progress')
      .where({ user_id: userId, task_id: task_id })
      .update({
        status: 'completed',
        completed_at: new Date(),
        updated_at: new Date(),
      });

    res.status(200).json({ message: 'Task completed successfully.' });
  } catch (error) {
    console.error('Error completing task:', error);
    res.status(500).json({ message: 'Failed to complete task', error });
  }
};

export const progress = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id;
      const summary = await knex('user_task_progress')
      .where('user_id', userId)
      .select([
        knex('tasks').count().as('totalTasks'),
        knex.raw(`COUNT(user_task_progress.task_id) AS assignedTasks`),
        knex.raw(`SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END) AS noOfStartedTasks`),
        knex.raw(`SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completedTasks`)
      ])
      .first();
      console.log(summary);
      res.status(200).json({ 
        totalTasks: summary?.totalTasks || 0,
        assignedTasks: summary?.assignedtasks || 0,
        noOfStartedTasks: summary?.noofstartedtasks || 0,
        completedTasks: summary?.completedtasks || 0,
       });
    } catch (error) {
      console.error('Error retrieving user progress:', error);
      res.status(500).json({ message: 'Failed to retrieve progress', error });
    }
  };