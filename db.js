import { openDatabaseAsync } from "expo-sqlite";

let db;

// Inicializa la base de datos y crea la tabla
export const initDB = async () => {
  db = await openDatabaseAsync("tp2crud.db");
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS peliculas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      genero TEXT NOT NULL,
      anio TEXT NOT NULL
    );
  `);
  console.log("📀 Base de datos lista");
};

// Obtener todas las películas
export const getPeliculas = async () => {
  if (!db) db = await openDatabaseAsync("tp2crud.db");
  const result = await db.getAllAsync("SELECT * FROM peliculas");
  return result;
};

// Agregar película
export const addPelicula = async (titulo, genero, anio) => {
  if (!db) db = await openDatabaseAsync("tp2crud.db");
  await db.runAsync(
    "INSERT INTO peliculas (titulo, genero, anio) VALUES (?, ?, ?)",
    [titulo, genero, anio]
  );
};

// Actualizar película
export const updatePelicula = async (id, titulo, genero, anio) => {
  if (!db) db = await openDatabaseAsync("tp2crud.db");
  await db.runAsync(
    "UPDATE peliculas SET titulo=?, genero=?, anio=? WHERE id=?",
    [titulo, genero, anio, id]
  );
};

// Eliminar película
export const deletePelicula = async (id) => {
  if (!db) db = await openDatabaseAsync("tp2crud.db");
  await db.runAsync("DELETE FROM peliculas WHERE id=?", [id]);
};
