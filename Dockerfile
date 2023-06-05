FROM node:alpine as dependencies
WORKDIR /f-storage-client
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

FROM node:alpine as builder
WORKDIR /f-storage-client
COPY . .
COPY --from=dependencies /f-storage-client/node_modules ./node_modules
RUN npm run build

FROM node:alpine as runner
WORKDIR /f-storage-client
ENV NODE_ENV production

COPY --from=builder /f-storage-client/public ./public
COPY --from=builder /f-storage-client/package.json ./package.json
COPY --from=builder /f-storage-client/.next ./.next
COPY --from=builder /f-storage-client/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]
