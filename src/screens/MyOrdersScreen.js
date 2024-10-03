import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import HomeHeader from '../components/HomeHeader';

export default function MyOrdersScreen(){
    return(
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <HomeHeader />
            <Text>My Orders</Text>
        </View>
    )
}