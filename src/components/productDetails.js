import {View, Text, ScrollView, StyleSheet, Image} from 'react-native';
import React from 'react';
import {useGetAllRecipesQuery} from '../redux/api/apiSlice';
import Loading from '../common/loading';
const ProductDetails = ({route, navigation}) => {
  const {isLoading, isSuccess, data} = useGetAllRecipesQuery();
  const {id} = route.params;

  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
      <ScrollView>
        {isSuccess &&
          data?.results?.map(item => {
            const targetRecipe =
              item.id === id ? (
                <View style={styles.subContainer}>
                  <Image
                    source={{uri: item.thumbnail_url}}
                    style={styles.image}
                  />
                  <Text style={styles.text}>{item.name}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                  {item?.nutrition?.calories && (
                    <View style={styles.nutrition}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '900',
                          color: 'green',
                        }}>
                        Nutrition:{' '}
                      </Text>
                      <View style={{display: 'flex', flexWrap: 'wrap'}}>
                        <Text style={styles.nutritionText}>
                          Calories: {item?.nutrition?.calories}
                        </Text>
                        <Text style={styles.nutritionText}>
                          Carbohydrates: {item?.nutrition?.carbohydrates}
                        </Text>
                        <Text style={styles.nutritionText}>
                          Fat: {item?.nutrition?.fat}
                        </Text>
                        <Text style={styles.nutritionText}>
                          Fiber: {item?.nutrition?.fiber}
                        </Text>
                        <Text style={styles.nutritionText}>
                          Protin: {item?.nutrition?.protein}
                        </Text>
                        <Text style={styles.nutritionText}>
                          Sugar: {item?.nutrition?.sugar}
                        </Text>
                      </View>
                    </View>
                  )}
                  {item?.sections && (
                    <View style={styles.ingredient}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '900',
                          color: 'green',
                        }}>
                        Ingredients:
                      </Text>
                      {item?.sections[0]?.components?.map(ingredient => {
                        return (
                          <Text style={styles.ingredientText}>
                            {ingredient.raw_text}
                          </Text>
                        );
                      })}
                    </View>
                  )}
                </View>
              ) : null;
            return targetRecipe;
          })}
      </ScrollView>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  image: {
    width: '95%',
    height: 150,
    borderRadius: 15,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  text: {
    fontSize: 17,
    fontWeight: '800',
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
  description: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'gray',
  },
  nutrition: {
    padding: 10,
  },
  nutritionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'orange',
    padding: 3,
  },
  ingredient: {},
  ingredientText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'orange',
    padding: 4,
  },
});
