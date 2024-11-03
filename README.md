## Progress Tracking System
An application to track the progress of your tasks and get a summary.

## Table of Contents
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the App](#running-the-app)
- [Usage](#usage)
- [Additional Information](#additional-information)


## Installation
Follow these steps to get a local copy up and running.

#### Clone the repository
gh repo clone virTripathi/progress-tracking-system

## Environment Variables
Create an .env file
Duplicate .env.example as .env and update the variables according to your setup. You can do this by running:
#### cp .env.example .env
Add environment variables

Open the newly created .env file and set the required values for your database, port, and other settings as indicated in .env.example.

## Database Setup
Install dependencies
Run the following command to install all necessary packages:
#### npm install

### Run Migrations
Set up your database structure by running:

#### npx knex migrate:latest

### Seed the Database
Populate your database with initial data:
#### npx knex seed:run

## Running the App
Build the Application
Prepare the app for production by building it:
#### npm run build
### Start the Application
Run the app:

#### npm run start
Your app should now be running, and you can access it at the configured port in your .env file.

## Usage
Once the app is running, you can begin tracking tasks, updating their progress, and viewing summaries within the application.

## Additional Information
For further information on advanced configuration or troubleshooting, please [contact me](mailto:viratofficial07@gmail.com).
