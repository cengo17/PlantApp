import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {PayItem} from '../Datas/PayItem';
import {SCREEN_WIDTH} from '../../constants/Constants';
import CView from '../CustomView';
import CFlatList from '../CustomFlatList';
import CButton from '../CustomButton';
import CText from '../CustomText';
export default function Paywall() {
  const navigation = useNavigation();
  const [selectedButton, setSelectedButton] = useState('1 Year');

  const handleButtonPress = title => {
    setSelectedButton(title);
  };
  const Button = ({title, subtitle, selected, onPress}) => {
    return (
      <TouchableOpacity
        style={[styles.btn, {borderColor: selected ? '#26AF6E' : '#58625E'}]}
        onPress={onPress}>
        <View style={{marginRight: 10}}>
          {selected ? (
            <View style={styles.view}>
              <View style={styles.border} />
            </View>
          ) : (
            <View style={styles.borderWidt} />
          )}
        </View>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>{title}</Text>
          </View>
          <Text style={{color: '#aaa'}}>{subtitle}</Text>
        </View>
        {selectedButton === '1 Year' && selected ? (
          <View style={styles.save}>
            <CText color={'#fff'} regular fontSize={12}>
              Save 50%
            </CText>
          </View>
        ) : null}
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: '#101E17'}}>
      <StatusBar barStyle="light-content" />
      <View style={{width: 'auto', height: 500, flex: 1}}>
        <ImageBackground
          source={require('../../images/FlowerBg.png')}
          style={{
            flex: 1,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Tabbar');
            }}>
            <Image
              style={{
                marginLeft: 'auto',
                marginRight: '5%',
                marginTop: '15%',
                width: 35,
                height: 35,
              }}
              source={require('../../images/Close.png')}
            />
          </TouchableOpacity>
          <View style={{marginTop: 'auto', padding: 20, marginBottom: '35%'}}>
            <CText
              style={{lineHeight: 33}}
              color={'#FFFFFF'}
              fontSize={27}
              bold>
              PlantApp{' '}
              <CText
                style={{lineHeight: 33}}
                color={'#FFFFFF'}
                fontSize={27}
                regular>
                Premium
              </CText>
            </CText>
            <CText
              style={{opacity: 0.6}}
              color={'#FFFFFF'}
              fontSize={17}
              regular>
              Access All Features
            </CText>
          </View>
        </ImageBackground>
      </View>
      <CFlatList
        keyExtractor={item => item.id + ''}
        style={{marginTop: -140, marginBottom: -30}}
        itemSpace={10}
        headerSpace={25}
        footerSpace={20}
        horizontal
        data={PayItem}
        renderItem={({item, index}) => {
          return (
            <CView space={10} style={{height: 135, width: SCREEN_WIDTH * 0.42}}>
              <CView
                style={{
                  flex: 1,
                  backgroundColor: '#233029',
                  borderRadius: 14,
                  overflow: 'hidden',
                }}>
                <CView style={{padding: 15}}>
                  <Image
                    source={item?.icon}
                    style={{width: 35, height: 35}}
                    resizeMode={'cover'}
                  />
                </CView>
                <CView
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                  }}>
                  <CText fontSize={20} bold style={{color: 'white'}}>
                    {item.header}
                  </CText>
                  <CText
                    fontSize={13}
                    style={{color: 'white', opacity: 0.5, marginTop: 3}}>
                    {item.detailText}
                  </CText>
                </CView>
              </CView>
            </CView>
          );
        }}
      />
      <View style={{padding: 26}}>
        <Button
          title="1 Month"
          subtitle="$2.99/month, auto renewable"
          selected={selectedButton === '1 Month'}
          onPress={() => handleButtonPress('1 Month')}
        />
        <Button
          title="1 Year"
          subtitle="First 3 days free, then $529.99/year"
          selected={selectedButton === '1 Year'}
          onPress={() => handleButtonPress('1 Year')}
        />

        <CButton style={{marginTop: 15}} text={'Try free for 3 days'} />
        <CText
          style={{
            opacity: 0.6,
            marginTop: 15,
            lineHeight: 11,
            textAlign: 'center',
          }}
          color={'#fff'}
          fontSize={8.7}
          regular>
          After the 3-day free trial period you’ll be charged ₺274.99 per year
          unless you cancel before the trial expires. Yearly Subscription is
          Auto-Renewable
        </CText>
        <CText
          style={{
            opacity: 0.6,
            marginTop: 15,
            lineHeight: 13,
            textAlign: 'center',
          }}
          color={'#fff'}
          fontSize={11}
          regular>
          Terms • Privacy • Restore
        </CText>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  btn: {
    borderWidth: 1,
    borderRadius: 14,
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#1C2923',
    marginTop: 20,
  },
  view: {
    backgroundColor: 'green',
    width: 18,
    height: 18,
    borderRadius: 25,
  },
  border: {
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'white',
    width: 7,
    height: 7,
    marginLeft: 'auto',
    marginBottom: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    borderRadius: 5,
  },
  borderWidt: {
    borderWidth: 1,
    borderColor: '#aaa',
    width: 18,
    height: 18,
    borderRadius: 25,
  },
  save: {
    padding: 8,
    borderTopRightRadius: 14,
    borderBottomLeftRadius: 14,
    color: '#aaa',
    marginTop: -15,
    marginLeft: -7,
    marginBottom: 'auto',
    backgroundColor: '#26AF6E',
  },
});
