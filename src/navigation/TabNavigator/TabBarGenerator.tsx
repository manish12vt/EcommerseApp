import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Typography from '../../components/common/Typography';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LightTheme from '../../theme/LightTheme';
import {useEffect} from 'react';
import {connect} from 'react-redux';
import {ApplicationState, CartState} from '../../redux';
import {useTheme} from '@react-navigation/native';
import {FC} from 'react';
import * as Animatable from 'react-native-animatable';

interface TabBarGeneratorProps {
  route: any;
  focused: boolean;
  cartReducer: CartState;
}

const TabBarGenerator: FC<TabBarGeneratorProps> = props => {
  const AnimationRef = useRef<any>(null);

  const {route, focused, cartReducer} = props;
  const {colors, dark} = useTheme();
  const [totalQuantity, setTotalQuantity] = useState(0);

  const isDarkTheme = dark;

  const addItemAnimation = (total:any) => {
    if (AnimationRef) {
      if (total === 1) {
        setTimeout(() => {
          AnimationRef.current?.bounce();
        }, 1000);
      } else {
        AnimationRef.current?.bounce();
      }
    }
  };

  const removeItemAnimation = () => {
    if (AnimationRef) {
      AnimationRef.current?.wobble();
    }
  };

  useEffect(() => {
    if (Array.isArray(cartReducer.cart)) {
      let total = 0;
      cartReducer.cart.map((product:any) => {
        return (total = total + product.quantity);
      });
      total > totalQuantity ? addItemAnimation(total) : removeItemAnimation();
      setTotalQuantity(total);
    }
  }, [cartReducer.cart]);

  return route.name === 'HomeScreen' ? (
    focused ? (
      <View style={styles.tabIconContaner}>
        <MaterialIcons size={30} name="home-filled" color="white" />
        <View style={styles.label}>
          <Typography color="white">home</Typography>
        </View>
      </View>
    ) : (
      <MaterialIcons
        size={30}
        name="home-filled"
        color={isDarkTheme ? 'silver' : 'black'}
      />
    )
  ) : route.name === 'DealsScreen' ? (
    focused ? (
      <View style={styles.tabIconContaner}>
        <MaterialIcons size={30} name="local-offer" color="white" />
        <View style={styles.label}>
          <Typography color="white">deals</Typography>
        </View>
      </View>
    ) : (
      <MaterialIcons
        size={30}
        name="local-offer"
        color={isDarkTheme ? 'silver' : 'black'}
      />
    )
  ) : route.name === 'BasketScreen' ? (
    focused ? (
      <View style={styles.tabIconContaner}>
        <MaterialIcons size={30} name="shopping-basket" color="white" />
        <View style={styles.label}>
          <Typography color="white">basket</Typography>
        </View>
      </View>
    ) : (
      <View>
        {totalQuantity > 0 && (
          <Animatable.View
            duration={2000}
            ref={AnimationRef}
            style={styles.unfocusQuantity}>
            <Typography color="white" weight="bold">
              {totalQuantity <= 9 ? totalQuantity : '9+'}
            </Typography>
          </Animatable.View>
        )}
        <MaterialIcons
          size={30}
          name="shopping-basket"
          color={isDarkTheme ? 'silver' : 'black'}
        />
      </View>
    )
  ) : route.name === 'ProfileScreen' ? (
    focused ? (
      <View style={styles.tabIconContaner}>
        <MaterialIcons size={30} name="person" color="white" />
        <View style={styles.label}>
          <Typography color="white">profile</Typography>
        </View>
      </View>
    ) : (
      <MaterialIcons
        size={30}
        name="person"
        color={isDarkTheme ? 'silver' : 'black'}
      />
    )
  ) : (
    <></>
  );
};

const mapToStateProps = (state: ApplicationState) => ({
  cartReducer: state.cartReducer
});

export default connect(mapToStateProps)(TabBarGenerator);

const styles = StyleSheet.create({
  tabIconContaner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: LightTheme.colors.primary,
    padding: 5,
    borderRadius: 10
  },
  label: {
    marginLeft: 5
  },
  unfocusQuantity: {
    position: 'absolute',
    top: -20,
    right: -20,
    backgroundColor: LightTheme.colors.primary,
    padding: 5,
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999
  }
});
