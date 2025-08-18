import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProgressScreen = () => {
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const savedScore = await AsyncStorage.getItem('practiceScore');
      const savedAttempts = await AsyncStorage.getItem('totalAttempts');
      
      const scoreValue = savedScore ? parseInt(savedScore) : 0;
      const attemptsValue = savedAttempts ? parseInt(savedAttempts) : 0;
      
      setScore(scoreValue);
      setTotalAttempts(attemptsValue);
      
      if (attemptsValue > 0) {
        setAccuracy(Math.round((scoreValue / attemptsValue) * 100));
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

  const resetProgress = () => {
    Alert.alert(
      'Reset Progress',
      'Are you sure you want to reset all your progress?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('practiceScore');
              await AsyncStorage.removeItem('totalAttempts');
              setScore(0);
              setTotalAttempts(0);
              setAccuracy(0);
              Alert.alert('Progress Reset', 'Your progress has been reset successfully.');
            } catch (error) {
              console.error('Error resetting progress:', error);
            }
          }
        }
      ]
    );
  };

  const getPerformanceMessage = () => {
    if (totalAttempts === 0) return 'Start practicing to see your progress!';
    if (accuracy >= 90) return 'Outstanding! You\'re an airport code master!';
    if (accuracy >= 75) return 'Great job! Keep up the excellent work!';
    if (accuracy >= 60) return 'Good progress! Keep practicing!';
    if (accuracy >= 40) return 'You\'re learning! Practice makes perfect!';
    return 'Keep trying! Every attempt helps you improve!';
  };

  const getPerformanceColor = () => {
    if (accuracy >= 90) return '#4CAF50';
    if (accuracy >= 75) return '#8BC34A';
    if (accuracy >= 60) return '#FFC107';
    if (accuracy >= 40) return '#FF9800';
    return '#F44336';
  };

  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        <Text style={styles.title}>Your Progress</Text>
        
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Total Questions</Text>
          <Text style={styles.statValue}>{totalAttempts}</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Correct Answers</Text>
          <Text style={styles.statValue}>{score}</Text>
        </View>

        <View style={[styles.statCard, styles.accuracyCard]}>
          <Text style={styles.statLabel}>Accuracy</Text>
          <Text style={[styles.accuracyValue, { color: getPerformanceColor() }]}>
            {totalAttempts > 0 ? `${accuracy}%` : 'N/A'}
          </Text>
        </View>

        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{getPerformanceMessage()}</Text>
        </View>

        {totalAttempts > 0 && (
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${accuracy}%`,
                  backgroundColor: getPerformanceColor()
                }
              ]} 
            />
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={resetProgress}>
        <Text style={styles.resetButtonText}>Reset Progress</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  statsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  statCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  accuracyCard: {
    backgroundColor: '#f8f9fa',
  },
  statLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  accuracyValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  messageContainer: {
    backgroundColor: '#E3F2FD',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  messageText: {
    fontSize: 16,
    color: '#1976D2',
    textAlign: 'center',
    fontWeight: '500',
  },
  progressBar: {
    height: 20,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressFill: {
    height: '100%',
    borderRadius: 10,
  },
  resetButton: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProgressScreen;