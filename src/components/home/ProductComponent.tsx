import React, {memo} from 'react';
import {FC} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';
import {connect} from 'react-redux';
import {ApplicationState, CartState, onAddItem, Product} from '../../redux';
import constants from '../../theme/constants';
import Typography from '../common/Typography';

interface ProductProps {
  product: Product;
  cartReducer: CartState;
  onAddItem: Function;
}

const ProductComponent: FC<ProductProps> = props => {
  const {product, onAddItem} = props;

  return (
    <TouchableOpacity
      onPress={() => onAddItem(product)}
      key={product.id}
      style={[styles.product, constants.SHADOW]}>
      <Image style={styles.image} source={{uri: product.image}} />
      <View style={styles.titleRow}>
        <Typography>{product.name}</Typography>
        <Typography weight="bold">${product.price}</Typography>
      </View>
    </TouchableOpacity>
  );
};

const mapToStateProps = (state: ApplicationState) => ({
  cartReducer: state.cartReducer
});

export default connect(mapToStateProps, {onAddItem})(memo(ProductComponent));

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('screen').width * 0.9,
    height: Dimensions.get('screen').height * 0.2,
    borderRadius: 5
  },
  product: {
    marginVertical: 30,
    alignItems: 'center'
  },
  titleRow: {
    justifyContent: 'space-between',
    width: '90%',
    flexDirection: 'row'
  }
});
