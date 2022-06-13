import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import DealsScreen from '../../screens/DealsScreen/DealsScreen';
import BasketScreen from '../../screens/BasketScreen/BasketScreen';
import ProfileScreen from '../../screens/ProfileScreen/ProfileScreen';
import {FC} from 'react';
import TabBarGenerator from './TabBarGenerator';
import {useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();
type SelectorTypes = {
  loginReducer: any
};
const TabNavigator: FC = () => {
  const {colors} = useTheme();
  const isActiveUser = useSelector<SelectorTypes>(state=>state.loginReducer.activeLogin)
  return (
    <Tab.Navigator
      defaultScreenOptions={{headerShown:false,tabBarStyle:{backgroundColor:colors.background}}}
    
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => (
          <TabBarGenerator route={route} focused={focused} />
        ),
        tabBarLabel: () => null
      })}>
      <Tab.Screen name="HomeScreen" options={{headerShown:false}} component={HomeScreen} />
      <Tab.Screen name="DealsScreen" options={{headerShown:false}} component={DealsScreen} />
      <Tab.Screen name="BasketScreen" options={{headerShown:false}} component={BasketScreen} />
      {isActiveUser && <Tab.Screen name="ProfileScreen" options={{headerShown:false}} component={ProfileScreen} />}
    </Tab.Navigator>
  );
};

export default TabNavigator;
