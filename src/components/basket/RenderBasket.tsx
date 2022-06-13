import React, {useEffect, useState} from 'react';
import {FC} from 'react';
import {memo} from 'react';
import {Image} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {
  ApplicationState,
  CartState,
  onAddItem,
  onReduceQuantity,
  onRemoveItem,
  onResetBasket,
  Product
} from '../../redux';
import constants, {hitSlop} from '../../theme/constants';
import Typography from '../common/Typography';

interface RenderBasketProps {
  item: Product;
  onAddItem: Function;
  onRemoveItem: Function;
  onResetBasket: Function;
  onReduceQuantity: Function;
  cartReducer: CartState;
}

const RenderBasket: FC<RenderBasketProps> = props => {
  const {item, onAddItem, onRemoveItem, onReduceQuantity, cartReducer} = props;

  const [reRender, setReRender] = useState(false);

  useEffect(() => {
    setReRender(!reRender);
  }, [cartReducer.cart]);
console.log("cart",cartReducer.cart);

  return (
    <View style={[styles.container, constants.SHADOW]}>
      <Image
        style={[styles.image]}
        source={{
          uri: item.image + item.id
        }}
      />

      <View style={styles.center}>
        <Typography title numberOfLines={1} style={styles.title}>
          {item.name}
        </Typography>
        <Typography weight="bold" style={styles.price}>
          ${item.price}
        </Typography>
      </View>

      <View style={styles.rightColumn}>
        <TouchableOpacity
          onPress={() => {
            item.quantity === 1
              ? onRemoveItem(item.id)
              : onReduceQuantity(item.id);
          }}
          hitSlop={hitSlop}>
          <Typography color="black" weight="bold" h3>
            -
          </Typography>
        </TouchableOpacity>
        <Typography color="black" weight="bold" h3>
          {item.quantity && item.quantity}
        </Typography>
        <TouchableOpacity onPress={() => onAddItem(item)} hitSlop={hitSlop}>
          <Typography color="black" weight="bold" h3>
            +
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapToStateProps = (state: ApplicationState) => ({
  cartReducer: state.cartReducer
});

export default connect(mapToStateProps, {
  onAddItem,
  onRemoveItem,
  onResetBasket,
  onReduceQuantity
})(RenderBasket);

const styles = StyleSheet.create({
  container: {
    width: '95%',
    flexDirection: 'row',
    backgroundColor: 'white',
    marginVertical: 5,
    alignSelf: 'center',
    borderRadius: 10,
    paddingHorizontal: 5,
    justifyContent: 'space-around',
    height: 95,
    alignItems: 'center'
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 75,
    overflow: 'hidden',
    borderWidth: 3,
    resizeMode: 'stretch'
  },
  center: {
    alignSelf: 'center'
  },
  title: {marginBottom: 30, maxWidth: 160, color: 'rgb(101,100,145)'},
  price: {
    color: 'rgb(72,81,161)'
  },
  rightColumn: {
    justifyContent: 'space-around',
    width: 22,
    alignItems: 'center'
  },
  quantityButton: {
    width: 20,
    height: 20,
    borderRadius: 50
  }
});
