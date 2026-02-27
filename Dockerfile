FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build typescript
RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]



