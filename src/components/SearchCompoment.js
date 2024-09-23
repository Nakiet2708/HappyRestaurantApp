import React, { useState, useEffect,useRef } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback,Modal,TextInput,FlatList,TouchableOpacity,Keyboard } from 'react-native';
import { Icon, Paragraph } from 'react-native-elements';
import { colors } from '../global/styles';
import {useNavigation} from '@react-navigation/native'
import * as Animatable from 'react-native-animatable';
import {filterData} from '../global/Data'


export default function SearchComponent() {
    const navigation = useNavigation()
    const [data,setData] = useState([...filterData])
    const [modalVisible, setModalVisible] = useState(false);
    const [textInputFossued, setTextInputFossued] = useState(true);
    const textInput = useRef(0)

  return (
    <View style={{alignItems:'center'}}>
      <TouchableWithoutFeedback
      onPress={() => setModalVisible(true)}
      >
        <View style={[styles.SearchArea]}>
          <Icon 
            name="search"
            style={styles.searchIcon}
            type="material"
            iconStyle={{marginLeft:5}}
            size={32}
          />
          <Text style={{fontSize:15}}>What are you looking for ?</Text>
        </View>
      </TouchableWithoutFeedback>
      <Modal
        animationType="fade"
        transparent={false}
        visible={modalVisible}
      >
        <View style={styles.modal}>
          <View style={styles.view1}>
            <View style={styles.TextInput}>
              <Animatable.View style={styles.iconContainer}
                animation= {textInputFossued ? "fadeInRight" : "fadeInLeft"}
                duration={400}
              >
                <Icon 
                  name={textInputFossued ? "arrow-back" : "search"}
                  onPress={() => {
                    if(textInputFossued)
                      setModalVisible(false)
                    setTextInputFossued(true)
                  }}
                  style={styles.icon2}
                  type="material"
                  iconStyle={{marginRight:5}}
                />
              </Animatable.View>
              <TextInput
                placeholder=""
                style={styles.input}
                autoFocus={false}
                ref={textInput}
                onFocus={() => setTextInputFossued(true)}
                onBlur={() => setTextInputFossued(false)}
              />
              <Animatable.View style={styles.iconContainer}>
                <Icon
                  name={textInputFossued ? "close" : null}
                  iconStyle={{color: colors.grey3}}
                  type="material"
                  style={styles.closeIcon}
                  onPress={() => {
                    textInput.current.clear()
                    // handleSearch()
                  }}
                />
              </Animatable.View>
            </View>
          </View>
          <FlatList
            data={data}
            renderItem={({ item }) => (
                <TouchableOpacity
                onPress={() => {
                    Keyboard.dismiss()
                    navigation.navigate("RestaurantSearchScreen", {item:item.name})
                    setModalVisible(false)
                    setTextInputFosused(true)
                }}
                >
                <View style={styles.view2}>
                    <Text style={{color:colors.grey2, fontSize:15}}>{item.name}</Text>
                </View>
                </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
            />
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text1: {
    color: colors.grey3,
    fontSize: 16
  },
  TextInput: {
    borderWidth: 1,
    borderRadius: 12,
    marginHorizontal: 0,
    borderColor: "#86939e",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
  iconContainer: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SearchArea: {
    marginTop: 10,
    width: "94%",
    height: 50,
    backgroundColor: colors.grey5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.grey4,
    flexDirection: "row",
    alignItems: "center"
  },
  searchIcon: {
    fontSize: 24,
    padding: 5,
    color: colors.grey2,
  },
  view1: {
    height: 70,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  view2: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  icon2: {
    fontSize: 24,
    padding: 5,
    color: colors.grey2,
  },
  modal: {
    flex: 1,

    
  },
  closeIcon: {
    padding: 5,
  },
});