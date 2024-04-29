# Development stage
FROM node:19.8.1-alpine AS development

# Create the working directory, including the node_modules folder for the sake of assigning ownership in the next command
RUN mkdir -p /usr/src/app/node_modules

# Change ownership of the working directory to the node:node user:group
# This ensures that npm install can be executed successfully with the correct permissions
RUN chown -R node:node /usr/src/app

# Set the user to use when running this image
# Non privilege mode for better security (this user comes with official NodeJS image).
USER node

# Set environment to development
ENV NODE_ENV=development

# Set the default working directory for the app
# It is a best practice to use the /usr/src/app directory
WORKDIR /usr/src/app

# Copy package files. A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY --chown=node:node package*.json ./

# Install dependencies
RUN npm install

# Necessary to run before adding application code to leverage Docker cache
RUN npm cache clean --force

# Copy the source
COPY --chown=node:node . .

# Generate Prisma files
RUN npm run prisma:generate

# Build the app
RUN npm run build

# Production stage
FROM node:19.8.1-alpine AS production

# Set environment to production
ENV NODE_ENV=production

# Set the default working directory for the app
WORKDIR /usr/src/app

# Copy files from development stage
COPY --chown=node:node --from=development /usr/src/app/dist ./dist
COPY --chown=node:node --from=development /usr/src/app/.env ./
COPY --chown=node:node --from=development /usr/src/app/package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy Prisma files
COPY --chown=node:node --from=development /usr/src/app/node_modules/.prisma/client  ./node_modules/.prisma/client

# Expose API port
EXPOSE 3000

# Execute command
CMD ["node", "dist/main"]
