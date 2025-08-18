import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getRandomAirport } from '../data/airports';

const PracticeScreen = () => {
  const [currentAirport, setCurrentAirport] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    loadProgress();
    nextQuestion();
  }, []);

  const loadProgress = async () => {
    try {
      const savedScore = await AsyncStorage.getItem('practiceScore');
      const savedAttempts = await AsyncStorage.getItem('totalAttempts');
      if (savedScore) setScore(parseInt(savedScore));
      if (savedAttempts) setTotalAttempts(parseInt(savedAttempts));
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

  const saveProgress = async (newScore, newAttempts) => {
    try {
      await AsyncStorage.setItem('practiceScore', newScore.toString());
      await AsyncStorage.setItem('totalAttempts', newAttempts.toString());
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const nextQuestion = () => {
    setCurrentAirport(getRandomAirport());
    setUserAnswer('');
    setShowAnswer(false);
  };

  const checkAnswer = () => {
    if (!userAnswer.trim()) {
      Alert.alert('Please enter an answer');
      return;
    }

    const isCorrect = userAnswer.toUpperCase().trim() === currentAirport.iata;
    const newScore = isCorrect ? score + 1 : score;
    const newAttempts = totalAttempts + 1;

    setScore(newScore);
    setTotalAttempts(newAttempts);
    saveProgress(newScore, newAttempts);

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

  if (!currentAirport) return null;

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

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={checkAnswer}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.skipButton} onPress={nextQuestion}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingHorizontal: 10,
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
  },
  questionText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  airportName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  cityText: {
    fontSize: 18,
    color: '#666',
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
  },
  answerText: {
    fontSize: 18,
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
  },
  buttonContainer: {
    gap: 10,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  skipButton: {
    backgroundColor: '#E0E0E0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  skipButtonText: {
    color: '#666',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default PracticeScreen;