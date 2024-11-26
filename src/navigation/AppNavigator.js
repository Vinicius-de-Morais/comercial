import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// Importando as telas
import FabricanteList from '../screens/FabricanteList';
import FabricanteForm from '../screens/FabricanteForm';
import GrupoList from '../screens/GruposList';
import GrupoForm from '../screens/GrupoForm';
import ProdutoList from '../screens/ProdutoList';
import ProdutoForm from '../screens/ProdutoForm';
import VendaList from '../screens/VendasList';
import VendaForm from '../screens/VendasForm';

// Criando navegadores
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// Navegação de listas (Drawer)
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Fabricantes">
      <Drawer.Screen 
        name="Fabricantes" 
        component={FabricanteList} 
        options={{ title: 'Lista de Fabricantes' }} 
      />
      <Drawer.Screen 
        name="Grupos" 
        component={GrupoList} 
        options={{ title: 'Lista de Grupos' }} 
      />
      <Drawer.Screen 
        name="Produtos" 
        component={ProdutoList} 
        options={{ title: 'Lista de Produtos' }} 
      />
      <Drawer.Screen 
        name="Vendas" 
        component={VendaList} 
        options={{ title: 'Lista de Vendas' }} 
      />
    </Drawer.Navigator>
  );
};

// Navegação principal (Stack)
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Fabricantes">
        {/* Fabricantes */}
        <Stack.Screen 
          name="Fabricantes" 
          component={FabricanteList} 
          options={{ title: 'Lista de Fabricantes' }} 
        />
        <Stack.Screen 
          name="Novo Fabricante" 
          component={FabricanteForm} 
          options={{ title: 'Cadastro de Fabricante' }} 
        />
        <Stack.Screen 
          name="Editar Fabricante" 
          component={FabricanteForm} 
          options={{ title: 'Editar Fabricante' }} 
        />

        {/* Grupos */}
        <Stack.Screen 
          name="Grupos" 
          component={GrupoList} 
          options={{ title: 'Lista de Grupos' }} 
        />
        <Stack.Screen 
          name="Novo Grupo" 
          component={GrupoForm} 
          options={{ title: 'Cadastro de Grupo' }} 
        />
        <Stack.Screen 
          name="Editar Grupo" 
          component={GrupoForm} 
          options={{ title: 'Editar Grupo' }} 
        />

        {/* Produtos */}
        <Stack.Screen 
          name="Produtos" 
          component={ProdutoList} 
          options={{ title: 'Lista de Produtos' }} 
        />
        <Stack.Screen 
          name="Novo Produto" 
          component={ProdutoForm} 
          options={{ title: 'Cadastro de Produto' }} 
        />
        <Stack.Screen 
          name="Editar Produto" 
          component={ProdutoForm} 
          options={{ title: 'Editar Produto' }} 
        />

        {/* Vendas */}
        <Stack.Screen 
          name="Vendas" 
          component={VendaList} 
          options={{ title: 'Lista de Vendas' }} 
        />
        <Stack.Screen 
          name="Nova Venda" 
          component={VendaForm} 
          options={{ title: 'Cadastro de Venda' }} 
        />
        <Stack.Screen 
          name="Editar Venda" 
          component={VendaForm} 
          options={{ title: 'Editar Venda' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;