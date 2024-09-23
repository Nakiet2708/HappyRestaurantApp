import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {Icon, withBadge} from 'react-native-elements'
import {colors,parameters} from '../global/styles'
import { useNavigation } from '@react-navigation/native';

export default function HomeHeader(){
    const navigation = useNavigation();
    const BadgeIcon = withBadge(1)(Icon);   
    return(
        
        <View style={styles.header}>
            
            <View style={{alignItems:"center", justifyContent:"center", marginLeft:15}}>
                <Icon 
                    type = "material-community"
                    name = "menu"
                    color = {colors.cardbackground}
                    size = {32}
                />
            </View>
            
            <View style={{alignItems:"center", justifyContent:"center"}}>
                <Text style={{color:colors.cardbackground, fontSize:25, fontWeight:'bold'}}>HappyFood</Text>
            </View>

            <View style={{alignItems:"center", justifyContent:"center", marginRight:15}}>
                <BadgeIcon 
                    type="material-community"
                    name="cart"
                    size={35}
                    color={colors.cardbackground}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        flexDirection: 'row',
        backgroundColor: colors.buttons,
        height:parameters.headerHeight,
        justifyContent:"space-between"
    }
})