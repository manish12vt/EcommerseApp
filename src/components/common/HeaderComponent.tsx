/* eslint-disable react-native/no-inline-styles */
import React, {memo} from 'react';
import {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import Typography from './Typography';
import {TouchableOpacity} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {hitSlop} from '../../theme/constants';
import SearchBar from './SearchBar';
import { onResetBasket } from '../../redux';
import { connect } from 'react-redux';

interface HeaderProps {
  title: string;
  titleStyle?: object;
  burgerStyle?: object;
  reset?: boolean;
  onReset?: Function;
  search?: boolean;
  searchValue?: any;
  setSearchValue?: Function;
}

const HeaderComponent: FC<HeaderProps> = props => {
  const navigation = useNavigation<any>();
  const {
    title,
    titleStyle,
    burgerStyle,
    reset,
    onReset,
    search,
    searchValue,
    setSearchValue
  } = props;
  
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      {/* {reset && (
        <TouchableOpacity
          hitSlop={hitSlop}
          onPress={() => onResetBasket([])}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            left: 10,
            width: 50,
            height: 50,
            zIndex: 999
          }}>
          <MaterialIcons size={30} name="delete" color="rgb(249,63,53)" />
        </TouchableOpacity>
      )} */}
      <Typography style={{...titleStyle}} weight="bold">
        {title}
      </Typography>
      {/* {search && <SearchBar value={searchValue} setValue={()=>setSearchValue} />} */}

      <TouchableOpacity
        style={{...burgerStyle}}
        onPress={() => navigation.toggleDrawer()}
        hitSlop={hitSlop}>
        <MaterialIcons size={30} name="menu" color={colors.text} />
      </TouchableOpacity>
    </View>
  );
};

export default connect(null,{onResetBasket})(HeaderComponent);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingBottom: 5
  }
});
