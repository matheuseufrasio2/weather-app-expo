import React, { useEffect, useState } from 'react'
import { MaterialIcons as Icon, MaterialCommunityIcons as Icon2 } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native'
import { RectButton, TextInput, FlatList } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import citiesList from '../../assets/json/cities.json';


interface CityJson {
  country: string,
  city: string | null,
}

const Home = () => {
  const [citySearch, setCitySearch] = useState('');
  const [cities, setCities] = useState<CityJson[]>();

  useEffect(() => {
    const citiesJson = citiesList.map((cityJson: CityJson) => {
      return {
        country: cityJson.country,
        city: cityJson.city,
      };
    });
    setCities(citiesJson);
  }, []);

  const navigation = useNavigation();

  function handleNavigateToWeathers() {
    navigation.navigate('CityWeather');
  }

  function handleInput(text: string) {
    console.log('input')
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.inputCity}>
          <TextInput 
            style={styles.inputText}
            autoCorrect={false}
            placeholder="Procurar Cidade"
            onChangeText={(text) => handleInput(text)}
          />
          <Icon style={styles.iconSearch} name="location-on" />
        </View>
      </View>

      <FlatList
        data={cities}
        keyExtractor={(item) => item.country}
        renderItem={({ item }: { item: CityJson }) => (
          <RectButton style={styles.cityButton} onPress={handleNavigateToWeathers}>
            <Text style={styles.cityButtonText}>{item.city}, {item.country}</Text>
            <Icon2 style={styles.iconCityButton} name="temperature-celsius" />
          </RectButton>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30
  },
  form: {
    flexDirection: 'row',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#7d7d7d24'
  },
  inputCity: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#eee',
    borderRadius: 4,
    paddingVertical: 0,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#303644'
  },
  inputText: {
    flex: 1
  },
  iconSearch: {
    color: '#303644',
    position: 'absolute',
    paddingRight: 10,
    marginRight: 30,
    fontSize: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  cityButton: {
    flexDirection: 'row',
    marginVertical: 5,
    backgroundColor: '#333',
    borderRadius: 4,
    paddingVertical: 10,
    alignItems: 'center',
  },
  cityButtonText: {
    color: '#fff',
    fontFamily: 'Roboto_500Medium',
    flex: 1,
    paddingLeft: 20
  },
  iconCityButton: {
    flex: 1,
    position: 'absolute',
    fontFamily: 'Roboto_500Medium',
    color: '#fff',
    paddingRight: 20,
    fontSize: 15
  }
});

export default Home;