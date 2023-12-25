# Використання базового образу з Node.js
FROM node:alpine as builder

# Додати залежності для sharp
RUN apk add --no-cache vips-dev fftw-dev build-base python3 make g++

# Встановлення робочого директорію у контейнері
WORKDIR /app

# Копіювання package.json та package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Встановлення залежностей проекту
RUN npm install

# Копіювання всіх файлів проекту у контейнер
COPY ./ ./

# Компіляція TypeScript у JavaScript
RUN npm run build

# Використання меншого базового образу для продакшн
FROM node:alpine

# Встановлення робочого директорію у новому контейнері
WORKDIR /app

# Створення директорії media
RUN mkdir -p /app/media

# Копіювання скомпільованих файлів з попереднього етапу
COPY --from=builder /app/dist ./dist
# Копіювання node_modules з попереднього етапу
COPY --from=builder /app/node_modules ./node_modules

CMD ["node", "dist/index.js"]
