# 🎬 TP2 - CRUD con SQLite (Expo)

Aplicación móvil desarrollada con **React Native (Expo)** que permite realizar un **CRUD (Crear, Leer, Actualizar y Eliminar)** de películas utilizando **SQLite local** como base de datos.

---

## 📖 Descripción

Esta app permite gestionar una lista de películas almacenadas localmente.  
Podés **agregar**, **editar**, **buscar** y **eliminar** películas de una base de datos SQLite usando el nuevo API asincrónico de Expo.

---

## ⚙️ Requisitos

- Node.js
- Expo CLI
- Expo Go

---

## 🚀 Instalación y ejecución

```bash
# Clonar el repositorio
git clone <tu-repo>
cd TP2-CRUD

# Instalar dependencias
npm install

# Instalar dependencias manuales necesarias
expo install expo-sqlite
npm install @react-navigation/native @react-navigation/stack
expo install react-native-screens react-native-gesture-handler

# Iniciar el proyecto
npx expo start