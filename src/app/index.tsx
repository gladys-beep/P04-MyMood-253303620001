import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  TouchableOpacity, 
  TextInput, 
  FlatList, 
  Alert 
} from 'react-native';

const MOODS = [
  { id: '1', emoji: '😊', label: 'Happy', color: '#00b894', bg: '#e6fffa' },
  { id: '2', emoji: '😐', label: 'Neutral', color: '#0984e3', bg: '#e8f4fd' },
  { id: '3', emoji: '😴', label: 'Tired', color: '#636e72', bg: '#f1f2f6' },
  { id: '4', emoji: '😢', label: 'Sad', color: '#e84393', bg: '#fce4ec' },
  { id: '5', emoji: '😠', label: 'Angry', color: '#d63031', bg: '#ffeaa7' },
];

export default function App() {
  const [selectedMood, setSelectedMood] = useState(MOODS[0]);
  const [note, setNote] = useState('');
  const [totalDays, setTotalDays] = useState(1);
  const [history, setHistory] = useState([
    { id: '1', emoji: '😊', label: 'Happy', note: 'Hari pertama menggunakan aplikasi MyMood Tracker!', time: 'Hari ini' }
  ]);

  const handleMoodSelect = (mood: any) => {
    setSelectedMood(mood);
  };

  const handleTextChange = (text: string) => {
    if (text.length <= 100) {
      setNote(text);
    }
  };

  const handleSaveMood = () => {
    if (!note.trim()) {
      Alert.alert('Catatan Kosong', 'Tuliskan sedikit catatan tentang harimu ya! ✍️');
      return;
    }

    const newEntry = {
      id: Date.now().toString(),
      emoji: selectedMood.emoji,
      label: selectedMood.label,
      note: note.trim(),
      time: 'Baru saja',
    };

    setHistory([newEntry, ...history]);
    setTotalDays(prev => prev + 1);
    setNote('');
    Alert.alert('Berhasil! 🎉', 'Mood kamu berhasil disimpan.');
  };

  const handleReset = () => {
    setHistory([]);
    setTotalDays(1);
    setNote('');
    setSelectedMood(MOODS[0]);
  };

  const getMoodMessage = () => {
    switch (selectedMood.label) {
      case 'Happy': return 'Luar biasa! Pertahankan energi positifmu hari ini ✨';
      case 'Neutral': return 'Hari yang tenang dan stabil. Nikmati ritmenya 🍃';
      case 'Tired': return 'Jangan dipaksakan, sempatkan waktu untuk beristirahat 🛌';
      case 'Sad': return 'Tidak apa-apa merasa sedih. Tarik napas, semua akan membaik 💙';
      case 'Angry': return 'Tenangkan diri sejenak, lepaskan emosi negatif perlahan 🧘‍♂️';
      default: return 'Bagaimana perasaanmu?';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={history}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={styles.headerRow}>
              <View>
                <Text style={styles.appTitle}>🌈 MyMood</Text>
                <Text style={styles.appSubtitle}>Daily Mood Tracker & Journal</Text>
              </View>
              <View style={styles.counterBadge}>
                <Text style={styles.counterText}>🔥 {totalDays} Hari</Text>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Pilih Suasana Hati</Text>
              <View style={styles.moodRow}>
                {MOODS.map(item => {
                  const isSelected = selectedMood.id === item.id;
                  return (
                    <TouchableOpacity
                      key={item.id}
                      style={[
                        styles.moodItem,
                        isSelected && { 
                          backgroundColor: item.bg, 
                          borderColor: item.color, 
                          borderWidth: 2,
                          transform: [{ scale: 1.05 }]
                        }
                      ]}
                      onPress={() => handleMoodSelect(item)}
                    >
                      <Text style={styles.moodEmoji}>{item.emoji}</Text>
                      <Text style={[styles.moodLabel, isSelected && { color: item.color, fontWeight: '800' }]}>
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View style={[styles.messageBox, { backgroundColor: selectedMood.bg }]}>
                <Text style={[styles.messageText, { color: selectedMood.color }]}>
                  {getMoodMessage()}
                </Text>
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.inputHeaderRow}>
                <Text style={styles.sectionTitle}>Ceritakan Harimu</Text>
                <Text style={[styles.charCount, note.length >= 90 && { color: '#d63031' }]}>
                  {100 - note.length} karakter
                </Text>
              </View>
              <TextInput
                style={styles.textInput}
                placeholder={`Apa yang membuatmu merasa ${selectedMood.label.toLowerCase()} hari ini?`}
                placeholderTextColor="#b2bec3"
                multiline
                value={note}
                onChangeText={handleTextChange}
              />
              <TouchableOpacity 
                style={[styles.saveButton, { backgroundColor: selectedMood.color }]} 
                onPress={handleSaveMood}
              >
                <Text style={styles.saveButtonText}>Simpan Mood Hari Ini</Text>
              </TouchableOpacity>
            </View>

            {history.length > 0 && (
              <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                <Text style={styles.resetButtonText}>🔄 Reset Semua Data</Text>
              </TouchableOpacity>
            )}

            <Text style={styles.sectionTitleHistory}>Riwayat Catatan ({history.length})</Text>
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.historyCard}>
            <Text style={styles.historyEmoji}>{item.emoji}</Text>
            <View style={styles.historyContent}>
              <View style={styles.historyHeaderRow}>
                <Text style={styles.historyLabel}>{item.label}</Text>
                <Text style={styles.historyTime}>{item.time}</Text>
              </View>
              <Text style={styles.historyNote}>{item.note}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:           { flex: 1, backgroundColor: '#f4f6f8' },
  scrollContainer:     { padding: 20, paddingBottom: 40 },
  headerRow:           { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 10 },
  appTitle:            { fontSize: 28, fontWeight: '900', color: '#2d3436', letterSpacing: 0.5 },
  appSubtitle:         { fontSize: 13, color: '#636e72', marginTop: 2, fontWeight: '500' },
  counterBadge:        { backgroundColor: '#e6fffa', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: '#00b894' },
  counterText:         { color: '#00b894', fontWeight: '800', fontSize: 13 },
  
  card:                { backgroundColor: '#ffffff', borderRadius: 20, padding: 18, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  sectionTitle:        { fontSize: 16, fontWeight: '700', color: '#2d3436', marginBottom: 12 },
  sectionTitleHistory: { fontSize: 16, fontWeight: '700', color: '#2d3436', marginBottom: 10, marginTop: 10 },
  
  moodRow:             { flexDirection: 'row', justifyContent: 'space-between' },
  moodItem:            { alignItems: 'center', paddingVertical: 10, paddingHorizontal: 4, borderRadius: 16, borderWidth: 1, borderColor: '#dfe6e9', width: '18%', backgroundColor: '#fff' },
  moodEmoji:           { fontSize: 26, marginBottom: 4 },
  moodLabel:           { fontSize: 10, color: '#636e72', fontWeight: '600' },

  messageBox:          { marginTop: 14, padding: 12, borderRadius: 12, alignItems: 'center' },
  messageText:         { fontSize: 13, fontWeight: '700', textAlign: 'center' },

  inputHeaderRow:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  charCount:           { fontSize: 11, color: '#b2bec3', fontWeight: '700' },
  textInput:           { backgroundColor: '#f9fafb', borderRadius: 14, padding: 14, height: 90, textAlignVertical: 'top', fontSize: 14, borderWidth: 1, borderColor: '#e2e8f0', marginBottom: 14, color: '#2d3436' },
  saveButton:          { borderRadius: 14, padding: 14, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  saveButtonText:      { color: '#fff', fontWeight: '800', fontSize: 15 },

  resetButton:         { backgroundColor: '#fff5f5', borderRadius: 14, padding: 12, alignItems: 'center', marginBottom: 16, borderWidth: 1, borderColor: '#feb2b2' },
  resetButtonText:     { color: '#e53e3e', fontWeight: '700', fontSize: 13 },

  historyCard:         { flexDirection: 'row', backgroundColor: '#ffffff', borderRadius: 16, padding: 14, marginBottom: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2, alignItems: 'center', borderWidth: 1, borderColor: '#f1f2f6' },
  historyEmoji:        { fontSize: 32, marginRight: 14 },
  historyContent:      { flex: 1 },
  historyHeaderRow:    { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  historyLabel:        { fontSize: 14, fontWeight: '700', color: '#2d3436' },
  historyTime:         { fontSize: 11, color: '#b2bec3' },
  historyNote:         { fontSize: 13, lineHeight: 18, color: '#4b6584' },
});