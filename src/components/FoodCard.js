import React from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet, Dimensions} from 'react-native';

import {
  Icon
} from 'react-native-elements';

import {colors, parameters} from '../global/styles';

export default function FoodCard({
  OnPressFoodCard,
  restaurantName,   
  deliveryAvailable,
  discountAvailable,
  discountPercent,
  numberOfReview,
  businessAddress,
  farAway,
  averageReview,
  images,
  screenWidth
}) {
  return(
    <TouchableOpacity>
<View style={{...styles.cardView, width: screenWidth}}>
    <Image 
        style={{...styles.image, width: screenWidth}}
        source={{uri: images}}
    />
    <View style={styles.details}>
        <View>
            <Text style={styles.restaurantName}>{restaurantName}</Text>
        </View>
        <View style={{flexDirection: "row", alignItems: "center"}}>
            <View style={styles.distance}>
                <Icon
                    name="place"
                    type="material"
                    color={colors.grey2}
                    size={18}
                    iconStyle={{
                        marginTop: 3
                    }}
                />
                <Text style={styles.Min}>{farAway} Min</Text>
            </View>
            <View style={styles.address}>
                <Text style={styles.text}>{businessAddress}</Text>
            </View>
        </View>
    </View>
    <View style={styles.review}>
        <Text style={styles.averageReview}>{averageReview}</Text>
        <Text style={styles.numberOfReview}>{numberOfReview} reviews</Text>
    </View>
</View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    cardView: {
        marginHorizontal: 9,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        borderWidth: 1,
        borderColor: colors.grey4,
        borderBottomLeftRadius: 5,

    },
    image: {
        height: 150,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
    },
    restaurantName : {
        fontSize: 17,
        fontWeight: 'bold',
        color: colors.grey1,
        marginTop: 5,
    },
    distance : {
        flex: 1,
        flexDirection: "row",
        borderRightColor: colors.grey4,
        paddingHorizontal: 5,
        borderRightWidth: 1,
    },
    Min : {
        fontSize: 12,
        fontWeight: 'bold',
        paddingTop: 5,
        color: colors.grey3,
    },
    address : {
        flex: 9,
        flexDirection: 'row',
        borderRightColor: colors.grey4,
        paddingHorizontal: 5,
        borderRightWidth: 1,
        maxWidth: 200,
    },
    details: {
        padding: 10,
    },
    review: {
        position: 'absolute',
        top: 0,
        right: 10,
        backgroundColor: 'rgba(52, 52, 52, 0.3)',
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 12,
    },
    averageReview: {
        color: "white", 
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: -3,
    },
    numberOfReview: {
        color: "white", 
        fontSize: 13,
        marginRight: 0,
        marginLeft: 0,
    }
});