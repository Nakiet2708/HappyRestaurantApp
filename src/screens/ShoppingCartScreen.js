import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CheckBox from '@react-native-community/checkbox';
import { colors } from '../global/styles';
import { useCart } from '../contexts/CartContext';

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export default function ShoppingCartScreen() {
  const { cartItems, setCartItems, removeFromCart } = useCart();
  const [subtotal, setSubtotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const selectedItems = cartItems.filter(item => item.selected);
    const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal; // Tổng tiền hiện tại không có giảm giá

    setSubtotal(subtotal);
    setTotalPrice(total);
  }, [cartItems]);

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setCartItems(cartItems.map(item => ({ ...item, selected: newSelectAll })));
  };

  const toggleSelectItem = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  };

  const deleteSelectedItems = () => {
    cartItems.forEach(item => {
      if (item.selected) {
        removeFromCart(item.id);
      }
    });
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <CheckBox
        disabled={false}
        value={item.selected}
        onValueChange={() => toggleSelectItem(item.id)}
        tintColors={{ true: colors.buttons, false: colors.grey3 }}
      />
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.optionText}>{item.options.join(', ')}</Text>
        <View style={styles.priceQuantityContainer}>
          <Text style={styles.priceText}>{formatPrice(item.price)} VNĐ</Text>
          <Text style={styles.quantityText}>x{item.quantity}</Text>
        </View>
      </View>
      
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Giỏ Hàng</Text>
      <View style={styles.selectAllContainer}>
        <CheckBox
          disabled={false}
          value={selectAll}
          onValueChange={toggleSelectAll}
          tintColors={{ true: colors.buttons, false: colors.grey3 }}
        />
        <Text style={styles.selectAllText}>Tất cả ({cartItems.length} sản phẩm)</Text>
        <TouchableOpacity onPress={deleteSelectedItems} style={styles.deleteButton}>
          <Icon name="delete" size={24} color={colors.grey2} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Tạm tính:</Text>
        <Text style={styles.totalPrice}>{formatPrice(subtotal)} VNĐ</Text>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Giảm giá:</Text>
        <Text style={styles.totalPrice}>0 VNĐ</Text>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Tổng tiền:</Text>
        <Text style={styles.totalPrice}>{formatPrice(totalPrice)} VNĐ</Text>
      </View>
      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutButtonText}>Tiếp tục</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
    color: colors.black,
  },
  selectAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  selectAllText: {
    fontSize: 16,
    color: colors.black,
    marginLeft: 8,
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 4,
  },
  optionText: {
    fontSize: 14,
    color: colors.grey2,
    marginBottom: 4,
  },
  priceQuantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.buttons,
  },
  quantityText: {
    fontSize: 20,
    color: colors.grey2,
  },
  deleteButton: {
    padding: 8,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.grey5,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.buttons,
  },
  checkoutButton: {
    backgroundColor: colors.buttons,
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});