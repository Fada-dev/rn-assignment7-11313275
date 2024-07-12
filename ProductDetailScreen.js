import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.brand}>LAMEREI</Text>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.sectionTitle}>MATERIALS</Text>
        <Text style={styles.description}>
          We work with monitoring programmes to ensure compliance with safety, health and quality standards for our products.
        </Text>
        <View style={styles.materials}>
          <Text style={styles.materialItem}>• Do not use bleach</Text>
          <Text style={styles.materialItem}>• Do not tumble dry</Text>
          <Text style={styles.materialItem}>• Dry clean with tetrachloroethylene</Text>
          <Text style={styles.materialItem}>• Iron at a maximum of 110°C/230°F</Text>
        </View>
        <View style={styles.shipping}>
          <Text style={styles.sectionTitle}>Free Flat Rate Shipping</Text>
          <Text style={styles.delivery}>
            Estimated to be delivered on 09/11/2021 - 12/11/2021.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
  },
  detailContainer: {
    padding: 20,
  },
  brand: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  price: {
    fontSize: 24,
    color: '#FFB668',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
  },
  materials: {
    marginBottom: 20,
  },
  materialItem: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  shipping: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 20,
  },
  delivery: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
});

export default ProductDetailScreen;
