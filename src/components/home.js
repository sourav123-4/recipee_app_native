import {View, Text, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import {Input, ScrollView} from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import React, {useEffect, useState} from 'react';
import Loading from '../common/loading';
import {StyleSheet} from 'react-native';
import {useGetAllRecipesQuery} from '../redux/api/apiSlice';
const Home = ({navigation}) => {
  const {isError, isLoading, isSuccess, isFetching, data} =
    useGetAllRecipesQuery();
  console.log('recipedata', data);
  const [searchData, setSearchData] = useState('');
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <SafeAreaView>
      {isLoading && <Loading />}
      {isSuccess && (
        <View style={styles.container}>
          <Input
            mx="3"
            size="md"
            placeholder="Search any recipee"
            w="95%"
            margin={5}
            placeholderTextColor="green.500"
            onChangeText={val => setSearchData(val)}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            {isSuccess &&
              data?.results
                ?.filter(item => {
                  if (searchData) {
                    return item.name
                      .toLowerCase()
                      .includes(searchData.toLowerCase());
                  } else {
                    return item;
                  }
                })
                .map(item => {
                  return (
                    <TouchableOpacity
                      style={styles.subContainer}
                      key={item.id}
                      onPress={() =>
                        navigation.navigate('ProductDetails', {id: item.id})
                      }>
                      <Image
                        source={{uri: item.thumbnail_url}}
                        style={styles.image}
                      />
                      <Text style={styles.text}>{item.name}</Text>
                    </TouchableOpacity>
                  );
                })}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({
  image: {
    width: '95%',
    height: 150,
    borderRadius: 15,
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
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 15,
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
