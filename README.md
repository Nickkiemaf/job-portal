Job Portal API

FEATURES:
Register users
Post jobs
Search jobs
Apply for jobs
Manage applications
Company profiles
Analytics dashboard


TABLE OF CONTENTS

About the Project
Built With
Getting Started
Routes



1. About the Project

Cirvee is a web-based job portal API that allows job seekers to register, search and apply for jobs, and companies to post listings, manage applications, and track analytics.


2. Built With


Node.js / Express
TypeScript
PostgreSQL



3. Getting Started

bashgit clone https://github.com/your-username/cirvee.git
cd cirvee
npm install

Create a .env file:

envPORT=
DATABASE_URL=
JWT_SECRET=

bashnpm run dev


4. Routes

Auth

POST /signup
{ } = req.body

POST /login
{ } = req.body

PATCH /resetpassword
{ } = req.body


Jobs

GET /jobs/search
{ } = req.query

POST /jobs                          [Auth - Company]
{ } = req.body

GET /jobs                           [Auth - Job_seeker, Company]

GET /jobs/:id                       [Auth - Job_seeker, Company]

PATCH /jobs/:id                     [Auth - Company]
{ } = req.body

DELETE /jobs/:id                    [Auth - Company]

GET /jobs/:id/application


Applications

POST /jobs/:id/apply                [Auth - Job_seeker]
{ } = req.body

GET /applications/me                [Auth - Job_seeker]

PUT /applications/:id/status        [Auth - Company]
{ } = req.body

DELETE /applications/:id            [Auth - Job_seeker]


Companies

GET /companies/:id                  [Auth - Company]

PUT /companies/:id                  [Auth - Company]
{ } = req.body


Analytics

GET /analytics/employer             [Auth - Company]

GET /analytics/jobs/:id             [Auth - Company]



Auth header: Authorization: Bearer <token>