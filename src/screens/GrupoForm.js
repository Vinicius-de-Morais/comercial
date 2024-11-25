import React from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import api from '../services/api';

const GrupoForm = () => {
  const validationSchema = Yup.object().shape({
    nome: Yup.string().min(3, 'O nome do grupo deve ter pelo menos 3 caracteres').required('O nome do grupo é obrigatório'),
    descricao: Yup.string().required('A descrição é obrigatória'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await api.post('/grupo/novo', values);
      Alert.alert('Sucesso', 'Grupo salvo com sucesso!');
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar grupo:', error);
      Alert.alert('Erro', 'Não foi possível salvar o grupo. Tente novamente mais tarde.');
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ 
          nome: '', 
          descricao: '' 
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            {/* Nome do Grupo */}
            <Text style={styles.label}>Nome do Grupo</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('nome')}
              onBlur={handleBlur('nome')}
              value={values.nome}
              placeholder="Digite o nome do grupo"
            />
            {touched.nome && errors.nome && <Text style={styles.error}>{errors.nome}</Text>}

            {/* Descrição do Grupo */}
            <Text style={styles.label}>Descrição do Grupo</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('descricao')}
              onBlur={handleBlur('descricao')}
              value={values.descricao}
              placeholder="Digite a descrição do grupo"
            />
            {touched.descricao && errors.descricao && <Text style={styles.error}>{errors.descricao}</Text>}

            <Button title="Salvar Grupo" onPress={handleSubmit} />
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

export default GrupoForm;
