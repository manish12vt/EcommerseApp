import React from 'react';
import PropTypes from 'prop-types';

import {TouchableOpacity, StyleSheet} from 'react-native';
import CustomText from './CustomText';

const CustomButton = ({
                        title,
                        style,
                        isActive = true,
                        textColor = 'white',
                        onPress,
                        backgroundColor = '#3054f6',
                        borderColor = '#3054f6',
                        ...props
                      }) => {

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!isActive}
      style={[
        style,
        styles.container,
        {
          backgroundColor,
          borderWidth: 2,
          borderColor
        }
      ]}
      {...props}
    >
      <CustomText
        fontFamily={'semiBold'}
        size={16}
        color={textColor}
        children={title}
        numberOfLines={2}
      />
    </TouchableOpacity>
  );
};

CustomButton.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func,
  isSelected: PropTypes.bool,
  isOutlined: PropTypes.bool,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  outlineColor: PropTypes.string,
  iconWidth: PropTypes.number,
  iconHeight: PropTypes.number,
  selectedBackgroundColor: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CustomButton;
