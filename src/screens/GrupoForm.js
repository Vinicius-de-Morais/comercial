import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import api from '../services/api';

const GrupoForm = ({ route, navigation }) => {
  const [grupo, setGrupo] = useState(null);

  // Verifica se 'grupoData' foi passado pelo parâmetro 'route'
  const { grupo: grupoData } = route.params || {}; // Recebe os dados do grupo de edição

  useEffect(() => {
    if (grupoData) {
      setGrupo(grupoData); // Preenche o formulário com os dados do grupo para edição
    }
  }, [grupoData]);

  const validationSchema = Yup.object().shape({
    nome: Yup.string().min(3, 'O nome do grupo deve ter pelo menos 3 caracteres').required('O nome do grupo é obrigatório'),
    descricao: Yup.string().required('A descrição é obrigatória'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      if (grupo) {
        // Se o grupo já existe, faz PUT para atualizar
        await api.put(`/grupo/atualizar/${grupo.id}`, values);
        Alert.alert('Sucesso', 'Grupo atualizado com sucesso!');
      } else {
        // Se não existe, faz POST para criar um novo grupo
        await api.post('/grupo/novo', values);
        Alert.alert('Sucesso', 'Grupo salvo com sucesso!');
      }
      resetForm();
      navigation.goBack(); // Volta para a lista de grupos
    } catch (error) {
      console.error('Erro ao salvar ou editar grupo:', error);
      Alert.alert('Erro', 'Não foi possível salvar o grupo. Tente novamente mais tarde.');
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          nome: grupoData ? grupoData.nome : '',
          descricao: grupoData ? grupoData.descricao : '',
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

            <Button title={grupo ? "Atualizar Grupo" : "Salvar Grupo"} onPress={handleSubmit} />
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
