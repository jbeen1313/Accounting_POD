import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { generateQuiz } from '../services/quizService';

export default function QuizScreen({ book, onBack }) {
  const [quiz, setQuiz] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const result = await generateQuiz(book.description || book.title);
        const parsed = JSON.parse(result);
        setQuiz(parsed.questions);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [book]);

  const handleAnswer = (index) => {
    if (quiz[current].answer === index) {
      setScore(score + 1);
    }
    if (current + 1 < quiz.length) {
      setCurrent(current + 1);
    } else {
      setCompleted(true);
    }
  };

  if (!quiz) {
    return <Text>Loading quiz...</Text>;
  }

  if (completed) {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <Text>Your score: {score}/{quiz.length}</Text>
        <Button title="Back to books" onPress={onBack} />
      </View>
    );
  }

  const question = quiz[current];

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18 }}>{question.question}</Text>
      {question.options.map((opt, idx) => (
        <TouchableOpacity key={idx} onPress={() => handleAnswer(idx)} style={{ marginVertical: 5, backgroundColor: '#eee', padding: 10 }}>
          <Text>{opt}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
