# Gunakan image Node.js versi LTS sebagai base image
FROM node:18

# Set working directory di dalam container
WORKDIR /app

# Copy package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install && npm install -g nodemon

# Copy semua file project ke working directory
COPY . .

# Expose port yang digunakan oleh aplikasi
EXPOSE 5000

# SET NODE_ENV agar sequelize bisa baca config dengan benar
ENV NODE_ENV=development

# Command untuk menjalankan aplikasi
CMD ["sh", "-c", "npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all && npm run dev"]
