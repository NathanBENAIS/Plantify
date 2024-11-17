import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from '../Pages/Home';
import Advice from '../Pages/Advice';
import Search from '../Pages/Search';
import Account from '../Pages/Account';
import DetailProduct from '../Pages/DetailProduct';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Advice') {
            iconName = focused ? 'information-circle' : 'information-circle-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#f8f8f8',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Advice" component={Advice} options={{ headerShown: false }} />
      <Tab.Screen name="Search" component={Search} options={{ headerShown: false }} />
      <Tab.Screen name="Account" component={Account} options={{ headerShown: false }} />
      <Tab.Screen name="DetailProduct" component={DetailProduct}   options={{ headerShown: false, tabBarButton: () => null  }} 
/>
    </Tab.Navigator>
  );
}
