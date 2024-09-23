import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Import các màn hình từ các file riêng biệt
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import MyOrdersScreen from '../screens/MyOrdersScreen';
import MyAccountScreen from '../screens/MyAccountScreen';
import RestaurantsMapScreen from '../screens/RestaurantsMapScreens';

const ClientTab = createBottomTabNavigator();



export default function RootClientTabs() {
  return (
    <ClientTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Thêm dòng này để ẩn header cho tất cả các tab
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Search') {
            iconName = 'search';
          } else if (route.name === 'Orders') {
            iconName = 'list';
          } else if (route.name === 'Account') {
            iconName = 'person';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <ClientTab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          tabBarLabel: 'Home',
          headerShown: false // Hoặc thêm ở đây nếu bạn chỉ muốn ẩn cho tab Home
        }} 
      />
      <ClientTab.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{ 
          tabBarLabel: 'Search',
          headerShown: false 
        }} 
      />
      <ClientTab.Screen 
        name="Orders" 
        component={MyOrdersScreen} 
        options={{ 
          tabBarLabel: 'My Orders',
          headerShown: false 
        }} 
      />
      <ClientTab.Screen 
        name="Account" 
        component={MyAccountScreen} 
        options={{ 
          tabBarLabel: 'My Account',
          headerShown: false 
        }} 
      />
      
    </ClientTab.Navigator>
  );
}