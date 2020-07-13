# Use an image
FROM node:lts

# Create app folder
WORKDIR /home/app

# Dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn

# Copy code and config files
COPY src src
COPY .env .env
COPY ormconfig.json ormconfig.json
COPY tsconfig.json tsconfig.json
COPY babel.config.js babel.config.js

# Build
RUN yarn build

# Add wait
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

# Exposes container port 3333
EXPOSE 3333

# Run application
CMD /wait && yarn start
