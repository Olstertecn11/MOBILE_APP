
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { CircularProgress } from 'react-native-circular-progress';
import { getStats } from "../../services/product";
import { useIsFocused } from '@react-navigation/native';

const Stats = () => {
  const isFocused = useIsFocused();
  const [monthGains, setMonthGains] = useState(0);
  const [monthOrders, setMonthOrders] = useState(0);
  const [topPlants, setTopPlants] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getStatsFetch = async (formattedDate) => {
    const response = await getStats(formattedDate);
    setMonthGains(response.data.ganancias[0].total_ganancias);
    setMonthOrders(response.data.mensualOrders[0].ordenes);
    setTopPlants(response.data.topPlantas[0]);
  };

  useEffect(() => {
    if (isFocused) {
      const formattedDate = `${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${selectedDate.getFullYear()}`;
      getStatsFetch(formattedDate);
    }
  }, [isFocused, selectedDate]);

  const changeMonth = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() + direction);
    setSelectedDate(newDate);
  };

  // const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const formattedMonthGains = Number(monthGains).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return (
    <ScrollView>
      <View style={styles.container}>

        <View style={styles.monthSelector}>
          <TouchableOpacity onPress={() => changeMonth(-1)}>
            <Text style={styles.monthText}>{monthNames[(selectedDate.getMonth() + 11) % 12]}</Text>
          </TouchableOpacity>
          <Text style={styles.selectedMonthText}>
            {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
          </Text>
          <TouchableOpacity onPress={() => changeMonth(1)}>
            <Text style={styles.monthText}>{monthNames[(selectedDate.getMonth() + 1) % 12]}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.progressContainer}>
          <CircularProgress
            size={260}
            width={15}
            fill={(monthGains / 2000) * 100}
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

        {/* Top 5 Plants */}
        <View style={styles.plantsContainer}>
          <Text style={styles.title}>Top 5 Plantas</Text>
          {topPlants.map((plant, index) => (
            <Text key={index} style={styles.plantText}>
              {index + 1}. {plant.name} - {plant.total_vendido}
            </Text>
          ))}
        </View>

        {/* Circular Progress for Monthly Orders */}
        <View style={styles.smallProgressContainer}>
          <CircularProgress
            size={120}
            width={4}
            fill={(monthOrders / 50) * 100}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0fff0",
  },
  monthSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginVertical: 20,
  },
  monthText: {
    fontSize: 12,
    color: "#888",
  },
  selectedMonthText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#32CD32",
  },
  progressContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  smallProgressContainer: {
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

