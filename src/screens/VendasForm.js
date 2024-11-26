import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert, ActivityIndicator } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const VendaForm = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carregar os produtos da API
  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/comercial/api/produto');
        const produtosData = response.data.map(produto => ({
          label: produto.nome,
          value: produto.id,
        }));
        setProdutos(produtosData);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        Alert.alert('Erro', 'Não foi possível carregar os produtos');
        setLoading(false);
      }
    };
    fetchProdutos();
  }, []);

  // Validação do formulário com Yup
  const validationSchema = Yup.object().shape({
    produtoId: Yup.string().required('Selecione um produto'),
    quantidade: Yup.number()
      .required('Digite a quantidade')
      .positive('A quantidade deve ser positiva')
      .integer('A quantidade deve ser um número inteiro'),
  });

  // Submissão do formulário
  const handleSubmit = async (values, { resetForm }) => {
    // Criar o objeto de venda no formato esperado pelo backend
    const vendaData = {
      quantidade: values.quantidade,
      produto: {
        id: values.produtoId,  // Associar o produto com base no ID selecionado
      },
    };

    try {
      await axios.post('http://localhost:8080/comercial/api/venda/novo', vendaData);
      Alert.alert('Sucesso', 'Venda salva com sucesso!');
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar venda:', error);
      Alert.alert('Erro', 'Não foi possível salvar a venda');
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando produtos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ produtoId: '', quantidade: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
          <View>
            <Text style={styles.label}>Produto</Text>
            <RNPickerSelect
              onValueChange={(value) => setFieldValue('produtoId', value)}
              items={produtos}
              placeholder={{ label: 'Selecione um produto', value: '' }}
              style={pickerSelectStyles}
            />
            {touched.produtoId && errors.produtoId && (
              <Text style={styles.error}>{errors.produtoId}</Text>
            )}

            <Text style={styles.label}>Quantidade</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={handleChange('quantidade')}
              onBlur={handleBlur('quantidade')}
              value={values.quantidade}
              placeholder="Digite a quantidade"
            />
            {touched.quantidade && errors.quantidade && (
              <Text style={styles.error}>{errors.quantidade}</Text>
            )}

            <Button title="Salvar Venda" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginBottom: 16,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginBottom: 16,
  },
};

export default VendaForm;
