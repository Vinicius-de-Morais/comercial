import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import api from '../services/api';

const ProdutoList = ({ navigation }) => {
  const [produtos, setProdutos] = useState([]);

  const fetchProdutos = async () => {
    try {
      const response = await api.get('/produto');
      setProdutos(response.data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os produtos');
    }
  };

  const deleteProduto = async (id) => {
    try {
      await api.get(`/produto/remover/${id}`);
      Alert.alert('Sucesso', 'Produto excluído!');
      fetchProdutos();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível excluir o produto');
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const renderProduto = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item.nome} - R$ {item.precoCompra}</Text>
      <Button title="Editar" onPress={() => navigation.navigate('Novo Produto', { produto: item })} />
      <Button title="Excluir" onPress={() => deleteProduto(item.id)} color="red" />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduto}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Novo Produto')}
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

export default ProdutoList;
