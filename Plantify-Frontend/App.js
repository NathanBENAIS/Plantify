import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabs from './components/MainTabs';
import DetailAdvice from './Pages/DetailAdvice';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="MainTabs" 
          component={MainTabs} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="DetailAdvice" 
          component={DetailAdvice} 
          options={{ headerShown: true, title: 'Detail Advice' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}