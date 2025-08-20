import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';

export default function BookListScreen({ books, onScanPress, onQuizPress, user }) {
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 18, marginBottom: 10, color: '#000' }}>Hi {user}</Text>
      <Button title="Scan Book" onPress={onScanPress} />
      <FlatList
        data={books}
        keyExtractor={(item) => item.isbn}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>{item.title}</Text>
            <Text style={{ color: '#000' }}>{item.authors}</Text>
            {typeof item.score === 'number' && (
              <Text style={{ color: '#000' }}>Score: {item.score}/5</Text>
            )}
            <Button title="Take Quiz" onPress={() => onQuizPress(item)} />
          </View>
        )}
      />
    </View>
  );
}
