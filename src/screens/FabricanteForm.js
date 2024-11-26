import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import api from '../services/api';

const FabricanteForm = ({ route, navigation }) => {
  const [fabricante, setFabricante] = useState(null);

  // Verifique se 'fabricanteData' foi passado pelo parâmetro 'route'
  const { fabricante: fabricanteData } = route.params || {}; // Recebe os dados do fabricante de edição

  useEffect(() => {
    if (fabricanteData) {
      setFabricante(fabricanteData); // Preenche o formulário com os dados do fabricante para edição
    }
  }, [fabricanteData]);

  const validationSchema = Yup.object().shape({
    nomeFantasia: Yup.string().required('O nome fantasia é obrigatório'),
    razaoSocial: Yup.string().required('A razão social é obrigatória'),
    cnpj: Yup.string()
      .matches(/^\d{14}$/, 'O CNPJ deve conter 14 números')
      .required('O CNPJ é obrigatório'),
    endereco: Yup.string().required('O endereço é obrigatório'),
    telefone: Yup.string()
      .matches(/^\d{10,11}$/, 'O telefone deve conter entre 10 e 11 números')
      .required('O telefone é obrigatório'),
    email: Yup.string().email('Email inválido').required('O email é obrigatório'),
    vendedor: Yup.string().required('O vendedor é obrigatório'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      if (fabricante) {
        // Se o fabricante já existe, faz PUT para atualizar
        await api.put(`/fabricante/atualizar/${fabricante.id}`, values);
        Alert.alert('Sucesso', 'Fabricante atualizado com sucesso!');
      } else {
        // Se não existe, faz POST para criar um novo fabricante
        await api.post('/fabricante/novo', values);
        Alert.alert('Sucesso', 'Fabricante salvo com sucesso!');
      }
      resetForm();
      navigation.goBack(); // Volta para a lista de fabricantes
    } catch (error) {
      console.error('Erro ao salvar ou editar fabricante:', error);
      Alert.alert('Erro', 'Não foi possível salvar o fabricante');
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          nomeFantasia: fabricanteData ? fabricanteData.nomeFantasia : '',
          razaoSocial: fabricanteData ? fabricanteData.razaoSocial : '',
          cnpj: fabricanteData ? fabricanteData.cnpj : '',
          endereco: fabricanteData ? fabricanteData.endereco : '',
          telefone: fabricanteData ? fabricanteData.telefone : '',
          email: fabricanteData ? fabricanteData.email : '',
          vendedor: fabricanteData ? fabricanteData.vendedor : '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            {/* Nome Fantasia */}
            <Text style={styles.label}>Nome do Fabricante</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('nomeFantasia')}
              onBlur={handleBlur('nomeFantasia')}
              value={values.nomeFantasia}
              placeholder="Digite o nome do fabricante"
            />
            {touched.nomeFantasia && errors.nomeFantasia && <Text style={styles.error}>{errors.nomeFantasia}</Text>}

            {/* Razão Social */}
            <Text style={styles.label}>Razão Social</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('razaoSocial')}
              onBlur={handleBlur('razaoSocial')}
              value={values.razaoSocial}
              placeholder="Digite a razão social"
            />
            {touched.razaoSocial && errors.razaoSocial && (
              <Text style={styles.error}>{errors.razaoSocial}</Text>
            )}

            {/* CNPJ */}
            <Text style={styles.label}>CNPJ</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('cnpj')}
              onBlur={handleBlur('cnpj')}
              value={values.cnpj}
              placeholder="Digite o CNPJ (somente números)"
              keyboardType="numeric"
            />
            {touched.cnpj && errors.cnpj && <Text style={styles.error}>{errors.cnpj}</Text>}

            {/* Endereço */}
            <Text style={styles.label}>Endereço</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('endereco')}
              onBlur={handleBlur('endereco')}
              value={values.endereco}
              placeholder="Digite o endereço"
            />
            {touched.endereco && errors.endereco && (
              <Text style={styles.error}>{errors.endereco}</Text>
            )}

            {/* Telefone */}
            <Text style={styles.label}>Telefone</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('telefone')}
              onBlur={handleBlur('telefone')}
              value={values.telefone}
              placeholder="Digite o telefone (somente números)"
              keyboardType="numeric"
            />
            {touched.telefone && errors.telefone && (
              <Text style={styles.error}>{errors.telefone}</Text>
            )}

            {/* Email */}
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder="Digite o email"
              keyboardType="email-address"
            />
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

            {/* Vendedor */}
            <Text style={styles.label}>Vendedor</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('vendedor')}
              onBlur={handleBlur('vendedor')}
              value={values.vendedor}
              placeholder="Digite o nome do vendedor"
            />
            {touched.vendedor && errors.vendedor && (
              <Text style={styles.error}>{errors.vendedor}</Text>
            )}

            <Button title={fabricante ? "Atualizar Fabricante" : "Salvar Fabricante"} onPress={handleSubmit} />
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
