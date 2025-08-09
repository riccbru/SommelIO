<p align="center">
  <img src="client/assets/images/title/title-nobg.png" alt="SommelIO Title" />
</p>

<p align="center"><em>Elevate Your Wine Experience with Seamless Precision</em></p>

<p align="center">
  <img src="https://img.shields.io/github/last-commit/riccbru/SommelIO?color=blue" />
  <img src="https://img.shields.io/github/languages/top/riccbru/SommelIO?color=yellow" />
  <img src="https://img.shields.io/github/languages/count/riccbru/SommelIO" />
</p>

<p align="center"><em>Built with the tools and technologies:</em></p>

<p align="center">
  <img src="https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma" />
  <img src="https://img.shields.io/badge/npm-CB3837?style=flat&logo=npm&logoColor=white" />
  <img src="https://img.shields.io/badge/Nodemon-76D04B?style=flat&logo=nodemon" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/Express-black?style=flat&logo=express" />
  <img src="https://img.shields.io/badge/Zod-2D3748?style=flat" />
  <img src="https://img.shields.io/badge/.ENV-ECD53F?style=flat&logo=dotenv&logoColor=black" />
  <img src="https://img.shields.io/badge/ts-node-3178C6?style=flat&logo=ts-node&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Expo-000020?style=flat&logo=expo&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white" />
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint&logoColor=white" />
  <img src="https://img.shields.io/badge/JSON-000000?style=flat&logo=json" />
  <img src="https://img.shields.io/badge/Markdown-000000?style=flat&logo=markdown" />
</p>

---

## Table of Contents
- [Overview](#overview)
- [Installation](#installation)

---

## Overview
**Author:** [riccbru](https://github.com/riccbru)

React Native project for tracking all wines and beers I tasted, in accordance with the tasting guidelines of [Associazione Italiana Sommelier](https://aisitalia.it).

## Installation

First, install `node_modules` via `npm install` in `SommelIO/server` and `SommelIO/client`.

#### DEVELOPMENT
- `Postgres DB` (in **SommelIO/**)
    - Start
        ```bash
        docker compose up
        ```
    - Stop
        ```bash
        docker compose down -v
        ```
- `Backend server` (in **SommelIO/server**)
```bash
nodemon .
```

- `Expo client` (in **SommelIO/client**)
```bash
npx expo start --clear
```

#### BUILD



