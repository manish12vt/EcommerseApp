/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FC} from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import {connect} from 'react-redux';
import RenderBasket from '../../components/basket/RenderBasket';
import HeaderComponent from '../../components/common/HeaderComponent';
import {
  ApplicationState,
  CartState,
  onAddItem,
  onReduceQuantity,
  onRemoveItem,
  onResetBasket,
  Product
} from '../../redux';
import {SwipeListView} from 'react-native-swipe-list-view';
import Typography from '../../components/common/Typography';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TAX_RATE = 18 / 100;

interface BasketProps {
  cartReducer: CartState;
  onAddItem: Function;
  onRemoveItem: Function;
  onResetBasket: Function;
  onReduceQuantity: Function;
}

const BasketScreen: FC<BasketProps> = props => {
  const {cartReducer, onResetBasket, onRemoveItem} = props;

  const {cart} = cartReducer;

  const deleteItem = (item: Product) => {
    Alert.alert(
      'Are you sure?',
      item.name + ' will be removed from your basket. Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => onRemoveItem(item.id)
        }
      ]
    );
  };

  const totalPrice = () => {
    let total = 0;
    cart.map((product:any) => {
      return (total = total + product.quantity * Number(product.price));
    });
    return total;
  };

  const calculateTax = (price:any) => price * TAX_RATE;
console.log("cart=======>",cart);

  return (
    <SafeAreaView style={{flex: 1}}>
      <HeaderComponent
        titleStyle={{width: '100%', textAlign: 'center'}}
        burgerStyle={{right: 30}}
        title="My Cart"
        reset={Array.isArray(cart) && cart.length > 0}
        onReset={()=> {console.log("hello pagal");
       }}
      />
      {Array.isArray(cart) && cart.length > 0 ? (
        <>
          <SwipeListView
            contentContainerStyle={styles.container}
            data={cart}
            renderItem={(data, rowMap) => <RenderBasket item={data.item} />}
            // renderHiddenItem={(data, rowMap) => (
            //   <View style={styles.rowBack}>
            //     <TouchableOpacity
            //       onPress={() => deleteItem(data.item)}
            //       style={styles.deleteButton}>
            //       <MaterialIcons size={45} name="delete" color="white" />
            //     </TouchableOpacity>
            //   </View>
            // )}
            extraData={cart}
            disableRightSwipe
            leftOpenValue={75}
            rightOpenValue={-75}
            ListFooterComponent={() => (
              <View style={styles.subPrices}>
                <Typography color="gray" weight="700">
                  Subtotal: ${totalPrice()}
                </Typography>
                <Typography color="gray" weight="700">
                  Taxes: ${calculateTax(totalPrice()).toFixed(2)}
                </Typography>
              </View>
            )}
          />

          <View style={styles.priceContainer}>
            <Typography h1 bold black>
              $
              {(
                Number(totalPrice()) + Number(calculateTax(totalPrice()))
              ).toFixed(2)}
            </Typography>
            <TouchableOpacity style={styles.checkout}>
              <MaterialIcons size={25} name="exit-to-app" color="white" />

              <Typography bold color="white">
                Check Out
              </Typography>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30
          }}>
          <Typography h4 style={{textAlign: 'center'}}>
            Basket is empty
          </Typography>
        </View>
      )}
    </SafeAreaView>
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
})(BasketScreen);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 150,
    marginTop: 10
  },
  rowFront: {
    justifyContent: 'center',
    backgroundColor: 'gray',
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  deleteButton: {
    position: 'absolute',
    right: 10,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  subPrices: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-around',
    marginTop: 20
  },
  rowBack: {
    width: '95%',
    flexDirection: 'row',
    backgroundColor: 'red',
    height: 95,
    marginVertical: 5,
    alignSelf: 'center',
    borderRadius: 10,
    paddingHorizontal: 5,
    justifyContent: 'space-around'
  },
  priceContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  checkout: {
    backgroundColor: 'rgb(30,199,87)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
});
