import {View, Text, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import {
  Button,
  HStack,
  Input,
  ScrollView,
  Center,
  Box,
  CheckIcon,
} from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import React, {useEffect, useState} from 'react';
import Loading from '../common/loading';
import {StyleSheet} from 'react-native';
import {useGetAllRecipesQuery} from '../redux/api/apiSlice';
import {Select} from 'native-base';

const ViewApp = ({
  isSuccess,
  data,
  navigation,
  searchData,
  service,
  vertical,
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
        return (
          <TouchableOpacity
            style={
              vertical ? styles.subContainer : styles.subContainerhorizontal
            }
            key={item.id}
            onPress={() =>
              navigation.navigate('ProductDetails', {id: item.id})
            }>
            <Image
              source={{uri: item.thumbnail_url}}
              style={vertical ? styles.image : styles.imagehorizontal}
            />
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
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
}) => {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <HStack>
        <ViewApp
          isSuccess={isSuccess}
          data={data}
          navigation={navigation}
          searchData={searchData}
          service={service}
          vertical={vertical}
        />
      </HStack>
    </ScrollView>
  );
};
const SearchBar = ({setSearchData}) => {
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
          minWidth="100"
          accessibilityLabel="Choose Service"
          placeholder="Choose Order"
          _selectedItem={{
            bg: 'teal.600',
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={itemValue => setService(itemValue)}>
          {data.map(item => {
            return <Select.Item label={item.label} value={item.value} />;
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

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      {isLoading && <Loading />}
      {isSuccess && (
        <View style={styles.container}>
          <SearchBar setSearchData={setSearchData} />
          <SelectView setService={setService} service={service} />
          <HStack padding={2}>
            <Button
              onPress={() => {
                setVertical(true), setHorizontal(false);
              }}>
              <Text style={styles.view}>Vertical</Text>
            </Button>
            <Button
              marginLeft={3}
              onPress={() => {
                setHorizontal(true), setVertical(false);
              }}>
              <Text style={styles.view}>Horizontal</Text>
            </Button>
          </HStack>
          {vertical ? (
            <VerticalView
              isSuccess={isSuccess}
              data={data}
              navigation={navigation}
              searchData={searchData}
              service={service}
              vertical={vertical}
            />
          ) : null}
          {horizontal ? (
            <HorizontalView
              isSuccess={isSuccess}
              data={data}
              navigation={navigation}
              searchData={searchData}
              service={service}
              vertical={vertical}
            />
          ) : null}
        </View>
      )}
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
    width: '95%',
    height: 150,
    borderRadius: 15,
  },
  imagehorizontal: {
    width: '100%',
    height: 300,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 15,
  },
  subContainerhorizontal: {
    padding: 10,
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
