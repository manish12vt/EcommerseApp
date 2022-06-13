import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {FC, useEffect} from 'react';
import {Alert, Image} from 'react-native';
import {Dimensions} from 'react-native';
import {ActivityIndicator} from 'react-native';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {
  getHotDeals,
  getProducts,
  getProductTiming,
  updateCart
} from '../../redux';

interface SplashProps {
  loading: boolean;
  setLoading: Function;
  getHotDeals: Function;
  getProducts: Function;
  getProductTiming: Function;
  updateCart: Function;
}

const SplashScreen: FC<SplashProps> = props => {
  const {setLoading, getHotDeals, getProducts, getProductTiming, updateCart} =
    props;

  const {width, height} = Dimensions.get('window');

  const getCart = async () => {
    try {
      let cart = await AsyncStorage.getItem('cart');
      if (cart) {
        cart = JSON.parse(cart);

        updateCart(cart);
      }
    } catch (error) {}
  };

  const fetchData = async () => {
    try {
      await getHotDeals();
      await getProducts();
      await getProductTiming();
      await getCart();

      setTimeout(() => {
        setLoading(false);
      }, 1111);
    } catch (error:any) {
      Alert.alert('Error', error);
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={{height: height, width: width, position: 'absolute'}}
        source={require('../../../assets/Images/dominos.jpg')}
      />
      <ActivityIndicator size="large" color="blue" />
    </View>
  );
};

export default connect(null, {
  getHotDeals,
  getProducts,
  getProductTiming,
  updateCart
})(SplashScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
});
