import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const RoundSummaryScreen = ({ route, navigation }) => {
  const { roundData } = route.params || {};
  
  const {
    roundScore = 0,
    totalQuestions = 10,
    roundTime = 0,
    questionsAndAnswers = []
  } = roundData || {};

  const accuracy = totalQuestions > 0 ? Math.round((roundScore / totalQuestions) * 100) : 0;
  const averageTimePerQuestion = totalQuestions > 0 ? Math.round(roundTime / totalQuestions) : 0;

  const startNewRound = () => {
    navigation.navigate('PracticeMain');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Round Complete!</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{roundScore}</Text>
          <Text style={styles.statLabel}>Correct Answers</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{accuracy}%</Text>
          <Text style={styles.statLabel}>Accuracy</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{Math.round(roundTime)}s</Text>
          <Text style={styles.statLabel}>Total Time</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{averageTimePerQuestion}s</Text>
          <Text style={styles.statLabel}>Avg per Question</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.newRoundButton} onPress={startNewRound}>
          <Text style={styles.buttonText}>Start New Round</Text>
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
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 40,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  statItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '48%',
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  },
  newRoundButton: {
    backgroundColor: '#007AFF',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default RoundSummaryScreen;