import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import api from "../services/api";

const VendasChart = () => {
  const [chartData, setChartData] = useState({
    labels: [], // Datas ou identificadores
    datasets: [
      {
        data: [], // Quantidades ou valores
      },
    ],
  });
  // pra subir
  const fetchVendas = async () => {
    try {
      const response = await api.get("/venda"); // Consome a mesma API
      const vendas = response.data;

      // Organizando os dados para o gráfico
      const labels = vendas.map((venda) => venda.produto?.nome); // Exibe o nome do produto
      const data = vendas.map((venda) => venda.quantidade); // Quantidade vendida

      setChartData({
        labels,
        datasets: [{ data }],
      });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os dados das vendas");
    }
  };

  useEffect(() => {
    fetchVendas();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gráfico de Vendas</Text>
      <LineChart
        data={chartData}
        width={Dimensions.get("window").width - 32} // Largura do gráfico
        height={220} // Altura do gráfico
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#f7f7f7",
          backgroundGradientTo: "#e3e3e3",
          decimalPlaces: 2, // Número de casas decimais
          color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`, // Cor da linha
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Cor dos rótulos
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#007BFF", // Cor dos pontos
          },
        }}
        bezier // Deixa o gráfico em forma curva
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default VendasChart;
