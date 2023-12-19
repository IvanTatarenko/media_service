# Використання базового образу з Node.js
FROM node:latest as builder

# Встановлення робочого директорію у контейнері
WORKDIR /usr/src/app

# Копіювання package.json та package-lock.json
COPY package.json package-lock.json ./

# Встановлення залежностей проекту
RUN npm install

# Копіювання всіх файлів проекту у контейнер
COPY . .

# Компіляція TypeScript у JavaScript
RUN npm run build

# Використання меншого базового образу для продакшн
FROM node:alpine

# Встановлення робочого директорію у новому контейнері
WORKDIR /usr/src/app

# Копіювання скомпільованих файлів з попереднього етапу
COPY --from=builder /usr/src/app/dist ./dist

CMD ["node", "dist/index.js"]
