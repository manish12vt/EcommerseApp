/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, FC} from 'react';
import {ScrollView, StyleSheet, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import HeaderComponent from '../../components/common/HeaderComponent';
import ProductComponent from '../../components/home/ProductComponent';
import filterProductsByDate from '../../helpers/filterProductsByDate';
import {ApplicationState, Product, ProductState} from '../../redux';

interface HomeProps {
  productReducer: ProductState;
}

const HomeScreen: FC<HomeProps> = props => {
  const {productReducer} = props;
  const {products, productTimings} = productReducer;
  const [list, setList] = useState<Product[]>([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (searchValue) {
      const updatedList = list.filter(product => {
        return product.name
          .toLowerCase()
          .includes(searchValue.toLocaleLowerCase());
      });
      setList(updatedList);
    } else {
      filterProductsByDate(products, productTimings, setList);
    }
  }, [searchValue]);

  useEffect(() => {
    filterProductsByDate(products, productTimings, setList);
  }, []);

  return (
    <SafeAreaView>
      <HeaderComponent
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        search
        title="Deals"
      />
      <ScrollView contentContainerStyle={{paddingBottom: 10}}>
        {list.length > 0 &&
          list.map(product => {
            return <ProductComponent product={product} />;
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

const mapToStateProps = (state: ApplicationState) => ({
  productReducer: state.productReducer
});

export default connect(mapToStateProps, {})(HomeScreen);

const styles = StyleSheet.create({});
