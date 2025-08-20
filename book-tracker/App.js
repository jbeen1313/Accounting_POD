import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BookListScreen from './screens/BookListScreen';
import ScanScreen from './screens/ScanScreen';
import QuizScreen from './screens/QuizScreen';
import LoginScreen from './screens/LoginScreen';

export default function App() {
  const [books, setBooks] = useState([]);
  const [screen, setScreen] = useState('list');
  const [currentBook, setCurrentBook] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const storedBooks = await AsyncStorage.getItem('books');
      const storedUser = await AsyncStorage.getItem('user');
      if (storedBooks) setBooks(JSON.parse(storedBooks));
      if (storedUser) setUser(storedUser);
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const handleLogin = async (name) => {
    setUser(name);
    await AsyncStorage.setItem('user', name);
    setScreen('list');
  };

  const handleBookDetected = (book) => {
    setBooks([...books, book]);
    setScreen('list');
  };

  const handleQuiz = (book) => {
    setCurrentBook(book);
    setScreen('quiz');
  };

  const handleQuizComplete = (score) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.isbn === currentBook.isbn ? { ...b, score } : b
      )
    );
  };

  return (
    <View style={styles.container}>
      {!user && screen === 'list' && (
        <LoginScreen onLogin={handleLogin} />
      )}
      {user && screen === 'list' && (
        <BookListScreen
          books={books}
          user={user}
          onScanPress={() => setScreen('scan')}
          onQuizPress={handleQuiz}
        />
      )}
      {screen === 'scan' && (
        <ScanScreen
          onBookDetected={handleBookDetected}
          onCancel={() => setScreen('list')}
        />
      )}
      {screen === 'quiz' && currentBook && (
        <QuizScreen
          book={currentBook}
          onBack={() => setScreen('list')}
          onComplete={handleQuizComplete}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
