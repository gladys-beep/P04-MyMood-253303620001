import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function LikeButton({ initialCount = 42 }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialCount);

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikeCount(prev => prev - 1);
    } else {
      setIsLiked(true);
      setLikeCount(prev => prev + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>❤️ Like Button Demo</Text>
      <View style={styles.card}>
        <Text style={styles.postText}>Liburan akhir pekan di Bali 🌊 Sunsetnya gila banget!</Text>
        <View style={styles.actionRow}>
          <TouchableOpacity 
            style={[styles.likeBtn, isLiked && styles.likeBtnActive]} 
            onPress={handleLike}
          >
            <Text style={styles.likeIcon}>{isLiked ? '❤️' : '🤍'}</Text>
            <Text style={[styles.likeTxt, isLiked && styles.likeTxtActive]}>
              {isLiked ? 'Liked' : 'Like'}
            </Text>
          </TouchableOpacity>
          <Text style={styles.count}>{likeCount} suka</Text>
        </View>
      </View>

      <Text style={styles.hint}>Setiap LikeButton di bawah punya state SENDIRI:</Text>
      <LikeButton initialCount={128} />
      <LikeButton initialCount={7} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:     { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  title:         { fontSize: 22, fontWeight: '800', textAlign: 'center', marginBottom: 20 },
  card:          { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, elevation: 3 },
  postText:      { fontSize: 14, color: '#2d3436', lineHeight: 22, marginBottom: 12 },
  actionRow:     { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  likeBtn:       { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#dfe6e9' },
  likeBtnActive: { backgroundColor: '#ffeef3', borderColor: '#fd79a8' },
  likeIcon:      { fontSize: 18 },
  likeTxt:       { fontSize: 14, color: '#636e72', fontWeight: '600' },
  likeTxtActive: { color: '#e84393' },
  count:         { fontSize: 14, color: '#636e72' },
  hint:          { fontSize: 13, color: '#636e72', marginVertical: 10, fontStyle: 'italic' },
});