import React, { useContext } from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {Icon, withBadge} from 'react-native-elements'
import {colors,parameters} from '../global/styles'
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../contexts/CartContext'; // Import CartContext

export default function HomeHeader(){
    const navigation = useNavigation();
    const { cartItems } = useCart();

    // Tính tổng số lượng sản phẩm
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const BadgeIcon = withBadge(totalQuantity)(Icon);
    
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

            <TouchableOpacity onPress={() => navigation.navigate('ShoppingCart')}>
                <BadgeIcon 
                    type="material-community"
                    name="cart"
                    size={35}
                    color={colors.cardbackground}
                />
            </TouchableOpacity>
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