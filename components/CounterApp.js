import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function CounterApp() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => setCount(prev => prev + 1);
  const handleDecrement = () => setCount(prev => prev - 1);
  const handleReset = () => setCount(0);

  const countColor = count > 0 ? '#00b894' : count < 0 ? '#e74c3c' : '#2d3436';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔢 Counter App</Text>
      <Text style={[styles.count, { color: countColor }]}>{count}</Text>
      
      {count > 0 && <Text style={styles.label}>Positif ✅</Text>}
      {count < 0 && <Text style={styles.labelNeg}>Negatif ⚠️</Text>}
      {count === 0 && <Text style={styles.labelZero}>Nol — mulai klik! 👆</Text>}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.btn, styles.btnDanger]} onPress={handleDecrement}>
          <Text style={styles.btnText}>−</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.btnReset]} onPress={handleReset}>
          <Text style={styles.btnText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.btnSuccess]} onPress={handleIncrement}>
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa' },
  title:     { fontSize: 22, fontWeight: '800', color: '#2d3436', marginBottom: 20 },
  count:     { fontSize: 96, fontWeight: '900', marginVertical: 10 },
  label:     { fontSize: 16, color: '#00b894', fontWeight: '600', marginBottom: 15 },
  labelNeg:  { fontSize: 16, color: '#e74c3c', fontWeight: '600', marginBottom: 15 },
  labelZero: { fontSize: 16, color: '#636e72', fontWeight: '600', marginBottom: 15 },
  buttonRow: { flexDirection: 'row', gap: 12, marginTop: 20 },
  btn:       { width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center' },
  btnDanger: { backgroundColor: '#e74c3c' },
  btnReset:  { backgroundColor: '#636e72' },
  btnSuccess:{ backgroundColor: '#00b894' },
  btnText:   { color: '#fff', fontSize: 28, fontWeight: '800' },
});