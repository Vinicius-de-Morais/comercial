import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Formik } from 'formik';
import * as Yup from 'yup';
import api from '../services/api';

const ProdutoForm = () => {
  const [fabricantes, setFabricantes] = useState([]);
  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fabricantesData = await api.get('/fabricante');
        const gruposData = await api.get('/grupo');
        setFabricantes(
          fabricantesData.data.map((f) => ({ label: f.nomeFantasia, value: f.id }))
        );
        setGrupos(gruposData.data.map((g) => ({ label: g.nome, value: g.id })));
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os dados');
      }
    };
    fetchData();
  }, []);

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required('O nome do produto é obrigatório'),
    descricao: Yup.string().required('A descrição do produto é obrigatória'),
    precoCompra: Yup.number()
      .required('O preço de compra é obrigatório')
      .positive('O preço deve ser um valor positivo'),
    precoVenda: Yup.number()
      .required('O preço de venda é obrigatório')
      .positive('O preço deve ser um valor positivo'),
    fabricanteId: Yup.string().required('Selecione um fabricante'),
    grupoId: Yup.string().required('Selecione um grupo'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    console.log('Valores antes de enviar:', values); 

    try {

      const produtoData = {
        ...values,
        precoCompra: parseFloat(values.precoCompra),
        precoVenda: parseFloat(values.precoVenda),
        fabricante: { id: values.fabricanteId },
        grupo: { id: values.grupoId }
      };

      const response = await api.post('/produto/novo', produtoData);
      console.log('Produto salvo com sucesso:', response);
      Alert.alert('Sucesso', 'Produto salvo com sucesso!');
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      Alert.alert('Erro', 'Não foi possível salvar o produto');
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          nome: '',
          descricao: '',
          precoCompra: '',
          precoVenda: '',
          fabricanteId: '',
          grupoId: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
          <View>
            <Text style={styles.label}>Nome do Produto</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('nome')}
              onBlur={handleBlur('nome')}
              value={values.nome}
              placeholder="Digite o nome do produto"
            />
            {touched.nome && errors.nome && <Text style={styles.error}>{errors.nome}</Text>}

            <Text style={styles.label}>Descrição do Produto</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('descricao')}
              onBlur={handleBlur('descricao')}
              value={values.descricao}
              placeholder="Digite a descrição do produto"
            />
            {touched.descricao && errors.descricao && <Text style={styles.error}>{errors.descricao}</Text>}

            <Text style={styles.label}>Preço de Compra</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('precoCompra')}
              onBlur={handleBlur('precoCompra')}
              value={values.precoCompra}
              placeholder="Digite o preço de compra"
              keyboardType="numeric"
            />
            {touched.precoCompra && errors.precoCompra && <Text style={styles.error}>{errors.precoCompra}</Text>}

            <Text style={styles.label}>Preço de Venda</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('precoVenda')}
              onBlur={handleBlur('precoVenda')}
              value={values.precoVenda}
              placeholder="Digite o preço de venda"
              keyboardType="numeric"
            />
            {touched.precoVenda && errors.precoVenda && <Text style={styles.error}>{errors.precoVenda}</Text>}

            <Text style={styles.label}>Fabricante</Text>
            <RNPickerSelect
              onValueChange={(value) => setFieldValue('fabricanteId', value)}
              items={fabricantes}
              placeholder={{ label: 'Selecione um fabricante', value: '' }}
            />
            {touched.fabricanteId && errors.fabricanteId && <Text style={styles.error}>{errors.fabricanteId}</Text>}

            <Text style={styles.label}>Grupo</Text>
            <RNPickerSelect
              onValueChange={(value) => setFieldValue('grupoId', value)}
              items={grupos}
              placeholder={{ label: 'Selecione um grupo', value: '' }}
            />
            {touched.grupoId && errors.grupoId && <Text style={styles.error}>{errors.grupoId}</Text>}

            <Button title="Salvar Produto" onPress={handleSubmit} />
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
});

export default ProdutoForm;
