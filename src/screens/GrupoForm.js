import React from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import api from '../services/api';


const GrupoForm = () => {
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required('O nome do grupo é obrigatório'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await api.post('/grupo/novo', values);
      Alert.alert('Sucesso', 'Grupo salvo com sucesso!');
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar grupo:', error);
      Alert.alert('Erro', 'Não foi possível salvar o grupo');
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ nome: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <Text style={styles.label}>Nome do Grupo</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('nome')}
              onBlur={handleBlur('nome')}
              value={values.nome}
              placeholder="Digite o nome do grupo"
            />
            {touched.nome && errors.nome && (
              <Text style={styles.error}>{errors.nome}</Text>
            )}

            <Button title="Salvar Grupo" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default GrupoForm;
