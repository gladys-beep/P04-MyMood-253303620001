import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import CounterApp  from './components/CounterApp';
import LikeButton  from './components/LikeButton';
import DarkModeApp from './components/DarkModeApp';
import TodoApp     from './components/TodoApp';

// Data tab navigasi — disimpan di luar komponen (bukan state, data statis)
const TABS = [
  { key: 'counter',  label: '🔢', title: 'Counter'  },
  { key: 'like',     label: '❤️', title: 'Like'     },
  { key: 'dark',     label: '🌙', title: 'Theme'    },
  { key: 'todo',     label: '✅', title: 'Todo'     },
];

export default function App() {

  // activeTab mengontrol konten mana yang tampil
  const [activeTab, setActiveTab] = useState('counter');

  // Fungsi render konten berdasarkan tab aktif — switch statement
  const renderContent = () => {
    switch (activeTab) {
      case 'counter': return <CounterApp />;
      case 'like':    return <LikeButton initialCount={42} />;
      case 'dark':    return <DarkModeApp />;
      case 'todo':    return <TodoApp />;
      default:          return <CounterApp />;
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>

      {/* Area konten — mengisi sisa ruang */}
      <View style={styles.content}>
        {renderContent()}  {/* Conditional rendering via switch */}
      </View>

      {/* Bottom tab bar buatan sendiri */}
      <View style={styles.tabBar}>
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text style={styles.tabIcon}>{tab.label}</Text>
            <Text style={[styles.tabLabel, activeTab === tab.key && styles.tabLabelActive]}>
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper:       { flex: 1, backgroundColor: '#f8f9fa' },
  content:       { flex: 1 },
  tabBar:        { flexDirection: 'row', backgroundColor: '#fff', borderTopWidth: 1,
                   borderTopColor: '#dfe6e9', paddingBottom: 8, paddingTop: 8 },
  tab:           { flex: 1, alignItems: 'center', paddingVertical: 6, borderRadius: 8 },
  tabActive:     { backgroundColor: 'rgba(0,184,148,0.12)' },
  tabIcon:       { fontSize: 22 },
  tabLabel:      { fontSize: 10, color: '#b2bec3', fontWeight: '600', marginTop: 2 },
  tabLabelActive:{ color: '#00b894' },
});