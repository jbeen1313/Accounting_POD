import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function LoginScreen({ onLogin }) {
  const [name, setName] = useState('');

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 20, marginBottom: 12, color: '#000' }}>What's your name?</Text>
      <TextInput
        accessibilityLabel="Name input"
        style={{ borderWidth: 1, borderColor: '#333', padding: 10, marginBottom: 12, color: '#000' }}
        value={name}
        onChangeText={setName}
      />
      <Button title="Start Reading" onPress={() => name && onLogin(name)} />
    </View>
  );
}
