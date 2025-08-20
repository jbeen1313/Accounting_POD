import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';

export default function BookListScreen({ books, onScanPress, onQuizPress }) {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Scan Book" onPress={onScanPress} />
      <FlatList
        data={books}
        keyExtractor={(item) => item.isbn}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.title}</Text>
            <Text>{item.authors}</Text>
            <Button title="Take Quiz" onPress={() => onQuizPress(item)} />
          </View>
        )}
      />
    </View>
  );
}
