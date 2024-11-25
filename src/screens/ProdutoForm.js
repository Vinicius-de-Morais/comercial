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
        const fabricantesData = await api.get('/fabricante/fabricanteIndex');
        const gruposData = await api.get('/grupo/');
        setFabricantes(
          fabricantesData.data.map((f) => ({ label: f.nome, value: f.id }))
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
    fabricanteId: Yup.string().required('Selecione um fabricante'),
    grupoId: Yup.string().required('Selecione um grupo'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await api.post('/produto/novo', values);
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
        initialValues={{ nome: '', fabricanteId: '', grupoId: '' }}
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
            {touched.nome && errors.nome && (
              <Text style={styles.error}>{errors.nome}</Text>
            )}

            <Text style={styles.label}>Fabricante</Text>
            <RNPickerSelect
              onValueChange={(value) => setFieldValue('fabricanteId', value)}
              items={fabricantes}
              placeholder={{ label: 'Selecione um fabricante', value: '' }}
            />
            {touched.fabricanteId && errors.fabricanteId && (
              <Text style={styles.error}>{errors.fabricanteId}</Text>
            )}

            <Text style={styles.label}>Grupo</Text>
            <RNPickerSelect
              onValueChange={(value) => setFieldValue('grupoId', value)}
              items={grupos}
              placeholder={{ label: 'Selecione um grupo', value: '' }}
            />
            {touched.grupoId && errors.grupoId && (
              <Text style={styles.error}>{errors.grupoId}</Text>
            )}

            <Button title="Salvar Produto" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default ProdutoForm;
