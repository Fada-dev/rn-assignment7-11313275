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
import axios from "axios"; 
import Menu from "./assets/Menu.png";
import Logo from "./assets/Logo.png";
import Search from "./assets/Search.png";
import shoppingBag from "./assets/shoppingBag.png";
import Listview from "./assets/Listview.png";
import Filter from "./assets/Filter.png";
import add_circle from "./assets/add_circle.png";

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products from API", error);
      }
    };

    fetchProducts();

    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem("cart");
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error("Failed to load cart from local storage", error);
      }
    };

    loadCart();
  }, []);

  const addToCart = async (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);

    try {
      await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.error("Failed to save cart to local storage", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={Menu} />
        <View style={styles.logo}>
          <Image source={Logo} />
        </View>
        <View style={styles.searchContainer}>
          <TouchableOpacity>
            <Image source={Search} styles={styles.searchButton} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Cart", { cart })}>
            <Image source={shoppingBag} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.storyContainer}>
        <Text style={styles.storyText}>OUR STORY</Text>
        <View style={styles.actionContainer}>
          <View style={styles.actionBackgroundList}>
            <Image source={Listview} style={styles.listImage} />
          </View>
          <View style={styles.actionBackground}>
            <Image source={Filter} style={styles.filterImage} />
          </View>
        </View>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.description}>
              <Text style={styles.itemType}>{item.title}</Text>
              <Text style={styles.itemName}>{item.description}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
            </View>
            <TouchableOpacity style={styles.addIconContainer} onPress={() => addToCart(item)}>
              <Image source={add_circle} style={styles.addIcon} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    position: "relative",
  },
  searchButton: {
    position: "absolute",
    borderWidth: 1,
  },
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    width: 70,
    justifyContent: "space-between",
  },
  logo: {
    display: "flex",
    left: 20,
  },
  product: {
    flex: 1,
    margin: 10,
    marginBottom: -45, 
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: 10,
    objectFit: 'contain'
  },
  storyContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  storyText: {
    fontSize: 24,
    fontFamily: "Arial",
    letterSpacing: 6,
  },
  actionContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "auto",
  },
  description: {
    position: 'relative',
    top: -30
  },
  actionBackground: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: "#ECECEC",
    justifyContent: "center",
    alignItems: "center",
  },
  actionBackgroundList: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: "#ECECEC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  itemType: {
    fontSize: 16,
    fontFamily: "Arial",
    lineHeight: 20,
  },
  itemName: {
    fontSize: 13,
    color: "gray",
    lineHeight: 20,
  },
  itemPrice: {
    fontSize: 20,
    color: "#FFB668",
  },
  addIconContainer: {
    position: "absolute",
    bottom: 115,
    right: 5,
  },
});

export default HomeScreen;
