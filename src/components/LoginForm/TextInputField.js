import React, {useState} from 'react';
import {TextInput, View, StyleSheet, TouchableOpacity} from 'react-native';
import CustomText from "./CustomText";
import Entypo from "react-native-vector-icons/Entypo";


export const TextInputField = ({field, form, isDisabled,additionalText,textWithOnPress, wrapperStyle, textWithOnPressCondition, phoneCode,onPressText, ...props}) => {

  const [focusedField, setFocusedField] = useState('');

  const {errors, handleChange, handleBlur, setFieldTouched, touched} = form;
  const isEntryValid = touched[`${field.name}`] && !errors[`${field.name}`];

  const chooseBorderColor = () => {
    if (props.error && touched[`${field.name}`]) {
      return 'red'
    } else {
      if (isEntryValid && !focusedField) {
        return '#e4e6f0';
      } else if (focusedField) {
        return '#b8bbd6';
      } else {
        return '#e4e6f0';
      }
    }
  };

  const chooseBackgroundColor = () => {
    if ((isEntryValid && !focusedField) || focusedField) {
      return 'white';
    } else {
      return 'white';
    }
  };

  const handleOnFocus = () => {
    setFocusedField(form.touched);
  };

  const handleOnBlur = () => {
    handleBlur(field.name);
    setFieldTouched(field.name);
    setFocusedField('');
  };

  return (
    <View
      style={[
        styles.wrapper,
        {
          borderColor: chooseBorderColor(),
          backgroundColor: chooseBackgroundColor(),
          flexDirection: phoneCode || additionalText || textWithOnPress ? 'row' : null,
                  wrapperStyle,
          justifyContent:  additionalText || textWithOnPress ? 'space-between' : phoneCode ? 'flex-start' : 'center'
        }
      ]}
    >
      {
        isDisabled ? <Entypo name="lock" size={20} style={styles.lock}/> : null
      }
  {
        phoneCode ?
            <View style={{justifyContent: 'center'}}>
              <CustomText size={14} children={`${phoneCode} `} color={'#b9b9c5'}/>
            </View> : null
      }
      <TextInput
        onFocus={handleOnFocus}
        editable={!isDisabled}
        style={[styles.input, {color: '#6f7185'}]}
        value={field.value}
        onChangeText={handleChange(field.name)}
        onBlur={handleOnBlur}
        ref={ props.forwardRef }
        {...props}
        placeholderTextColor={'#b9b9c5'}
      />
      {
        additionalText ?
            <View style={{marginRight: 10, justifyContent: 'center'}}>
              <CustomText size={14} children={additionalText} color={'#3a3f5c'} />
            </View> : null
      }
      {
        textWithOnPress && textWithOnPressCondition ?
            <TouchableOpacity onPress={() => onPressText()} style={{marginRight: 10, justifyContent: 'center'}}>
              <CustomText size={14} children={textWithOnPress} color={'#2255ff'} />
            </TouchableOpacity> : null
      }
      {
        props.error && touched[`${field.name}`] ?
          <View style={styles.errorText}>
            <CustomText size={12} children={props.error} color={'red'} style={{backgroundColor: 'white', paddingHorizontal: 5}}/>
          </View>
          : null
      }
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
    height: 50,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    paddingLeft: 12,
    borderWidth: 1,
    zIndex: 1
  },
  errorText: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 5,
    position: 'absolute',
    bottom: -8,
    left: 5
  },
  input: {
    fontSize: 14,
    width:'100%',
  },
  lock: {
    color: '#b9b9c5',
    position: 'absolute',
    right: 10
  }
});
