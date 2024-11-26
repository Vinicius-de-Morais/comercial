import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import api from '../services/api';

const screenWidth = Dimensions.get('window').width;

const GraficoVendas = () => {
  const [valoresMensais, setValoresMensais] = useState({
    custo: [],
    venda: [],
    quantidadeComprada: [],
    quantidadeVendida: [],
  });

  useEffect(() => {
    fetchDadosMensais();
  }, []);

  const fetchDadosMensais = async () => {
    try {
      const response = await api.get('/venda/mensal');
      const data = response.data;
      
      const custo = data.map((item) => item.valorTotalCusto);
      const venda = data.map((item) => item.valorTotalVenda);
      const quantidadeComprada = data.map((item) => item.quantidadeTotalComprada);
      const quantidadeVendida = data.map((item) => item.quantidadeTotalVendida);
      
      setValoresMensais({ custo, venda, quantidadeComprada, quantidadeVendida });
    } catch (error) {
      console.error('Erro ao buscar dados mensais:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Relatório de Vendas - Ano Corrente</Text>

      {/* Gráfico de Linha: Valores de Custo e Venda */}
      <Text style={styles.chartTitle}>Valores de Custo e Venda Mensal</Text>
      <LineChart
        data={{
          labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
          datasets: [
            { data: valoresMensais.custo, color: () => '#FF6384', strokeWidth: 2, label: 'Custo' },
            { data: valoresMensais.venda, color: () => '#36A2EB', strokeWidth: 2, label: 'Venda' },
          ],
          legend: ['Custo', 'Venda'],
        }}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />

      {/* Gráfico de Barras: Quantidade Comprada e Vendida */}
      <Text style={styles.chartTitle}>Quantidade Comprada e Vendida Mensal</Text>
      <BarChart
        data={{
          labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
          datasets: [
            { data: valoresMensais.quantidadeComprada, color: () => '#FFCE56', label: 'Comprada' },
            { data: valoresMensais.quantidadeVendida, color: () => '#4BC0C0', label: 'Vendida' },
          ],
          legend: ['Comprada', 'Vendida'],
        }}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        style={styles.chart}
      />
    </ScrollView>
  );
};

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  decimalPlaces: 2,
  style: {
    borderRadius: 16,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
    textAlign: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default GraficoVendas;