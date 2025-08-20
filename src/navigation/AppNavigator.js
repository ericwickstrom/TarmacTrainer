import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import PracticeScreen from '../screens/PracticeScreen';
import LearnScreen from '../screens/LearnScreen';
import ProgressScreen from '../screens/ProgressScreen';
import RoundSummaryScreen from '../screens/RoundSummaryScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabIcon = ({ name, focused }) => {
  const icons = {
    'Home': '🏠',
    'Practice': '✈️',
    'Learn': '📚',
    'Progress': '📊'
  };
  
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ fontSize: 20 }}>{icons[name]}</Text>
      <Text style={{ 
        fontSize: 10, 
        color: focused ? '#007AFF' : '#666',
        marginTop: 2
      }}>
        {name}
      </Text>
    </View>
  );
};

const PracticeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="PracticeMain" 
        component={PracticeScreen}
        options={{ 
          title: 'Practice Mode',
          headerStyle: { backgroundColor: '#007AFF' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' }
        }}
      />
      <Stack.Screen 
        name="RoundSummary" 
        component={RoundSummaryScreen}
        options={{ 
          title: 'Round Summary',
          headerStyle: { backgroundColor: '#007AFF' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerLeft: null
        }}
      />
    </Stack.Navigator>
  );
};

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => (
          <TabIcon name={route.name} focused={focused} />
        ),
        tabBarLabel: () => null,
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ 
          title: 'TarmacTrainer',
          headerShown: true,
          headerStyle: { backgroundColor: '#007AFF' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' }
        }}
      />
      <Tab.Screen 
        name="Practice" 
        component={PracticeStack}
        options={{ title: 'Practice Mode' }}
      />
      <Tab.Screen 
        name="Learn" 
        component={LearnScreen}
        options={{ 
          title: 'Learn Airports',
          headerShown: true,
          headerStyle: { backgroundColor: '#007AFF' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' }
        }}
      />
      <Tab.Screen 
        name="Progress" 
        component={ProgressScreen}
        options={{ 
          title: 'Your Progress',
          headerShown: true,
          headerStyle: { backgroundColor: '#007AFF' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' }
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;