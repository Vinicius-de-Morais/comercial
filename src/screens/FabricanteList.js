import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import api from '../services/api';

const FabricanteList = ({ navigation }) => {
  const [fabricantes, setFabricantes] = useState([]);

  const fetchFabricantes = async () => {
    try {
      const response = await api.get('/fabricante');
      setFabricantes(response.data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os fabricantes');
    }
  };
  

  const deleteFabricante = async (id) => {
    try {
      await api.delete(`/fabricante/remover/${id}`);
      Alert.alert('Sucesso', 'Fabricante excluído!');
      fetchFabricantes();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível excluir o fabricante');
    }
  };

  useEffect(() => {
    fetchFabricantes();
  }, []);

  const renderFabricante = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item.nomeFantasia}</Text> 
      <Button title="Editar" onPress={() => navigation.navigate('Novo Fabricante', { fabricante: item })} />
      <Button title="Excluir" onPress={() => deleteFabricante(item.id)} color="red" />
    </View>
  );
  

  return (
    <View style={styles.container}>
      <FlatList
        data={fabricantes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderFabricante}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Novo Fabricante')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#007BFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  addButtonText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default FabricanteList;
