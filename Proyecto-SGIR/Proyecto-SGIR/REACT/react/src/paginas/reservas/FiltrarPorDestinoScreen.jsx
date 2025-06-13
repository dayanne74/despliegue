import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function FiltrarPorDestinoScreen() {
  const [servicios, setServicios] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const obtenerServicios = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/servicios');
        setServicios(res.data);
      } catch (error) {
        console.error('Error al obtener servicios:', error);
      }
    };
    obtenerServicios();
  }, []);

  const handleSeleccionar = (servicio) => {
    navigation.navigate('Reserva', { servicio });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleSeleccionar(item)}>
      <Text style={styles.tipo}>{item.tipo.toUpperCase()}</Text>
      <Text style={styles.nombre}>{item.nombre}</Text>
      <Text style={styles.destino}>Destino: {item.destino}</Text>
      <Text style={styles.precio}>${item.precio}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={servicios}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  card: {
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  tipo: { fontSize: 14, color: '#2563EB', fontWeight: 'bold' },
  nombre: { fontSize: 18, fontWeight: 'bold', marginTop: 4 },
  destino: { fontSize: 14, color: '#475569', marginTop: 2 },
  precio: { fontSize: 16, color: '#059669', marginTop: 6 },
});
