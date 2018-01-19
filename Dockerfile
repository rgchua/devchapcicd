FROM node

# Setup
WORKDIR /usr/src/cicd
ADD ./ ./
RUN npm install --no-shrinkwrap

# Execute
CMD node_modules/.bin/ts-node src/index.ts
