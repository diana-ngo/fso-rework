# Full Stack Open

My solutions to the exercises from [Full Stack Open](https://fullstackopen.com), the University of Helsinki's course on modern web development.

Full Stack Open is an introduction to building single-page applications with React, supported by REST and GraphQL APIs written in Node.js. It also covers testing, state management, TypeScript, relational and document databases, containerization, and CI/CD.

## Progress

| Part | Topic | Status |
| --- | --- | --- |
| 1 | Introduction to React | ✅ |
| 2 | Communicating with server | ✅ |
| 3 | Programming a server with NodeJS and Express | 🚧 |
| 4 | Testing Express servers, user administration | ⬜ |
| 5 | Testing React applications | ⬜ |
| 6 | Advanced state management | ⬜ |
| 7 | More React topics | ⬜ |
| 8 | GraphQL | ⬜ |
| 9 | TypeScript | ⬜ |
| 10 | React Native | ⬜ |
| 11 | Continuous Integration / Continuous Delivery | ⬜ |
| 12 | Containers | ⬜ |
| 13 | Using relational databases | ⬜ |
| 14 | Next.js | ⬜ |

## Repository layout

Each exercise is an independent npm project under its part's directory. There is no root `package.json` and no workspace configuration — every project has its own dependencies and lockfile, matching how the course treats them.

```
part1/
  intro/          course-info/    unicafe/       anecdotes/
part2/
  course-info/    notes/          phonebook/     countries/
part3/
  notes-be/       phonebook-be/
```

## Running a project

Frontend projects (parts 1–2) are Vite apps:

```bash
cd part2/phonebook
npm install
npm run dev
```

Some part 2 exercises expect a local JSON Server for their data. Where a `db.json` is present, start it alongside the dev server:

```bash
npm run server    # serves db.json on port 3001
```

Backend projects (part 3) are plain Node/Express servers:

```bash
cd part3/phonebook-be
npm install
npm run dev       # node --watch
```

Projects that read configuration from the environment expect a `.env` file in the project directory. These are not committed; see each project's source for the variables it reads.

## Deployments

| Project | URL |
| --- | --- |
| _part 3 phonebook backend_ | _not yet deployed_ |

## Tech

React · Node.js · Express · MongoDB · PostgreSQL · GraphQL · TypeScript · React Native · Docker · Next.js
