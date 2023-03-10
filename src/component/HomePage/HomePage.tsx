import React, {useState, useEffect, useCallback} from 'react';
import CText from '../CustomText';
import {
  View,
  ImageBackground,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import DefaultScreen from '../DefaultScreen';
import Colors from '../../constants/Colors';
import CFlatList from '../CustomFlatList';
import {useSelector, useDispatch} from 'react-redux';
import {fetchQuestions, fetchCategories} from '../../store/store';
export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = useCallback(text => {
    setSearchTerm(text);
  }, []);

  const questions = useSelector(state => state.questions);
  const categories = useSelector(state => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuestions());
    dispatch(fetchCategories());
  }, []);

  const filteredQuestions = questions.filter(question =>
    question.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredCategories = categories.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        setLoading(true);
        const results = questions.filter(q => q.title.includes(searchTerm));
        setSearchResults(results);
        setLoading(false);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);
  return (
    <DefaultScreen ignoreSafeArea removePadding>
      <ImageBackground
        source={require('../../images/BackgroundHome.png')}
        style={{
          width: 'auto',
          height: 200,
          resizeMode: 'cover',
        }}>
        <View style={{padding: 20, marginTop: '10%', marginLeft: '5%'}}>
          <CText style={{}} color={Colors.text} regular fontSize={16}>
            Hi, plant lover!
          </CText>
          <CText
            style={{marginTop: '3%', fontWeight: 500}}
            color={Colors.text}
            regular
            fontSize={24}>
            Good Afternoon! ⛅
          </CText>
          <View style={styles.inputContainer}>
            <Image
              style={{width: 20, height: 20}}
              source={require('../../images/search.png')}
            />
            <TextInput
              style={styles.input}
              placeholder="Search for Plants"
              value={searchTerm}
              onChangeText={handleSearch}
            />
          </View>
        </View>
      </ImageBackground>
      <DefaultScreen
        style={{backgroundColor: 'white'}}
        ignoreSafeArea
        scrollableContent
        containerProps={{space: 10}}>
        <TouchableOpacity style={styles.btn}>
          <Image
            style={{width: 35, height: 35, marginRight: 20}}
            source={require('../../images/IconMsg.png')}
          />
          <View style={{flexDirection: 'column'}}>
            <CText fontSize={16} regular color={'#E5C990'}>
              FREE Premium Available
            </CText>
            <CText fontSize={13} regular color={'#FFDE9CCC'}>
              Tap to upgrade your account!
            </CText>
          </View>
          <Image
            style={{width: 35, height: 35, marginLeft: 20}}
            source={require('../../images/arrow.png')}
          />
        </TouchableOpacity>
        <CText
          style={{marginTop: 15, fontWeight: 500}}
          fontSize={16}
          medium
          color={'#13231B'}>
          Get Started
        </CText>
        <CFlatList
          keyExtractor={item => item.id + ''}
          itemSpace={10}
          footerSpace={20}
          horizontal
          data={filteredQuestions}
          renderItem={({item, index}) => {
            return (
              <View style={{width: 280, height: 200, borderRadius: 12}}>
                <ImageBackground
                  source={{uri: item?.image_uri}}
                  imageStyle={{borderRadius: 12}}
                  style={{
                    flex: 1,
                  }}>
                  <View style={styles.titleView}>
                    <CText
                      regular
                      fontSize={16}
                      style={{fontWeight: 500}}
                      color={'#FFFFFF'}>
                      {item?.title}
                    </CText>
                  </View>
                </ImageBackground>
              </View>
            );
          }}
        />
        <CFlatList
          keyExtractor={item => item.id + ''}
          data={filteredCategories}
          itemSpace={10}
          footerSpace={20}
          contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}
          horizontal={false}
          renderItem={({item, index}) => {
            return (
              <View style={styles.titleViews}>
                <CText
                  style={{padding: 12, fontWeight: 500, width: '70%'}}
                  regular
                  fontSize={16}
                  color={'#13231B'}>
                  {item.title}
                </CText>
                <Image style={styles.img} source={{uri: item?.image?.url}} />
              </View>
            );
          }}
        />
      </DefaultScreen>
    </DefaultScreen>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFFE0',
    borderRadius: 12,
    paddingHorizontal: 10,
    height: 44,
    marginTop: 15,
  },
  input: {
    marginLeft: 10,
    flex: 1,
    color: '#AFAFAF',
  },
  btn: {
    height: 64,
    backgroundColor: '#24201A',
    borderRadius: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleView: {
    marginTop: 'auto',
    marginBottom: 15,
    padding: 15,
    backgroundColor: 'transparent',
    borderRadius: 12,
  },
  titleViews: {
    width: 160,
    height: 160,
    backgroundColor: '#F9FFFA',
    flexDirection: 'row',
    borderRadius: 7,
    marginLeft: 5,
  },
  img: {
    height: 150,
    width: 150,
    marginLeft: 'auto',
    borderRadius: 7,
  },
});
