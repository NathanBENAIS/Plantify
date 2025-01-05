import React from 'react';
import { View, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from '../Pages/Home';
import Advice from '../Pages/Advice';
import Search from '../Pages/Search';
import Account from '../Pages/Account';
import DetailProduct from '../Pages/DetailProduct';



const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const getTabBarIcon = (route, focused, color) => {
    let iconName;
    
    switch (route.name) {
      case 'Home':
        iconName = focused ? 'home-outline' : 'home';
        break;
      case 'Advice':
        iconName = focused ? 'book-outline' : 'book'; 
        break;
      case 'Search':
        iconName = focused ? 'search-outline' : 'search';
        break;
      case 'Account':
        iconName = focused ? 'person-outline' : 'person';
        break;
      default:
        iconName = 'help';
    }

    return (
      <View style={{
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Ionicons 
          name={iconName} 
          size={32} 
          color={color}
        />
      </View>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => getTabBarIcon(route, focused, color),
        tabBarActiveTintColor: '#1A3B0A',
        tabBarInactiveTintColor: '#B4D8B2',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F0F0F0',
          height: 65,
          paddingBottom: Platform.OS === 'ios' ? 15 : 10,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        tabBarShowLabel: false, // Cache les labels
        tabBarItemStyle: {
          padding: 5,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={Home}
      />
      <Tab.Screen 
        name="Advice" 
        component={Advice}
      />
      <Tab.Screen 
        name="Search" 
        component={Search}
      />
      <Tab.Screen 
        name="Account" 
        component={Account}
      />
      <Tab.Screen 
        name="DetailProduct" 
        component={DetailProduct}  
        options={{ 
          tabBarButton: () => null,
        }}
      /> 
    </Tab.Navigator>
  );
}