FROM node:20-alpine


WORKDIR /src


ENV PORT=8081


COPY package*.json .


RUN npm install



COPY . .


EXPOSE 8081


CMD ["npm","run","dev"] 