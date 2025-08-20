import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getRandomAirport, getRandomAirports } from '../data/airportController';

const PracticeScreen = () => {
  const [currentAirport, setCurrentAirport] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [choiceOptions, setChoiceOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

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
    const correctAirport = getRandomAirport();
    setCurrentAirport(correctAirport);
    setUserAnswer('');
    setShowAnswer(false);
    setSelectedAnswer(null);
    
    // Generate 3 incorrect options
    const wrongOptions = getRandomAirports(20)
      .filter(airport => airport.iata !== correctAirport.iata)
      .slice(0, 3);
    
    // Create array with correct answer and 3 wrong answers
    const options = [correctAirport, ...wrongOptions];
    
    // Shuffle the options randomly
    const shuffledOptions = options.sort(() => Math.random() - 0.5);
    setChoiceOptions(shuffledOptions);
  };

  const handleAnswerSelection = (selectedOption) => {
    setSelectedAnswer(selectedOption);
    
    const isCorrect = selectedOption.iata === currentAirport.iata;
    const newScore = isCorrect ? score + 1 : score;
    const newAttempts = totalAttempts + 1;

    setScore(newScore);
    setTotalAttempts(newAttempts);
    saveProgress(newScore, newAttempts);

    if (isCorrect) {
      setTimeout(() => {
        Alert.alert('Correct!', `${currentAirport.iata} is right!`, [
          { text: 'Next', onPress: nextQuestion }
        ]);
      }, 500);
    } else {
      setShowAnswer(true);
      setTimeout(() => {
        Alert.alert('Incorrect', `The correct answer is ${currentAirport.iata}`, [
          { text: 'Next', onPress: nextQuestion }
        ]);
      }, 500);
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
        <Text style={styles.cityText}>{currentAirport.location}, {currentAirport.country}</Text>
      </View>

      <View style={styles.choicesContainer}>
        {choiceOptions.map((option, index) => {
          const isSelected = selectedAnswer && selectedAnswer.iata === option.iata;
          const isCorrect = option.iata === currentAirport.iata;
          const shouldShowCorrect = showAnswer && isCorrect;
          const shouldShowIncorrect = showAnswer && isSelected && !isCorrect;
          
          return (
            <TouchableOpacity
              key={option.iata}
              style={[
                styles.choiceButton,
                isSelected && styles.selectedChoiceButton,
                shouldShowCorrect && styles.correctChoiceButton,
                shouldShowIncorrect && styles.incorrectChoiceButton,
              ]}
              onPress={() => !selectedAnswer && handleAnswerSelection(option)}
              disabled={!!selectedAnswer}
            >
              <Text style={[
                styles.choiceButtonText,
                (isSelected || shouldShowCorrect) && styles.selectedChoiceButtonText,
              ]}>
                {option.iata}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {showAnswer && (
        <Text style={styles.answerText}>Answer: {currentAirport.iata}</Text>
      )}

      <View style={styles.buttonContainer}>
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
  choicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  choiceButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 20,
    width: '48%',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedChoiceButton: {
    borderColor: '#007AFF',
    backgroundColor: '#E8F4FD',
  },
  correctChoiceButton: {
    borderColor: '#34C759',
    backgroundColor: '#E8F8EA',
  },
  incorrectChoiceButton: {
    borderColor: '#FF3B30',
    backgroundColor: '#FFF2F1',
  },
  choiceButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  selectedChoiceButtonText: {
    color: '#007AFF',
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
  skipButton: {
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

export default PracticeScreen;