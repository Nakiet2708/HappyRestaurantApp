import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCart } from '../contexts/CartContext';
import { colors } from '../global/styles';

export default function PaymentOptionsScreen({ navigation, route }) {
  const { cartItems, setCartItems } = useCart();
  const { totalPrice } = route.params; // Nhận totalPrice từ route

  const handlePaymentSuccess = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        const userDoc = await firestore().collection('USERS').doc(user.email).get();
        
        if (userDoc.exists) {
          const { username, phone } = userDoc.data();
          
          if (!username || !phone) {
            Alert.alert("Thông báo", "Bạn hãy nhập đầy đủ thông tin để thanh toán");
            return;
          }

          const dateTime = new Date();
          const tableItems = cartItems.filter(item => item.fromTableDetails);
          const otherItems = cartItems.filter(item => !item.fromTableDetails);
          const status = tableItems.length > 0 ? "Chưa nhận phòng" : "Chưa nhận hàng";

          const appointmentData = {
            dateTime,
            email: user.email,
            username,
            phone,
            tableItems,
            otherItems,
            status,
            totalPrice, 
          };

          await firestore().collection('Appointments').add(appointmentData);
          console.log('Dữ liệu cuộc hẹn đã được thêm thành công vào Firestore');
          Alert.alert("Thông báo", "Thanh toán thành công!");

          // Xóa giỏ hàng sau khi thanh toán thành công
          setCartItems([]);
          navigation.goBack();
        }
      }
    } catch (error) {
      console.error('Lỗi khi thêm dữ liệu cuộc hẹn vào Firestore:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chọn phương thức thanh toán</Text>
      <TouchableOpacity onPress={handlePaymentSuccess}>
        <Text style={styles.paymentOption}>Thanh toán thành công</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.paymentOption}>Hủy</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.black,
  },
  paymentOption: {
    fontSize: 18,
    color: colors.buttons,
    marginVertical: 10,
  },
});
