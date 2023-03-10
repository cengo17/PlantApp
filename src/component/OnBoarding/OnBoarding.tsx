import React from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  StatusBar,
  Dimensions,
  ImageBackground,
} from 'react-native';
import CButton from '../CustomButton';
import CText from '../CustomText';
import Colors from '../../constants/Colors';
const {width, height} = Dimensions.get('window');
import {slides} from '../Datas/slides';
const COLORS = {primary: '#FAFAFA', white: '#fff', text: Colors.text};

const Slide = ({item}) => {
  return (
    <ImageBackground
      source={item?.bgImage}
      style={{
        flex: 1,
      }}>
      <View>
        <View style={{padding: 20}}>
          <CText color={Colors.text} regular fontSize={25} style={styles.title}>
            {item?.title}
            <CText color={Colors.text} bold fontSize={25}>
              {' '}
              {item?.title1}
            </CText>
          </CText>
          <View style={{flexDirection: 'row'}}>
            <CText color={Colors.text} regular fontSize={25}>
              {item?.title2}
            </CText>
            <Image
              source={item?.image2}
              style={{
                height: 35,
                width: 138,
                resizeMode: 'contain',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            />
          </View>
        </View>
        <Image
          source={item?.image}
          style={{
            height: '90%',
            width,
            resizeMode: 'contain',
            marginLeft: item.id === '2' ? 20 : 0,
          }}
        />
      </View>
    </ImageBackground>
  );
};

const Onboarding = ({navigation}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };
  const Footer = () => {
    return (
      <View
        style={{
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        <CButton
          onPress={
            currentSlideIndex == slides.length - 1
              ? () => navigation.replace('Paywall')
              : goToNextSlide
          }
          text={'Continue'}
          testID="continue-button"
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 16,
          }}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: '#13231B',
                  width: 10,
                  opacity: 2,
                },
              ]}
            />
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.primary}}>
      <StatusBar backgroundColor={COLORS.primary} />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{height: height * 0.75}}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({item}) => <Slide item={item} />}
      />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: COLORS.white,
    fontSize: 13,
    marginTop: 10,
    maxWidth: '70%',
    textAlign: 'center',
    lineHeight: 23,
  },
  title: {
    color: COLORS.text,
    marginTop: 20,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  indicator: {
    height: 10,
    width: 10,
    backgroundColor: '#13231B',
    opacity: 0.2,
    marginHorizontal: 3,
    borderRadius: 35,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Onboarding;
