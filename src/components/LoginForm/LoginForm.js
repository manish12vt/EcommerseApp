import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Formik, Field} from 'formik';
import PropTypes from 'prop-types';
import {TextInputField} from './TextInputField';
import Button from "./Button";
import CustomText from "./CustomText";
import Entypo from 'react-native-vector-icons/Entypo';
import { loginValidationRules } from './validationScema';

export const LoginForm = ({onSubmit, errorServer, navigation}) => {

  const [isChecked, setIsChecked] = useState(false);

  return(
    <Formik
      initialValues={{email: '', password: ''}}
      onSubmit={onSubmit}
      validationSchema={loginValidationRules}
    >
      {({handleSubmit, isValid, dirty, setFieldValue, errors}) => (
        <View style={styles.wrapper}>
          <Field
            name="email"
            autoCapitalize="none"
            placeholder={'Email'}
            component={TextInputField}
            error={errors.email ? errors.email : null}
            onChangeText={value => {
              setFieldValue('email', value);
            }}
          />
          <Field
            name="password"
            autoCapitalize="none"
            placeholder={'Password'}
            secureTextEntry={true}
            error={errors.password ? errors.password : null}
            component={TextInputField}
            onChangeText={value => {
              setFieldValue('password', value);
            }}
          />
          {
            errorServer ?
              <CustomText color={'red'} style={{textAlign: 'center'}} children={'Please, check your credentials'}/> : null
          }
          {/* <View style={{flexDirection: 'row', marginVertical: 15, justifyContent: 'space-between', alignItems: 'center'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => setIsChecked(!isChecked)} style={[styles.checkbox, {backgroundColor: isChecked ? '#2255ff' : 'white'}]}>
                {
                  isChecked ?
                    <Entypo name="check" size={18} style={{color: 'white'}}/> : null
                }
              </TouchableOpacity>
              <CustomText children={'Remember me'} size={12}/>
            </View>

          </View> */}
          <View style={styles.separator}>
            {/*<CustomText*/}
            {/*  children={'OR LOGIN WITH:'}*/}
            {/*  style={{position: 'absolute', top: -8, backgroundColor: 'white', paddingHorizontal: 7}}*/}
            {/*  fontFamily={'regular'}*/}
            {/*  size={12}/>*/}
            {/*<View style={{*/}
            {/*  flexDirection: 'row',*/}
            {/*  justifyContent: 'space-between',*/}
            {/*  width: '100%',*/}
            {/*  marginTop: 21,*/}
            {/*  marginBottom: 30*/}
            {/*}}>*/}
            {/*  <TouchableOpacity style={styles.socialButton}>*/}
            {/*    <Image style={{resizeMode: 'contain', width: 30, height: 30}}*/}
            {/*           source={require('../../assets/icons/googleIcon.png')}/>*/}
            {/*  </TouchableOpacity>*/}
            {/*  <TouchableOpacity style={styles.socialButton}>*/}
            {/*    <Image style={{resizeMode: 'contain', width: 30, height: 30}}*/}
            {/*           source={require('../../assets/icons/linkedIn.png')}/>*/}
            {/*  </TouchableOpacity>*/}
            {/*</View>*/}
          </View>
          {/* <Button
            textColor={'#2255ff'}
            backgroundColor={'rgba(34, 85, 255, 0.15)'}
            onPress={() => {console.log('stage2');}}
            style={{marginBottom: 20}}
            title={'Send me SMS code'}
            isActive={dirty && isValid}
          /> */}
          <Button
            onPress={handleSubmit}
            title={'Log in'}
            isActive={isValid}
          />
        </View>
      )}
    </Formik>
  )
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
  verificationCodeError: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    width: '100%'
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#2255ff',
    marginRight: 7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  separator: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#f8f8fa',

    marginVertical: 20,
    alignItems: 'center'
  },
  socialButton: {
    width: '45%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 12.22,

    elevation: 3,
  }
});
