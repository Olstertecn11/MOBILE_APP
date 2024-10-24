
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CircularProgress } from 'react-native-circular-progress';
import { getStats } from "../../services/product";
import { useIsFocused } from '@react-navigation/native';

const Stats = () => {
  const isFocused = useIsFocused();
  const [monthGains, setMonthGains] = React.useState(0);
  const [monthOrders, setMonthOrders] = React.useState(0);
  const [topPlants, setTopPlants] = React.useState([]);

  const getStatsFetch = async () => {
    const response = await getStats();
    setMonthGains(response.data.ganancias[0].total_ganancias);
    setMonthOrders(response.data.mensualOrders[0].ordenes);
    setTopPlants(response.data.topPlantas);
  };

  React.useEffect(() => {
    if (isFocused) {
      getStatsFetch();
    }
  }, [isFocused]);

  const formattedMonthGains = Number(monthGains).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <CircularProgress
          size={260}
          width={15}
          fill={monthGains / 2000 * 100}
          tintColor="#32CD32"
          backgroundColor="#e0e0e0"
        >
          {() => (
            <View style={styles.centerText}>
              <Text style={styles.gananciasText}>Q{formattedMonthGains}</Text>
              <Text style={styles.subText}>Ganancias</Text>
            </View>
          )}
        </CircularProgress>
      </View>

      <View style={styles.plantsContainer}>
        <Text style={styles.title}>Top 5 plantas</Text>
        {topPlants.map((plant, index) => (
          <Text key={index} style={styles.plantText}>
            {index + 1}. {plant.name} {plant.total_vendido}
          </Text>
        ))}

        <View style={styles.smallProgressContainer}>
          <CircularProgress
            size={60}
            width={5}
            fill={70}
            tintColor="#32CD32"
            backgroundColor="#e0e0e0"
          >
            {() => (
              <View style={styles.centerText}>
                <Text style={styles.subText}>70%</Text>
              </View>
            )}
          </CircularProgress>
        </View>
      </View>

      <View style={styles.smallProgressContainer}>
        <CircularProgress
          size={120}
          width={4}
          fill={monthOrders / 50 * 100}
          tintColor="#32CD32"
          backgroundColor="#e0e0e0"
        >
          {() => (
            <View style={styles.centerText}>
              <Text style={styles.pedidosText}>{monthOrders}</Text>
              <Text style={styles.subText}>Pedidos Mensuales</Text>
            </View>
          )}
        </CircularProgress>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0fff0",
  },
  progressContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  smallProgressContainer: {
    float: 'right',
    marginTop: 20,
    alignItems: "center",
  },
  centerText: {
    justifyContent: "center",
    alignItems: "center",
  },
  gananciasText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#32CD32",
  },
  pedidosText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#32CD32",
  },
  subText: {
    fontSize: 14,
    color: "#36A920",
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#32CD32",
  },
  plantsContainer: {
    backgroundColor: "transparent",
    padding: 10,
    width: '90%',
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#32CD32",
  },
  plantText: {
    fontSize: 16,
    color: "#000",
    marginVertical: 2,
  },
});

export default Stats;

