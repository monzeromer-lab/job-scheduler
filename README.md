# Job Scheduler Microservice

This project is a Job Scheduler Microservice built with Nest.js, TypeScript, and PostgreSQL. It allows you to schedule jobs, manage job-related data, and execute jobs based on a specified cron expression.

> jobs will send HTTP request based on the given data.

## Features

- **Job Scheduling**: Schedule jobs with flexible configurations using cron expressions.
- **API Endpoints**:
  - `GET /jobs`: List all available jobs.
  - `GET /jobs/:id`: Retrieve details of a specific job by ID.
  - `POST /jobs`: Create new jobs with validation.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/monzeromer-lab/job-scheduler.git
   cd job-scheduler
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

## Configuration

Create a `.env` file in the root directory and set the following environment variables:

```bash
PS_PWD=your_postgres_password
PS_HOST=localhost
PS_PORT=5432
PS_NAME=your_database_name
PS_USERNAME=your_postgres_username

REDIS_HOST=localhost
REDIS_PORT=6379
```

## Running the Application

1. **Start the application**:

   ```bash
   npm start
   ```

## Swagger API Documentation

Swagger documentation is available at [http://localhost:3000/api](http://localhost:3000/api).
