import React, {FC,useState,useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import HeaderComponent from '../../components/common/HeaderComponent';
import { View } from 'react-native';
import {LoginForm} from '../../components/LoginForm/LoginForm';
import {useDispatch,useSelector} from 'react-redux';
import {onLogin} from '../../redux/actions/loginActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginForm {
  onSubmit: Function;
  errorServer:String;
  navigation:any;
  isLogin:any;
}

type SelectorTypes = {
  loginReducer: any
};
const LoginScreen: FC<LoginForm> = props => {
 
  const [error,setError] = useState(false);
  const dispatch = useDispatch()
  const isLogin = useSelector<SelectorTypes>(state => state.loginReducer.activeLogin)
  console.log("isLogin",isLogin);
  
  const loginUser = (data:any) =>{
    if(data.email=="admin@gmail.com" && data.password=="admin"){
      setError(false)
      dispatch(onLogin(true))
      props.navigation.navigate("Home")
    }else{
      setError(true)
    }
    
  }
  async function isActive() {
    try {
    return await AsyncStorage.getItem('activeLogin');
      
    } catch (error) {
      console.log("Error is good",error);
    }
  
  }
   useEffect( () => {
    isActive().then((res)=>{
      console.log("res",res);
      
    })
  },[])
  return (
    <SafeAreaView>
      <HeaderComponent
        title="Login"
      />
      <View style={{marginHorizontal:30,marginTop:30}}>
      <LoginForm navigation={props.navigation} errorServer={error} onSubmit={loginUser}/>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
