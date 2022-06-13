import React, {useEffect, useState, FC} from 'react';
import {StyleSheet, Switch,Text, TouchableOpacity, View,SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import HeaderComponent from '../../components/common/HeaderComponent';
import ToggleButton from 'react-native-toggle-element';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {onUpdateTheme} from '../../redux';
import {useTheme} from '@react-navigation/native';
import Typography from '../../components/common/Typography';

const SettingScreen = props => {
    const {themeReducer, onUpdateTheme} = props;
    console.log("props settings",props);
  return (
    <SafeAreaView>
      <HeaderComponent
        title="Settings"
      />
      <View style={styles.toggleContainer}>
        <Typography bold style={{marginBottom:20}}>Change Theme</Typography>
        <View style={{flexDirection:'row'}}>
          <Typography style={{alignSelf:'center',marginRight:20}}>Dark</Typography>
      <ToggleButton
          value={themeReducer.selectedTheme === 'light' ? true : false}
          onPress={newState =>
            newState === true ? onUpdateTheme('light') : onUpdateTheme('dark')
          }
          thumbActiveComponent={
            <MaterialIcons name="wb-sunny" size={5} color={'#3BD2B5'} />
          }
          thumbInActiveComponent={
            <MaterialIcons
              name="nightlight-round"
              size={5}
              color={'#03452C'}
            />
          }
          thumbButton={{
            width:30,
            height:30,
          }}
          trackBar={{
            activeBackgroundColor: 'grey',
            inActiveBackgroundColor: 'black',
            borderActiveColor: 'grey',
            borderInActiveColor: 'black',
            borderWidth: 5,
            width: 60,
            height:30,
          }}
        />
        <Typography style={{alignSelf:'center',marginLeft:20}}>Light</Typography>
        </View>
        </View>
    </SafeAreaView>
  );
};

const mapToStateProps = (state) => ({
  themeReducer: state.themeReducer
});

export default connect(mapToStateProps, {onUpdateTheme})(SettingScreen);

const styles = StyleSheet.create({
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 20,
      marginVertical: 10
    },
    poweredText: {
      textAlign: 'center',
      color: 'white',
      fontWeight: 'bold',
      marginTop: 10
    },
    menuButton: {
      marginRight: 5,
      position: 'absolute',
      left: 10,
      top: 20
    },
    toggleContainer: {
      alignItems: 'center',
      marginTop: 35
    }
  });
  