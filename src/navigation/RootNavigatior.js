import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Auth from './authStack';

export default function RootNavigator() {
    return (
        <NavigationContainer>
            <Auth />
        </NavigationContainer>
    );
}