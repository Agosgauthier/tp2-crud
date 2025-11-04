import * as React from "react";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import FormScreen from "./screens/FormScreen";
import { initDB } from "./db"; // 👈 importá la base de datos

const Stack = createStackNavigator();

export default function App() {
  // Al iniciar la app, se crea la base de datos si no existe
  useEffect(() => {
    const startDB = async () => {
      try {
        await initDB();
        console.log("✅ Base de datos inicializada");
      } catch (error) {
        console.log("❌ Error al inicializar la base de datos:", error);
      }
    };
    startDB();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Listado de Películas" }}
        />
        <Stack.Screen
          name="Form"
          component={FormScreen}
          options={{ title: "Agregar / Editar Película" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
