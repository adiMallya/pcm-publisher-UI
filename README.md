# PCM Publisher UI

## About

This is the React project for the PCM Publisher application, built by us for Epsilon Hackathon 2024.

## Setup

```bash

# Clone the repo
$ git clone https://github.com/adiMallya/pcm-publisher-UI.git && cd pcm-publisher-UI

# Option 1:
# Install dependencies
$ npm i
# To run the app (dev mode)
$ npm run dev
# To build app for production
$ npm run start

# Option 2 (requires Docker):
# To run the app (dev mode)
$ docker build . --target development -t publisher-app:dev
$ docker run -p 5173:3000 -v .:/usr/src/app publisher-app:dev
```
