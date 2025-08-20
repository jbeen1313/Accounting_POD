import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import BookListScreen from './screens/BookListScreen';
import ScanScreen from './screens/ScanScreen';
import QuizScreen from './screens/QuizScreen';

export default function App() {
  const [books, setBooks] = useState([]);
  const [screen, setScreen] = useState('list');
  const [currentBook, setCurrentBook] = useState(null);

  const handleBookDetected = (book) => {
    setBooks([...books, book]);
    setScreen('list');
  };

  const handleQuiz = (book) => {
    setCurrentBook(book);
    setScreen('quiz');
  };

  return (
    <View style={styles.container}>
      {screen === 'list' && (
        <BookListScreen
          books={books}
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
        <QuizScreen book={currentBook} onBack={() => setScreen('list')} />
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
