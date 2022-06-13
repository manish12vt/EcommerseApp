import {
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import React from 'react';
import {StyleSheet,Text, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {hitSlop} from '../../theme/constants';
import {useSelector,useDispatch} from 'react-redux'
import {onLogin} from '../../redux/actions/loginActions';

const CustomDrawerContent = props => {
  const dispatch = useDispatch()
const isActiveUser = useSelector(state => state.loginReducer.activeLogin);
console.log("onLogin",onLogin)
const logout =()=>{
  dispatch(onLogin(false))
}
  return (
    <DrawerContentScrollView {...props}>
      {__DEV__ && (
        <TouchableOpacity
          style={{position:'absolute',right:2,left:5,top:50,bottom:0}}
          onPress={() => props.navigation.toggleDrawer()}
          hitSlop={hitSlop}>
          <MaterialIcons size={30} name="close" color={'black'} />
        </TouchableOpacity>
      )}
      {/* <DrawerItemList {...props} /> */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity onPress={()=>{props.navigation.navigate('Home')}} style={{flexDirection:'row',marginLeft:30}}>
          <MaterialIcons size={30} name="home" style={{justifyContent:'center',marginRight:30}} color={'black'} />
          <Text style={{justifyContent:'center',alignSelf:'center', fontSize:17}}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>props.navigation.navigate('Settings')} style={{flexDirection:'row',marginLeft:30,marginTop:20}}>
          <MaterialIcons size={30} name="settings" style={{justifyContent:'center',marginRight:30}} color={'black'} />
          <Text style={{justifyContent:'center',alignSelf:'center', fontSize:17}}>Settings</Text>
        </TouchableOpacity>
        {isActiveUser ? <TouchableOpacity onPress={()=>{logout()}} style={{flexDirection:'row',marginLeft:30,marginTop:20}}>
          <MaterialIcons size={30} name="logout" style={{justifyContent:'center',marginRight:30}} color={'black'} />
          <Text style={{justifyContent:'center',alignSelf:'center', fontSize:17}}>Logout</Text>
        </TouchableOpacity>
      :
        <TouchableOpacity onPress={()=>{props.navigation.navigate('Login')}} style={{flexDirection:'row',marginLeft:30,marginTop:20}}>
          <MaterialIcons size={30} name="login" style={{justifyContent:'center',marginRight:30}} color={'black'} />
          <Text style={{justifyContent:'center',alignSelf:'center', fontSize:17}}>Login</Text>
        </TouchableOpacity>
      }
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent

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
    // alignItems: 'center',
    marginTop: 35
  }
});
