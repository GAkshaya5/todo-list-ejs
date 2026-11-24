# Todo List App (EJS)

MERN Assignment 7 - a simple Todo List built with Node.js, Express and EJS.

**Deploy link:** https://todo-list-ejs-r50d.onrender.com

## Features

- Add a task with a priority (High, Medium, Low)
- Edit and delete tasks
- Filter tasks by priority
- Alert when the input box is empty
- Header and footer on every page
- Responsive layout for mobile and desktop
- Tasks are stored in an array (resets when the server restarts)

## Routes

| Method | Route             | What it does              |
| ------ | ----------------- | ------------------------- |
| GET    | /                 | Show tasks (`?priority=`) |
| POST   | /todos            | Add a task                |
| GET    | /todos/:id/edit   | Open edit page            |
| PUT    | /todos/:id        | Update a task             |
| DELETE | /todos/:id        | Delete a task             |

PUT and DELETE are sent from HTML forms using the `method-override` package.

## Run locally

```
npm install
npm start
```

Then open http://localhost:3000

## Deploy on Render

- Build command: `npm install`
- Start command: `node index.js`