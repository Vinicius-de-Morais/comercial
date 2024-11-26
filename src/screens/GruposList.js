import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import api from '../services/api';

const GrupoList = ({ navigation }) => {
  const [grupos, setGrupos] = useState([]);

  const fetchGrupos = async () => {
    try {
      const response = await api.get('/grupo');
      setGrupos(response.data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os grupos');
    }
  };

  const deleteGrupo = async (id) => {
    try {
      await api.delete(`/grupo/remover/${id}`);
      Alert.alert('Sucesso', 'Grupo excluído!');
      fetchGrupos();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível excluir o grupo');
    }
  };

  useEffect(() => {
    fetchGrupos();
  }, []);

  const renderGrupo = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item.nome}</Text>
      <Button title="Editar" onPress={() => navigation.navigate('Editar Grupo', { grupo: item })} />
      <Button title="Excluir" onPress={() => deleteGrupo(item.id)} color="red" />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={grupos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderGrupo}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Novo Grupo')}
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

export default GrupoList;
