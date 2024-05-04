FROM node:21-alpine AS base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
# For development server
FROM base AS development
COPY . .
CMD ["npm", "run", "dev"]
# For production server
FROM base AS production
COPY . .
RUN npm prune --production
CMD ["npm", "run", "start"]

