import React from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import api from '../services/api';

const FabricanteForm = () => {
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required('O nome é obrigatório'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await api.post('/fabricante/save-fabricante', values);
      Alert.alert('Sucesso', 'Fabricante salvo com sucesso!');
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar fabricante:', error);
      Alert.alert('Erro', 'Não foi possível salvar o fabricante');
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
            <Text style={styles.label}>Nome do Fabricante</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('nome')}
              onBlur={handleBlur('nome')}
              value={values.nome}
              placeholder="Digite o nome do fabricante"
            />
            {touched.nome && errors.nome && (
              <Text style={styles.error}>{errors.nome}</Text>
            )}

            <Button title="Salvar Fabricante" onPress={handleSubmit} />
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

export default FabricanteForm;
