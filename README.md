<p align="center">
  <img src="client/assets/images/title-nobg.png" alt="SommelIO Title" />
</p>

<p align="center"><em>Elevate Your Wine Experience with Seamless Precision</em></p>

<p align="center">
  <img src="https://img.shields.io/github/last-commit/riccbru/SommelIO?color=blue" />
  <img src="https://img.shields.io/github/languages/top/riccbru/SommelIO?color=yellow" />
  <img src="https://img.shields.io/github/languages/count/riccbru/SommelIO" />
</p>

<p align="center">
  <a href="https://www.docker.com/"><img src="https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white" /></a>
  <a href="https://www.postgresql.org/"><img src="https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white" /></a>
  <a href="https://www.prisma.io/"><img src="https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma" /></a>
  <a href="https://www.npmjs.com/"><img src="https://img.shields.io/badge/npm-CB3837?style=flat&logo=npm&logoColor=white" /></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white" /></a>
  <a href="https://nodemon.io/"><img src="https://img.shields.io/badge/Nodemon-76D04B?style=flat&logo=nodemon" /></a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black" /></a>
  <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express-black?style=flat&logo=express" /></a>
  <a href="https://zod.dev/"><img src="https://img.shields.io/badge/Zod-2D3748?style=flat" /></a>
  <a href="https://www.dotenv.org/docs/"><img src="https://img.shields.io/badge/.ENV-ECD53F?style=flat&logo=dotenv&logoColor=black" /></a>
  <a href="https://typestrong.org/ts-node/docs/"><img src="https://img.shields.io/badge/ts-node-3178C6?style=flat&logo=ts-node&logoColor=white" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white" /></a>
  <a href="https://react.i18next.com/"><img src="https://img.shields.io/badge/i18n-26A69A?style=flat&logo=i18next&logoColor=white" /></a>
  <a href="https://expo.dev/"><img src="https://img.shields.io/badge/Expo-000020?style=flat&logo=expo&logoColor=white" /></a>
  <a href="https://reactnative.dev/"><img src="https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB" /></a>
  <a href="https://axios-http.com/docs/intro"><img src="https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white" /></a>
  <a href="https://eslint.org/"><img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint&logoColor=white" /></a>
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

- Install dependencies
```bash
cd SommelIO; npm run install:all
```

- Add Android Studio environment variables:
```bash
echo "export ANDROID_HOME=$HOME/Library/Android/sdk" >> ~/.zshrc
echo "export PATH=$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools:$PATH" >> ~/.zshrc
exec zsh
```

### DEVELOPMENT

- `Postgres DB`
   - Start
      ```bash
      docker compose up
      ```
   - Stop
      ```bash
      docker compose down -v
      ```

- Start `Backend server`
   ```bash
   cd server; nodemon .
   ```
- Start `Expo client`
   ```bash
   cd client; npx expo start --clear
   ```

### BUILD

- Build fresh native projects:
   ```bash
   cd client; npx expo prebuild --clean;
   ```

- #### iOS
   - Run on XCode simulator:
   ```bash
   npx expo run:ios
   ```

   - Run on physical iPhone (build project on XCode):
   ```bash
   xed ios/*.xcworkspace
   ```

   - Build on XCode and start the Metro JS bundler using:
   ```bash
   npx expo start --dev-client
   ```

- #### Android

   - Android emulator
      ```bash
      npx expo run:android
      ```

   - EAS Android Preview:
      ```bash
      eas build --platform android --profile preview
      ```
