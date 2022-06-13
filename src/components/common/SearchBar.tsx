import React from 'react';
import {FC} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface SearchBarProps {
  value: string;
  setValue: Function;
}
const SearchBar: FC<SearchBarProps> = props => {
  const {value, setValue} = props;

  return (
    <View style={{bottom: 3}}>
      <View style={{position: 'absolute', left: 3, zIndex: 999}}>
        <MaterialIcons size={30} name="search" color={'gray'} />
      </View>

      <TextInput
        value={value}
        onChangeText={()=>setValue}
        placeholder="Search"
        style={[styles.input]}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  input: {
    width: 180,
    paddingLeft: 30,
    height: 30,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white'
  }
});
