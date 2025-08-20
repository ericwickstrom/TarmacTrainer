import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { airports, getRandomAirport } from './src/data/airportController';

export default function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentAirport, setCurrentAirport] = useState(getRandomAirport());
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setScore(0);
    setTotalAttempts(0);
    nextQuestion();
  };

  const nextQuestion = () => {
    setCurrentAirport(getRandomAirport());
    setUserAnswer('');
    setShowAnswer(false);
  };

  const handleSubmit = () => {
    if (!userAnswer.trim()) {
      Alert.alert('Please enter an answer');
      return;
    }

    const isCorrect = userAnswer.toUpperCase().trim() === currentAirport.iata;
    const newScore = isCorrect ? score + 1 : score;
    const newAttempts = totalAttempts + 1;

    setScore(newScore);
    setTotalAttempts(newAttempts);

    if (isCorrect) {
      Alert.alert('Correct!', `${currentAirport.iata} is right!`, [
        { text: 'Next', onPress: nextQuestion }
      ]);
    } else {
      setShowAnswer(true);
      Alert.alert('Incorrect', `The correct answer is ${currentAirport.iata}`, [
        { text: 'Next', onPress: nextQuestion }
      ]);
    }
  };

  const handleSkip = () => {
    setTotalAttempts(totalAttempts + 1);
    setShowAnswer(true);
    setTimeout(() => {
      nextQuestion();
    }, 1500);
  };

  if (!quizStarted) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>TarmacTrainer</Text>
        <Text style={styles.subtitle}>Master Airport Codes</Text>
        
        <TouchableOpacity style={styles.button} onPress={handleStartQuiz}>
          <Text style={styles.buttonText}>Start Quiz</Text>
        </TouchableOpacity>
        
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Score: {score}/{totalAttempts}</Text>
        {totalAttempts > 0 && (
          <Text style={styles.percentageText}>
            {Math.round((score / totalAttempts) * 100)}%
          </Text>
        )}
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>What is the IATA code for:</Text>
        <Text style={styles.airportName}>{currentAirport.name}</Text>
        <Text style={styles.cityText}>{currentAirport.city}, {currentAirport.country}</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter IATA code (e.g., LAX)"
        value={userAnswer}
        onChangeText={setUserAnswer}
        autoCapitalize="characters"
        maxLength={3}
      />

      {showAnswer && (
        <Text style={styles.answerText}>Answer: {currentAirport.iata}</Text>
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
      </View>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  scoreContainer: {
    position: 'absolute',
    top: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  percentageText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
  },
  questionContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
  },
  questionText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  airportName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  cityText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    width: '100%',
  },
  answerText: {
    fontSize: 18,
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  skipButton: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#666',
    fontSize: 18,
    fontWeight: '600',
  },
});
