import React,{useState} from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigator from '../TabNavigator';
import loginScreen from '../../screens/LoginScreen/LoginScreen';
import {FC} from 'react';
import {useTheme} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomDrawerContent from './CustomDrawerContent';
import settingScreen from '../../screens/SettingScreen/SettingScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator: FC = () => {
  const {colors} = useTheme();
  
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{headerShown:false,drawerType:'slide', drawerPosition:'left',swipeEnabled:false,drawerContentStyle: {backgroundColor: colors.background}}}>
      <Drawer.Screen
        options={{
          drawerIcon: ({focused:boolean, size:number}) => (
            <MaterialIcons size={30} name="home" color={colors.text} />
          ),
  
        }}
        name={"Home"}
        component={TabNavigator}
      />
      <Drawer.Screen name={"Login"} component={loginScreen}/>
      <Drawer.Screen name={"Settings"} component={settingScreen}/>
      
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
