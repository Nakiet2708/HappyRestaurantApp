import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, FlatList, Pressable, Image, Alert } from 'react-native';
import { colors } from '../global/styles';
import { Icon } from 'react-native-elements';
import HomeHeader from '../components/HomeHeader';
import FoodCard from '../components/FoodCard';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import CountDown from 'react-native-countdown-component';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function HomeScreen() {
    const [delivery, setDelivery] = useState(true);
    const [indexCheck, setIndexCheck] = useState(-1);
    const [restaurantsData, setRestaurantsData] = useState([]);
    const navigation = useNavigation();
    const [menuData, setMenuData] = useState([]);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const restaurantsCollection = await firestore().collection('restaurants').get();
                const restaurantsList = await Promise.all(restaurantsCollection.docs.map(async (doc) => {
                    const restaurantData = doc.data();
                    let reviewScoreData = { averageReview: 0, numberOfReview: 0 };
    
                    try {
                        const reviewScoreCollection = await firestore()
                            .collection('restaurants')
                            .doc(doc.id)
                            .collection('reviewScore')
                            .get();
    
                        if (!reviewScoreCollection.empty) {
                            const reviewScoreDoc = reviewScoreCollection.docs[0];
                            reviewScoreData = reviewScoreDoc.data();
                        } else {
                            console.log(`No reviewScore document found for restaurant ${doc.id}`);
                        }
                    } catch (error) {
                        console.error(`Error fetching reviewScore for restaurant ${doc.id}:`, error);
                    }
    
                    return {
                        id: doc.id,
                        ...restaurantData,
                        averageReview: reviewScoreData.averageReview || 0,
                        numberOfReview: reviewScoreData.numberOfReview || 0
                    };
                }));
    
                setRestaurantsData(restaurantsList);

                const menuCollection = await firestore().collection('menu').get();
                const menuList = menuCollection.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setMenuData(menuList);
            } catch (error) {
                console.error('Error fetching restaurants:', error);
                Alert.alert('Error', 'Failed to fetch restaurants data');
            }
        };
    
        fetchRestaurants();
    }, []);

    return (
        <View style={styles.container}>
            <HomeHeader />
            <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={true}>
                <View style={{ backgroundColor: colors.cardbackground, paddingBottom: 5 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", marginTop: 5 }}>
                        <TouchableOpacity
                            onPress={() => {
                                setDelivery(true);
                                navigation.navigate('HomeMain');
                            }}
                        >
                            <View style={{ ...styles.deliveryButton, backgroundColor: delivery ? colors.buttons : colors.grey5 }}>
                                <Text style={styles.deliveryText}>Vận Chuyển</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setDelivery(false);
                                navigation.navigate('RestaurantsMap');
                            }}
                        >
                            <View style={{ ...styles.deliveryButton, backgroundColor: delivery ? colors.grey5 : colors.buttons }}>
                                <Text style={styles.deliveryText}>Vị Trí</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.filterView}>
                    <View style={styles.locationView}>
                        <View style={{ flexDirection: "row", alignItems: "center", paddingLeft: 40 }}>
                            <Icon type="material-community" name="map-marker" color={colors.grey1} size={26} />
                            <Text style={{ marginLeft: 5 }}>Vị trí của bạn</Text>
                        </View>
                        <View>
                            <View style={styles.clockView}>
                                <Icon type="material-community" name="clock-time-four" color={colors.grey1} size={25} />
                                <Text style={{ marginLeft: 5 }}>Bây giờ</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Icon type="material-community" name="tune" color={colors.grey1} size={25} />
                    </View>
                </View>

                <View style={styles.headerTextView}>
                    <Text style={styles.headerText}>Thể loại</Text>
                </View>

                <View>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={menuData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => navigation.navigate('ProductScreen', { categoryId: item.id, categoryName: item.name })}>
                                <View style={styles.smallCard}>
                                    <Image 
                                        source={{ uri: item.image }} // Assuming the image field in Firestore is a URL
                                        style={{ width: 60, height: 60, borderRadius: 30 }} 
                                    />
                                    <View>
                                        <Text style={styles.smallCardText}>{item.name}</Text>
                                    </View>
                                </View>
                            </Pressable>
                        )}
                    />
                </View>
                
                <View style={styles.headerTextView}>
                    <Text style={styles.headerText}>Khuyến mãi</Text>
                </View>
                <View>
                    {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                        <Text style={{ marginLeft: 15, fontSize: 20, marginTop: -10, marginRight: 5 }}>Hết miễn phí trong</Text>
                        <CountDown
                            until={3600}
                            size={16}
                            digitStyle={{ backgroundColor: colors.grey1, borderWidth: 2, borderColor: colors.lightgreen }}
                            digitTxtStyle={{ color: colors.cardbackground }}
                            timeToShow={['M', 'S']}
                            timeLabels={{ m: 'Phút', s: 'Giây' }}
                            showSeparator={true}
                        />
                    </View> */}
                    <FlatList
                        style={{ marginTop: 10, marginBottom: 10 }}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={restaurantsData}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity                                
                                onPress={() => {
                                    navigation.navigate('RestaurantScreen', { restaurantId: item.id });
                                }}
                            >
                                <FoodCard
                                    screenWidth={SCREEN_WIDTH * 0.8}
                                    images={item.images}
                                    restaurantName={item.restaurantName}
                                    businessAddress={item.businessAddress}
                                    averageReview={item.averageReview}
                                    numberOfReview={item.numberOfReview}
                                />
                            </TouchableOpacity>
                        )}
                    />
                </View>
                
                
                <View style={styles.headerTextView}>
        <Text style={styles.headerText}>Nhà hàng gần bạn</Text>
    </View>
    
    <View style={{width:SCREEN_WIDTH, paddingTop:10}}>
    {
        restaurantsData.map(item => (
               
            <View key={item.id} style={{paddingBottom:20}}>
                <TouchableOpacity                                
                    onPress={() => {
                        navigation.navigate('RestaurantScreen', { restaurantId: item.id });
                    }}
                >
                    <FoodCard
                        screenWidth={SCREEN_WIDTH * 0.95}
                        images={item.images}
                        restaurantName={item.restaurantName}
                        businessAddress={item.businessAddress}
                        averageReview={item.averageReview}
                        numberOfReview={item.numberOfReview}
                    />
                    </TouchableOpacity>
            </View>
        ))
    }
</View>

            </ScrollView>
            <View style={styles.floatButton}>
                <TouchableOpacity onPress={() => navigation.navigate('RestaurantsMap')}>
                    <Icon type="material-community" name="map-marker" color={colors.buttons} size={25} />
                    <Text style={{ fontSize: 14, fontWeight: "bold", color: colors.buttons }}>Map</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    deliveryButton: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 15,
    },
    deliveryText: {
        marginLeft: 5,
        fontSize: 16,
    },
    filterView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginHorizontal: 10,
        marginVertical: 8
    },
    clockView: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 40,
        backgroundColor: colors.cardbackground,
        borderRadius: 15,
        paddingHorizontal: 5,
        paddingVertical: 5,
        marginRight: 40
    },
    locationView: {
        flexDirection: "row",
        backgroundColor: colors.grey5,
        borderRadius: 15,
        paddingVertical: 3,
        justifyContent: "space-between"
    },
    headerText: {
        fontSize: 25,
        fontWeight: "bold",
        marginLeft: 10,
        color: colors.grey2
    },
    headerTextView: {
        backgroundColor: colors.grey5,
        paddingVertical: 2,
    },
    smallCard: {
        borderRadius: 30,
        backgroundColor: colors.grey5,
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        width: 80,
        margin: 10,
        height: 100
    },
    smallCardSelected: {
        borderRadius: 30,
        backgroundColor: colors.buttons,
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        width: 80,
        margin: 10,
        height: 100
    },
    smallCardTextSelected: {
        fontWeight: "bold",
        color: colors.cardbackground
    },
    smallCardText: {
        fontWeight: "bold",
        color: colors.grey2
    },
    floatButton: {
        position: 'absolute',
        bottom: 10,
        right: 15,
        backgroundColor: colors.white,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: "center",
        borderWidth: 1,
        borderColor: colors.buttons
    }
});