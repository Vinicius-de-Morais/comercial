import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import api from '../services/api';

const VendaList = ({ navigation }) => {
  const [vendas, setVendas] = useState([]);

  const fetchVendas = async () => {
    try {
      const response = await api.get('/venda');
      setVendas(response.data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as vendas');
    }
  };

  const deleteVenda = async (id) => {
    try {
      await api.delete(`/venda/remover/${id}`);
      Alert.alert('Sucesso', 'Venda excluída!');
      fetchVendas();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível excluir a venda');
    }
  };

  useEffect(() => {
    fetchVendas();
  }, []);

  const renderVenda = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>
        Produto: {item.produto?.nome} - Quantidade: {item.quantidade}
      </Text>
      <Button title="Editar" onPress={() => navigation.navigate('Nova Venda', { venda: item })} />
      <Button title="Excluir" onPress={() => deleteVenda(item.id)} color="red" />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={vendas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderVenda}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Nova Venda')}
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

export default VendaList;
