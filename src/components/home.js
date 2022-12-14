import {View, Text, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import {
  Button,
  HStack,
  Input,
  ScrollView,
  Center,
  Box,
  CheckIcon,
  VStack,
} from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import React, {useEffect, useState, useCallback} from 'react';
import Loading from '../common/loading';
import {StyleSheet} from 'react-native';
import {useGetAllRecipesQuery} from '../redux/api/apiSlice';
import {Select} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {convertAbsoluteToRem} from 'native-base/lib/typescript/theme/tools';
import axios from 'axios';
const ViewApp = ({
  isSuccess,
  data,
  navigation,
  searchData,
  service,
  vertical,
  food,
}) => {
  return (
    isSuccess &&
    data?.results
      ?.filter(item => {
        if (searchData) {
          return item.name.toLowerCase().includes(searchData.toLowerCase());
        } else {
          return item;
        }
      })
      .sort((a, b) => {
        const getDate = val => {
          const d = new Date(val);
          return d.toISOString();
        };
        if (service === 'A-Z') {
          return a.name > b.name ? 1 : -1;
        } else if (service === 'Z-A') {
          return a.name < b.name ? 1 : -1;
        } else if (service === 'Date') {
          return getDate(b.created_at) - getDate(a.created_at);
        }
      })
      .map(item => {
        return vertical ? (
          <VStack
            alignItems={'center'}
            margin={2}
            space={1}
            padding={5}
            rounded={15}
            borderColor="orange.300"
            borderWidth={1}
            style={
              vertical ? styles.subContainer : styles.subContainerhorizontal
            }
            key={item.id}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ProductDetails', {id: item.id})
              }>
              <Image source={{uri: item.thumbnail_url}} style={styles.image} />
              <Text style={styles.text}>{item.name}</Text>
            </TouchableOpacity>
          </VStack>
        ) : (
          <VStack
            alignItems={'center'}
            margin={2}
            space={1}
            padding={5}
            rounded={15}
            borderColor="orange.300"
            borderWidth={1}
            style={styles.subContainerhorizontal}
            key={item.id}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ProductDetails', {id: item.id})
              }>
              <Image
                source={{uri: item.thumbnail_url}}
                style={styles.imagehorizontal}
              />
              <Text style={styles.horizontalText}>{item.name}</Text>
            </TouchableOpacity>
          </VStack>
        );
      })
  );
};

const VerticalView = ({
  isSuccess,
  data,
  navigation,
  searchData,
  service,
  vertical,
  food,
}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ViewApp
        isSuccess={isSuccess}
        data={data}
        navigation={navigation}
        searchData={searchData}
        service={service}
        vertical={vertical}
        food={food}
      />
    </ScrollView>
  );
};
const HorizontalView = ({
  isSuccess,
  data,
  navigation,
  searchData,
  service,
  vertical,
  food,
}) => {
  return (
    <ViewApp
      isSuccess={isSuccess}
      data={data}
      navigation={navigation}
      searchData={searchData}
      service={service}
      vertical={vertical}
      food={food}
    />
  );
};
const SearchBar = ({setSearchData, searchData, data, service, setFood}) => {
  // const debouncing = func => {
  //   let timer;
  //   return function (...args) {
  //     const context = this;
  //     if (timer) clearTimeout(timer);
  //     timer = setTimeout(() => {
  //       timer = null;
  //       func.apply(context, args);
  //     }, 1000);
  //   };
  // };
  // const handleChange = val => {
  //   const options = {
  //     method: 'GET',
  //     url: 'https://tasty.p.rapidapi.com/recipes/auto-complete',
  //     params: {prefix: val},
  //     headers: {
  //       'X-RapidAPI-Key': '09ce4eedcfmshe255b978d6ff7c8p1713a2jsnbfc53b3741ec',
  //       'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
  //     },
  //   };
  //   if (val.length > 2) {
  //     axios
  //       .request(options)
  //       .then(function (response) {
  //         console.log(response.data);
  //         setFood(response.data);
  //       })
  //       .catch(function (error) {
  //         console.error(error);
  //       });
  //   }

  //   const recipee = data?.results
  //     ?.filter(item => {
  //       if (val) {
  //         return item.name.toLowerCase().includes(val.toLowerCase());
  //       } else {
  //         return item;
  //       }
  //     })
  //     .sort((a, b) => {
  //       const getDate = val => {
  //         const d = new Date(val);
  //         return d.toISOString();
  //       };
  //       if (service === 'A-Z') {
  //         return a.name > b.name ? 1 : -1;
  //       } else if (service === 'Z-A') {
  //         return a.name < b.name ? 1 : -1;
  //       } else if (service === 'Date') {
  //         return getDate(b.created_at) - getDate(a.created_at);
  //       }
  //     });
  // };
  // const optimisedVersion = useCallback(debouncing(handleChange), []);
  return (
    <Input
      mx="3"
      size="md"
      placeholder="Search any recipee"
      w="95%"
      margin={5}
      placeholderTextColor="green.500"
      onChangeText={val => setSearchData(val)}
    />
  );
};
const SelectView = ({setService, service}) => {
  const data = [
    {value: 'A-Z', label: 'A to Z'},
    {value: 'Z-A', label: 'Z to A'},
    {value: 'Date', label: 'By Date'},
  ];
  return (
    <Center>
      <Box maxW="300">
        <Select
          selectedValue={service}
          minWidth="150"
          accessibilityLabel="Choose Service"
          placeholderTextColor={'green.700'}
          fontSize={17}
          placeholder="Filter"
          _selectedItem={{
            bg: 'teal.600',
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={itemValue => setService(itemValue)}>
          {data.map((item, index) => {
            return (
              <Select.Item key={index} label={item.label} value={item.value} />
            );
          })}
        </Select>
      </Box>
    </Center>
  );
};
const Home = ({navigation}) => {
  const {isLoading, isSuccess, data} = useGetAllRecipesQuery();
  const [searchData, setSearchData] = useState('');
  const [vertical, setVertical] = useState(true);
  const [horizontal, setHorizontal] = useState(false);
  const [service, setService] = useState('');
  const [food, setFood] = useState([]);
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  console.log('food in home', food);
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={styles.container}>
        <SearchBar
          setSearchData={setSearchData}
          setFood={setFood}
          data={data}
          service={service}
        />
        <HStack
          alignItems={'center'}
          justifyContent={'space-between'}
          width={'100%'}
          paddingLeft={5}
          paddingRight={5}
          paddingBottom={5}>
          <View style={styles.fonticons}>
            <TouchableOpacity
              onPress={() => {
                setVertical(true), setHorizontal(false);
              }}>
              <FontAwesome5 name="grip-lines" size={25} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setHorizontal(true), setVertical(false);
              }}>
              <FontAwesome5 name="th-large" size={25} />
            </TouchableOpacity>
          </View>
          <SelectView setService={setService} service={service} />
        </HStack>
        {isLoading && <Loading />}
        {isSuccess && (
          <ScrollView>
            {vertical ? (
              <VerticalView
                isSuccess={isSuccess}
                data={data}
                navigation={navigation}
                searchData={searchData}
                service={service}
                vertical={vertical}
                food={food}
              />
            ) : null}
            {horizontal ? (
              <HStack flexWrap={'wrap'}>
                <HorizontalView
                  isSuccess={isSuccess}
                  data={data}
                  navigation={navigation}
                  searchData={searchData}
                  service={service}
                  vertical={vertical}
                  food={food}
                />
              </HStack>
            ) : null}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    marginBottom: 80,
  },
  view: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  image: {
    width: 300,
    height: 170,
    borderRadius: 15,
  },
  imagehorizontal: {
    width: 150,
    height: 150,
    borderRadius: 15,
  },
  horizontalText: {
    fontSize: 12,
    fontWeight: 'bold',
    padding: 10,
    color: 'green',
  },
  fonticons: {
    width: '20%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchBar: {
    fontSize: 16,
    color: 'blue',
    backgroundColor: 'gray',
    width: '100%',
    padding: 10,
    borderRadius: 10,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  subContainer: {
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 15,
  },
  subContainerhorizontal: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 15,
    width: '45%',
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
    padding: 10,
    color: 'green',
  },
  recipeText: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    fontWeight: '900',
    color: 'blue',
  },
});
