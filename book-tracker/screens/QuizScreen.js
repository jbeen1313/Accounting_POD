import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { generateQuiz } from '../services/quizService';

export default function QuizScreen({ book, onBack, onComplete }) {
  const [quiz, setQuiz] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [error, setError] = useState(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const questions = await generateQuiz(book.description || book.title);
        setQuiz(questions);
      } catch (e) {
        console.error(e);
        setError('Could not load quiz');
      }
    })();
  }, [book]);

  const handleAnswer = (index) => {
    const correct = quiz[current].answer === index;
    const newScore = correct ? score + 1 : score;
    setScore(newScore);
    if (current + 1 < quiz.length) {
      setCurrent(current + 1);
    } else {
      setCompleted(true);
      onComplete && onComplete(newScore);
    }
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
        <Button title="Back" onPress={onBack} />
      </View>
    );
  }

  if (!quiz) {
    return <Text>Loading quiz...</Text>;
  }

  if (completed) {
    return (
      <View style={styles.container}>
        <Text style={styles.scoreText}>Your score: {score}/{quiz.length}</Text>
        <Button title="Back to books" onPress={onBack} />
      </View>
    );
  }

  const question = quiz[current];

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question.question}</Text>
      {question.options.map((opt, idx) => (
        <TouchableOpacity
          key={idx}
          accessibilityRole="button"
          accessibilityLabel={`Answer option ${idx + 1}`}
          onPress={() => handleAnswer(idx)}
          style={styles.optionButton}
        >
          <Text style={styles.optionText}>{opt}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  questionText: {
    fontSize: 18,
    color: '#000',
    marginBottom: 12,
  },
  optionButton: {
    marginVertical: 6,
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 12,
    minHeight: 48,
    justifyContent: 'center',
    borderRadius: 4,
  },
  optionText: {
    color: '#000',
  },
  scoreText: {
    fontSize: 20,
    marginBottom: 12,
    color: '#000',
  },
});
