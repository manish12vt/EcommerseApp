import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';


type Props = {
  size?: number;
} & TextProps & Pick<TextStyle, 'color' | 'fontFamily'>;


const CustomText: React.FC<Props> = ({
  children,
  style,
  color = 'black',
  size = 14,
  ...props
}) => {
  return (
    <Text
      style={[
        style,
        { flexShrink: 1, color, fontSize: size } // preventing text to go outside of the parent component
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};


export default CustomText;
