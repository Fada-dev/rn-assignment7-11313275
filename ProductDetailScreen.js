import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import doNotBleach from './assets/Do Not Bleach.png';
import doNotTumbleDry from './assets/Do Not Tumble Dry.png';
import dryClean from './assets/Do Not Wash.png';
import iron from './assets/Iron Low Temperature.png';
import Logo from "./assets/Logo.png";
import Search from "./assets/Search.png";
import shoppingBag from "./assets/shoppingBag.png";
import Menu from "./assets/Menu.png";


import backIcon from './assets/Backward.png';


const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;

  return (
    <View style={styles.containerOverall}>
             <View style={styles.header}>
          <TouchableOpacity onPress={() => drawer.current.openDrawer()}>
            <Image source={Menu} />
          </TouchableOpacity>
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

  
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.sectionTitle}>MATERIALS</Text>
      <Text style={styles.description}>{product.description}</Text>
      <View style={styles.iconRow}>
        <View style={styles.iconContainer}>
          <Image source={doNotBleach} style={styles.icon} />
          <Text style={styles.iconText}>Do not use bleach</Text>
        </View>
        <View style={styles.iconContainer}>
          <Image source={doNotTumbleDry} style={styles.icon} />
          <Text style={styles.iconText}>Do not tumble dry</Text>
        </View>
      </View>
      <View style={styles.iconRow}>
        <View style={styles.iconContainer}>
          <Image source={dryClean} style={styles.icon} />
          <Text style={styles.iconText}>Dry clean with tetrachloroethylene</Text>
        </View>
        <View style={styles.iconContainer}>
          <Image source={iron} style={styles.icon} />
          <Text style={styles.iconText}>Iron at a maximum of 110°C/230°F</Text>
        </View>
      </View>
      <View style={styles.freeShipContainer}>
      <Text style={styles.shippingText}>Free Flat Rate Shipping</Text>
      <Text style={styles.deliveryText}>Estimated to be delivered on </Text>
      <Text style={styles.deliveryText}>09/11/2021 - 12/11/2021.</Text>
      </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    // fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: '#FFB668',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    // fontWeight: 'bold',
    marginBottom: 10,
    letterSpacing: 2
  },
  description: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  iconRow: {
    // flexDirection: 'row',
    // justifyContent: 'center',
    marginTop: 15,
    width: '100%',
  },
  iconContainer: {
    alignItems: 'left',
    flexDirection: 'row',
    marginBottom: 15
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: 5,
  },
  iconText: {
    fontSize: 14,
    textAlign: 'center',
    justifyContent: 'center',
    display: 'flex',
    top: 7,
    left: 10
  },
  freeShipContainer: {
    borderTopWidth: 2,
    borderColor: '#e6e1D3',
  },
  shippingText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 20
  },
  deliveryText: {
    fontSize: 14,
    color: 'gray',
  },
});

export default ProductDetailScreen;