import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getPeliculas, deletePelicula, initDB } from '../db';

export default function HomeScreen() {
  const [peliculas, setPeliculas] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const navigation = useNavigation();

  const cargarDatos = async () => {
    await initDB();
    const data = await getPeliculas();
    setPeliculas(data);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', cargarDatos);
    return unsubscribe;
  }, [navigation]);

  const eliminar = (id) => {
    Alert.alert('Eliminar', '¿Seguro que querés borrar esta película?', [
      { text: 'Cancelar' },
      { text: 'Eliminar', onPress: async () => {
          await deletePelicula(id);
          cargarDatos();
          Alert.alert('Eliminado', 'La película fue eliminada con éxito.');
        }
      }
    ]);
  };

  // Filtrar resultados por texto de búsqueda
  const peliculasFiltradas = peliculas.filter(p =>
    p.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Form', { pelicula: item })}
    >
      <Text style={styles.title}>{item.titulo}</Text>
      <Text style={styles.subtitle}>{item.genero} - {item.anio}</Text>
      <TouchableOpacity style={styles.deleteButton} onPress={() => eliminar(item.id)}>
        <Text style={styles.deleteText}>Eliminar</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🎬 Mis Películas</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar película..."
        value={busqueda}
        onChangeText={setBusqueda}
      />
      <Button title="Agregar película" onPress={() => navigation.navigate('Form')} />
      <FlatList
        data={peliculasFiltradas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No hay películas registradas.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9fafc' },
  header: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 15, color: '#333' },
  searchInput: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 10,
    padding: 10, marginBottom: 15, backgroundColor: '#fff'
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  title: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 5 },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 5
  },
  deleteText: { color: '#fff', fontWeight: 'bold', paddingHorizontal: 10 },
  empty: { textAlign: 'center', color: '#777', marginTop: 30 }
});