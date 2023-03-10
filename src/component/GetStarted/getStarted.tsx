import React from 'react';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import DefaultScreen from '../DefaultScreen';
import CText from '../CustomText';
import CButton from '../CustomButton';

import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const GetStarted = () => {
  const navigation = useNavigation();

  const handleOnPress = () => {
    navigation.navigate('OnBoarding');
  };

  return (
    <DefaultScreen scrollableContent containerProps={{space: 20}}>
      <CText color={Colors.text} regular fontSize={28} style={{lineHeight: 33}}>
        Welcome to{' '}
        <CText color={Colors.text} fontSize={28} bold>
          PlantApp
        </CText>
      </CText>
      <CText
        color="#13231BB2"
        fontSize={17.1}
        fontFamily={Fonts.regular}
        style={{lineHeight: 22}}>
        Identify more than 3000+ plants and 88% accuracy.
      </CText>
      <Image
        source={require('../../images/flower.png')}
        style={{width: 345, height: 499, right: 5, top: 5}}
      />
      <CButton onPress={handleOnPress} text="Get Started" />
      <CText
        color="#597165B2"
        fontSize={11}
        fontFamily={Fonts.regular}
        style={{lineHeight: 15, textAlign: 'center', paddingHorizontal: 45}}>
        By tapping next, you are agreeing to PlantID{' '}
        <CText
          color="#597165B2"
          fontSize={11}
          fontFamily={Fonts.regular}
          style={{textDecorationLine: 'underline'}}>
          Terms of Use & Privacy Policy.
        </CText>{' '}
      </CText>
    </DefaultScreen>
  );
};

export default GetStarted;
