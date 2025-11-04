import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { addPelicula, updatePelicula } from '../db';

export default function FormScreen({ route, navigation }) {
  const pelicula = route.params?.pelicula;
  const [titulo, setTitulo] = useState(pelicula ? pelicula.titulo : '');
  const [genero, setGenero] = useState(pelicula ? pelicula.genero : '');
  const [anio, setAnio] = useState(pelicula ? pelicula.anio : '');

  const guardar = async () => {
    if (!titulo || !genero || !anio) {
      Alert.alert('Error', 'Completá todos los campos');
      return;
    }
    if (pelicula) {
      await updatePelicula(pelicula.id, titulo, genero, anio);
      Alert.alert('Actualizado', 'Película modificada con éxito');
    } else {
      await addPelicula(titulo, genero, anio);
      Alert.alert('Guardado', 'Película agregada correctamente');
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{pelicula ? 'Editar película' : 'Agregar película'}</Text>

      <Text style={styles.label}>🎬 Título:</Text>
      <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} />

      <Text style={styles.label}>🎭 Género:</Text>
      <TextInput style={styles.input} value={genero} onChangeText={setGenero} />

      <Text style={styles.label}>📅 Año:</Text>
      <TextInput style={styles.input} value={anio} onChangeText={setAnio} keyboardType="numeric" />

      <View style={styles.buttonContainer}>
        <Button title="Guardar" onPress={guardar} color="#0066cc" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9fafc' },
  header: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  label: { fontSize: 16, marginTop: 10, color: '#333' },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 10,
    padding: 10, backgroundColor: '#fff', marginTop: 5
  },
  buttonContainer: { marginTop: 25, borderRadius: 10, overflow: 'hidden' }
});