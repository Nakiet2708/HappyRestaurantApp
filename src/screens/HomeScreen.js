import React, {useState} from 'react'
import {View, Text, StyleSheet, Dimensions, TouchableOpacity,
    ScrollView,FlatList,Pressable,Image} from 'react-native' 
import {colors} from '../global/styles'
import {Icon,Paragraph} from 'react-native-elements'
import HomeHeader from '../components/HomeHeader'
import { filterData,restaurantsData } from '../global/Data'
import FoodCard from '../components/FoodCard'
import CountDown from 'react-native-countdown-component';
import { useNavigation } from '@react-navigation/native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function HomeScreen(){
    const [delivery, setDelivery] = useState(true)
    const [indexCheck, setIndexCheck] = useState(-1)
    const navigation = useNavigation();
    
    return(
    <View style={styles.container}>
            <HomeHeader />
    <ScrollView
                stickyHeaderIndices={[0]}
                showsVerticalScrollIndicator={true}
        >
        <View style={{backgroundColor:colors.cardbackground,paddingBottom:5}}>   
            <View style={{flexDirection:"row", justifyContent:"space-evenly", alignItems:"center", marginTop:5}}>
                <TouchableOpacity
                    onPress={() => {
                        setDelivery(true);
                        navigation.navigate('HomeMain');
                    }}
                >
                
                    <View style={{...styles.deliveryButton, backgroundColor:delivery ? colors.buttons : colors.grey5}}>
                        <Text style={styles.deliveryText}>Vận Chuyển</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setDelivery(false);
                        navigation.navigate('RestaurantsMap');
                    }}
                >
                    <View style={{...styles.deliveryButton, backgroundColor:delivery ? colors.grey5 : colors.buttons}}>
                        <Text style={styles.deliveryText}>Vị Trí</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View > 
        
        <View style={styles.filterView}>
            <View style={styles.locationView}>
                <View style={{flexDirection:"row", alignItems:"center",paddingLeft:40}}>
                    <Icon
                        type = "material-community"
                        name="map-marker"
                        color={colors.grey1}
                        size={26}
                    />
                    <Text style={{marginLeft:5}}>
                        Vị trí của bạn
                    </Text>
                </View>
            <View>
                <View style={styles.clockView}>
                    <Icon
                        type = "material-community"
                        name="clock-time-four"
                        color={colors.grey1}
                        size={25}
                    />
                    <Text style={{marginLeft:5}}>
                        Bây giờ
                    </Text>
                </View>
            </View>
        </View>
        
        <View>
            <Icon
                type = "material-community"
                name="tune"
                color={colors.grey1}
                size={25}          
            />
        </View>
        </View>
        <View style={styles.headerTextView}>
            <Text style={styles.headerText}>
                Thể loại
            </Text>
        </View>

        <View>
            <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={filterData}
                keyExtractor={(item) => item.id}
                extraData={indexCheck}
                renderItem={({item, index}) => (
            <Pressable
                onPress={() => setIndexCheck(item.id)}
            >
                <View style={indexCheck === item.id ? {...styles.smallCardSelected} : {...styles.smallCard}}>
                    <Image source={item.image} style={{width:60, height:60,borderRadius:30}}/>
                    <View>
                        <Text style={indexCheck === item.name ? {...styles.smallCardTextSelected} : {...styles.smallCardText}}>{item.name}</Text>
                    </View>
                </View>
            </Pressable>
            
        )}
        
    />
    </View>
    <View style={styles.headerTextView}>
            <Text style={styles.headerText}>
                Miễn phí vận chuyển
            </Text>
    </View>
    <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
            <Text style={{marginLeft:15, fontSize:20, marginTop:-10, marginRight:5}}>
                Hết miễn phí trong
            </Text>
            <CountDown 
                until={3600}
                size={16}
                digitStyle={{backgroundColor: colors.grey1, borderWidth: 2, borderColor: colors.lightgreen}}
                digitTxtStyle={{color: colors.cardbackground}}
                timeToShow={['M', 'S']}
                timeLabels={{m: 'Phút', s: 'Giây'}}
                showSeparator={true}

            />
        </View>
        <FlatList
            style={{marginTop: 10,marginBottom: 10}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={restaurantsData}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
                <FoodCard
                    restaurantName={item.restaurantName}
                    farAway={item.farAway}
                    businessAddress={item.businessAddress}
                    images={item.images}
                    averageReview={item.averageReview}
                    numberOfReview={item.numberOfReview}
                />
            )}
        />
    </View>

    <View style={styles.headerTextView}>
            <Text style={styles.headerText}>
                Khuyến mãi có sẵn
            </Text>
    </View>
    <View>
        <FlatList
            style={{marginTop: 10,marginBottom: 10}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={restaurantsData}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
                <FoodCard
                    restaurantName={item.restaurantName}
                    farAway={item.farAway}
                    businessAddress={item.businessAddress}
                    images={item.images}
                    averageReview={item.averageReview}
                    numberOfReview={item.numberOfReview}
                />
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
                <FoodCard
                    screenWidth={SCREEN_WIDTH*0.95}
                    images={item.images}
                    restaurantName={item.restaurantName}
                    farAway={item.farAway}
                    businessAddress={item.businessAddress}
                    averageReview={item.averageReview}
                    numberOfReview={item.numberOfReview}
                />
            </View>
        ))
    }
</View>


    </ScrollView>
    <View style={styles.floatButton}>
        <TouchableOpacity onPress={() => navigation.navigate('RestaurantsMap')}>
        <Icon
            type = "material-community"
            name="map-marker"
            color={colors.buttons}
            size={25}
        />
        <Text style={{fontSize:14, fontWeight:"bold", color:colors.buttons}}>Map</Text>
        </TouchableOpacity>
    </View>

    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        
    },
    deliveryButton:{
        paddingHorizontal:20,
        paddingVertical:5,
        borderRadius:15,
    },
    deliveryText:{
        marginLeft:5,
        fontSize:16,
    },
    filterView:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-evenly",
        marginHorizontal:10,
        marginVertical:8
    },
    clockView:{
        flexDirection:"row", 
        alignItems:"center", 
        marginLeft:40,
        backgroundColor:colors.cardbackground,
        borderRadius:15,
        paddingHorizontal:5,
        paddingVertical:5,
        marginRight:40
    },
    locationView:{
        flexDirection:"row",
        backgroundColor:colors.grey5,
        borderRadius:15,
        paddingVertical:3,

        justifyContent:"space-between"
    },
    headerText:{
        fontSize:25,
        fontWeight:"bold",
        marginLeft:10,
        color:colors.grey2
    },
    headerTextView:{
        backgroundColor:colors.grey5,
        paddingVertical:2,
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
    smallCardSelected:{
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
        justifyContent:"center",
        borderWidth:1,
        borderColor:colors.buttons
      }
})