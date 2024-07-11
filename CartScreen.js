import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import remove from "./assets/remove.png";
import Logo from "./assets/Logo.png";
import Search from "./assets/Search.png";
import underline from './assets/underline.png';
import shoppingB from "./assets/shoppingB.png";

const CartScreen = ({ route, navigation }) => {
  const { cart } = route.params;
  const [cartItems, setCartItems] = useState(cart);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem("cart");
        if (storedCart) {
          setCartItems(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error("Failed to load cart from local storage", error);
      }
    };

    loadCart();
  }, []);

  const removeFromCart = async (product) => {
    const updatedCart = cartItems.filter((item) => item.id !== product.id);
    setCartItems(updatedCart);

    try {
      await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.error("Failed to update cart in local storage", error);
    }
  };

  const truncateDescription = (description, limit) => {
    const words = description.split(" ");
    return words.length > limit ? words.slice(0, limit).join(" ") + "..." : description;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={Logo} />
        <Image source={Search} style={styles.searchIcon} />
      </View>
      <View style={styles.checkContainer}>
        <Text style={styles.checkText}>CHECKOUT</Text>
        <Image source={underline} style={styles.underlineImg} />
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.cartDescription}>
              <Text style={styles.itemType}>{item.title}</Text>
              <Text style={styles.itemName}>{truncateDescription(item.description, 4)}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
            </View>
            <TouchableOpacity
              onPress={() => removeFromCart(item)}
              style={styles.removeIcon}
            >
              <Image source={remove} style={styles.removeImage} />
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.footer}>
        <View style={styles.estTotal}>
          <Text style={styles.totalRow}>EST. TOTAL</Text>
          <Text style={styles.totalAmount}>${cartItems.reduce((sum, item) => sum + item.price, 0)}</Text>
        </View>
        <TouchableOpacity style={styles.footerCheckout}>
          <Image source={shoppingB} style={styles.shopBag} />
          <Text style={styles.checkName}>CHECKOUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    right: -10,
    marginTop: 10
  },
  searchIcon: {
    position: 'relative',
    left: 130
  },
  checkContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  checkText: {
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 24,
    fontFamily: "Arial",
    letterSpacing: 6,
  },
  underlineImg: {
    width: 200,
    height: 2,
    marginTop: 5,
    left: 105
  },
  product: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  image: {
    width: 100,
    height: 150,
    resizeMode: 'contain',
  },
  cartDescription: {
    flex: 1,
    marginLeft: 20,
  },
  itemType: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemName: {
    fontSize: 14,
    color: "gray",
    marginVertical: 5,
  },
  itemPrice: {
    fontSize: 16,
    color: "#FFB668",
  },
  removeIcon: {
    padding: 10,
  },
  removeImage: {
    width: 20,
    height: 20,
  },
  estTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  totalRow : {
    fontSize: 20,
    fontFamily: 'Arial'
  },
  totalAmount: {
    fontSize: 18,
    color: "#FFB668",
  },
  footerCheckout: {
    width: '100%',
    height: 40,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  checkName: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Arial'
  },
  shopBag: {
    width: 18,
    left: -15
  }
});

export default CartScreen;
