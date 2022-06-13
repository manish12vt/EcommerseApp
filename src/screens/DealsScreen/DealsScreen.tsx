import React, {FC, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import HeaderComponent from '../../components/common/HeaderComponent';
import {ApplicationState, Product, ProductState} from '../../redux';
import MasonryList from '@react-native-seoul/masonry-list';
import filterProductsByDate from '../../helpers/filterProductsByDate';
import filterForHotDeals from '../../helpers/filterForHotDeals';
import RenderDeal from '../../components/hotDeals/RenderDeal';

interface HotDealsProps {
  productReducer: ProductState;
}

const DealsScreen: FC<HotDealsProps> = props => {
  const {productReducer} = props;
  const {products, productTimings, hotDeals} = productReducer;
  const [searchValue, setSearchValue] = useState('');
  const [list, setList] = useState<Product[]>([]);

  useEffect(() => {
    if (searchValue) {
      const updatedList = list.filter(product => {
        return product.name
          .toLowerCase()
          .includes(searchValue.toLocaleLowerCase());
      });
      console.log("updatedList",updatedList);
      
      setList(updatedList);
    } else {
      filterProducts();
    }
  }, [searchValue]);

  const filterProducts = () => {
    const filteredList:any = filterProductsByDate(products, productTimings);
    filterForHotDeals(filteredList, hotDeals, setList);
  };

  useEffect(() => {
    filterProducts();
  }, []);

  const renderItem = ({item}:any) => {return <RenderDeal item={item} />};

  return (
    <SafeAreaView style={{flex:1}}>
      <HeaderComponent
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        search
        title="Hot Deals"
      />

      <MasonryList
        contentContainerStyle={styles.container}
        numColumns={2}
        data={list}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const mapToStateProps = (state: ApplicationState) => ({
  productReducer: state.productReducer
});

export default connect(mapToStateProps, {})(DealsScreen);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingLeft: 10,
    paddingBottom: 50
  }
});
