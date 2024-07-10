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

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={Logo} />
        <Image source={Search} style={styles.searchIcon} />
      </View>
      <View style={styles.checkContainer}>
        <Text style={styles.checkText}>Checkout</Text>
        <Image source={underline} style={styles.undelineImg} />
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.cartDescription}>
              <Text style={styles.itemType}>{item.name}</Text>
              <Text style={styles.itemName}>{item.description}</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
            <TouchableOpacity
              onPress={() => removeFromCart(item)}
              style={styles.removeIcon}
            >
              <Image source={remove} />
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.footer}>
        <View style={styles.estTotal}>
          <Text style={styles.totalRow}> EST. TOTAL</Text>
          <Text style={styles.totalAmount}>$ 240</Text>
        </View>
        <View style={styles.footerCheckout}>
          <Image source={shoppingB} style={styles.shopBag} />
          <Text style={styles.checkName}>CHECKOUT</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    right: -10,
    marginTop: 10,
  },
  searchIcon: {
    position: "relative",
    left: 130,
  },
  checkContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  checkText: {
    textTransform: "uppercase",
    textAlign: "center",
    fontSize: 24,
    fontFamily: "Arial",
    letterSpacing: 6,
  },
  undelineImg: {
    width: 198,
    height: 15,
    position: "absolute",
    top: 28,
    left: 104,
    opacity: 0.4,
  },
    product: {
      padding: 10,
      alignItems: "center",
      flexDirection: "row",
      marginLeft: 10
    },
    image: {
      objectFit: 'contain',
      marginBottom: 10,
    },
    cartDescription: {
      display: "flex",
      flexDirection: "column",
      marginLeft: 10,
      fontFamily: 'Arial',
    },
    itemType: {
      fontSize: 20,
      fontFamily: "Arial",
      lineHeight: 20,
      textTransform: 'uppercase'
    },
  itemName: {
    fontSize: 13,
    color: "gray",
    lineHeight: 35,
    textTransform: "capitalize",
  },
  itemPrice: {
    fontSize: 20,
    color: "#FFB668",
  },
  removeIcon: {
    position: "relative",
    top: 50,
  },
  estTotal: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
    marginTop: 20,
  },
  totalRow: {
    fontSize: 20,
    fontFamily: "Arial",
  },
  totalAmount: {
    fontSize: 20,
    color: "#FFB668",
    left: -10,
  },
  footerCheckout: {
    width: "100%",
    height: 40,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  checkName: {
    color: "white",
    fontSize: 16,
    fontFamily: "Arial",
  },
  shopBag: {
    width: 18,
    left: -15,
  },
});

export default CartScreen;
