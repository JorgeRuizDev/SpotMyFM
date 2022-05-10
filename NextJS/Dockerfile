FROM node:16.15-alpine3.14

# Create app directory
WORKDIR /usr/src/app
ENV NODE_OPTIONS=--max_old_space_size=4096
COPY package*.json ./
RUN npm install

COPY . .
ENV NODE_ENV=production
RUN npm run build



EXPOSE 3000

CMD ["npm", "run", "start"]


