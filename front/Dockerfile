# Используем официальный образ Node.js версии 14
FROM node:latest

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json (или yarn.lock)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта внутрь контейнера
COPY . .

# Собираем статические файлы вашего Next.js приложения
RUN npm run build

# Запускаем сервер Next.js
CMD ["npm", "run", "start"]