import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import api from '../services/api';

const screenWidth = Dimensions.get("window").width;

const VendasChart = () => {
  const [vendas, setVendas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendas = async () => {
      try {
        const response = await api.get('/venda');
        setVendas(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar vendas:', error);
        setLoading(false);
      }
    };

    fetchVendas();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando vendas...</Text>
      </View>
    );
  }

  // Processar dados de todas as vendas
  const totalCusto = vendas.reduce((acc, venda) => acc + (venda.produto.custo * venda.quantidade), 0);
  const totalVenda = vendas.reduce((acc, venda) => acc + (venda.produto.precoVenda * venda.quantidade), 0);
  const totalQuantidadeComprada = vendas.reduce((acc, venda) => acc + venda.quantidade, 0);

  const lineData = {
    labels: ["Total"],
    datasets: [
      {
        data: [totalCusto],
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Red for cost
        strokeWidth: 2,
      },
      {
        data: [totalVenda],
        color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`, // Green for sales
        strokeWidth: 2,
      },
    ],
    legend: ["Custo Total", "Venda Total"],
  };

  const barData = {
    labels: ["Total"],
    datasets: [
      {
        data: [totalQuantidadeComprada],
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.chartTitle}>Gráfico de Linha: Custo vs. Venda</Text>
      <LineChart
        data={lineData}
        width={screenWidth}
        height={220}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />

      <Text style={styles.chartTitle}>Gráfico de Barras: Quantidade Total Vendida</Text>
      <BarChart
        data={barData}
        width={screenWidth}
        height={220}
        chartConfig={{
          backgroundColor: "#1cc910",
          backgroundGradientFrom: "#1cc910",
          backgroundGradientTo: "#2e7d32",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 8,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VendasChart;