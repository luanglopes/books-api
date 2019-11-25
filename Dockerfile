# Use an image
FROM node:lts

# Create app folder
WORKDIR /home/app

# Dependencies
COPY package*.json ./
RUN npm i --only=prod

# Copy app files
COPY src src
COPY .env .env

# Exposes container port 3000
EXPOSE 3000

# Run application
CMD ["node", "src/server.js"]
