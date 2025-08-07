# # # # Etapa de construcción
# # # FROM node:18-alpine as builder

# # # WORKDIR /app

# # # # Copiar archivos de dependencias
# # # COPY package*.json ./

# # # # Instalar dependencias
# # # RUN npm ci

# # # # Copiar código fuente
# # # COPY . .

# # # # Construir aplicación
# # # RUN npm run build

# # # # Etapa de producción
# # # FROM nginx:alpine

# # # # Copiar archivos construidos
# # # COPY --from=builder /app/dist /usr/share/nginx/html

# # # # Copiar configuración personalizada de nginx
# # # COPY nginx.conf /etc/nginx/conf.d/default.conf

# # # # Exponer puerto
# # # EXPOSE 80

# # # # Comando de inicio
# # # CMD ["nginx", "-g", "daemon off;"]

# # # Etapa de construcción
# # FROM node:18-alpine as build

# # WORKDIR /app

# # # Copiar archivos de dependencias
# # COPY package*.json ./

# # # Instalar dependencias
# # RUN npm ci --only=production

# # # Copiar código fuente
# # COPY . .

# # # Construir la aplicación
# # RUN npm run build

# # # Etapa de producción
# # FROM nginx:alpine

# # # Copiar la configuración personalizada de nginx
# # COPY nginx.conf /etc/nginx/conf.d/default.conf

# # # Copiar los archivos construidos desde la etapa de build
# # COPY --from=build /app/dist /usr/share/nginx/html

# # # Exponer puerto 80
# # EXPOSE 80

# # # Comando por defecto
# # CMD ["nginx", "-g", "daemon off;"]

# # Etapa de construcción
# FROM node:18-alpine as build

# WORKDIR /app

# # Copiar archivos de dependencias
# COPY package*.json ./

# # Instalar dependencias
# RUN npm ci --only=production

# # Copiar código fuente
# COPY . .

# # Configurar variable de entorno para producción
# ENV VITE_API_URL=/api

# # Construir la aplicación
# RUN npm run build

# # Etapa de producción
# FROM nginx:alpine

# # Copiar la configuración personalizada de nginx
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Copiar los archivos construidos desde la etapa de build
# COPY --from=build /app/dist /usr/share/nginx/html

# # Exponer puerto 80
# EXPOSE 80

# # Comando por defecto
# CMD ["nginx", "-g", "daemon off;"]

# Etapa de construcción
FROM node:18-alpine as build

WORKDIR /app

# Instalar dependencias necesarias para Alpine
RUN apk add --no-cache python3 make g++

# Copiar archivos de dependencias
COPY package*.json ./

# Limpiar caché de npm y reinstalar dependencias
RUN npm cache clean --force
RUN rm -rf node_modules package-lock.json
RUN npm install

# Copiar código fuente
COPY . .

# Configurar variable de entorno para producción
ENV VITE_API_URL=/api

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copiar la configuración personalizada de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos construidos desde la etapa de build
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer puerto 80
EXPOSE 80

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]