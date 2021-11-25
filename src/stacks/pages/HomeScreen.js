import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../constants/colors";
import { cloudAddress } from '../../Api'
import getImageByKey from "../../../assets/catergories";
import getImageItemByKey from "../../../assets/items";
import truncate from "../../utils/truncate";
import AsyncStorage from "@react-native-async-storage/async-storage";
import capitalizeFirstLetter from "../../utils/capitalize";

const { width } = Dimensions.get("screen");
const cardWidth = width / 2 - 20;

const HomeScreen = ({ navigation }) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState();
  const [categorias, setCategorias] = useState([]);
  const [items, setItems] = useState([]);
  const [itemsAux, setItemsAux] = useState([]);
  const [nomeUsuario, setNomeUsuario] = useState('');

  useEffect(() => {
    getCategorias();
    getItems();
    getUsuario();
  }, [])

  const getUsuario = async() => {
    const usuario = await AsyncStorage.getItem('nome');
    setNomeUsuario(usuario);
  }

  const selecionarCategoria = async(categoria, index) => {
    if(index == selectedCategoryIndex){
      setSelectedCategoryIndex();
      setItems(itemsAux);
    }else{
      setSelectedCategoryIndex(index)
      if(index >= 0){
        const categoria = categorias[index];
        const lista = [];
        itemsAux.forEach((item) => {
          if(item.categoria == categoria.nome){
            lista.push(item);
          }
        });
          
        setItems(lista);
      }
    }
  }
  
  const ListCategories = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style.categoriesListContainer}
      >
        {categorias.map((category, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => selecionarCategoria(category, index)}
          >
            <View
              style={{
                backgroundColor:
                  selectedCategoryIndex == index
                    ? COLORS.primary
                    : COLORS.secondary,
                ...style.categoryBtn,
              }}
            >
              <View style={style.categoryBtnImgCon}>
                <Image
                  source={getImageByKey(category.imagem)}
                  style={{ height: 35, width: 35, resizeMode: "cover" }}
                />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  marginLeft: 10,
                  color:
                    selectedCategoryIndex == index
                      ? COLORS.white
                      : COLORS.primary,
                }}
              >
                {category.nome}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const Card = ({ food }) => {
    return (
      <TouchableHighlight
        underlayColor={COLORS.white}
        activeOpacity={0.9}
        onPress={() => navigation.navigate("DetailsScreen", food)}
      >
        <View style={style.card}>
          <View style={{ alignItems: "center", top: -40 }}>
            <Image source={getImageItemByKey(food.imagem)} style={{ height: 120, width: 120 }} />
          </View>
          <View style={{ marginHorizontal: 20, top: -30 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {food.nome}
            </Text>
            <Text style={{ fontSize: 13, color: COLORS.grey, marginTop: 2 }}>
              {truncate(food.ingredientes, 40)}
            </Text>
          </View>
          <View
            style={{
              marginTop: -8,
              marginHorizontal: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              R$ {food.preco}
            </Text>
            <View style={style.addToCartBtn}>
              <Icon name="add" size={20} color={COLORS.white} />
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  const getCategorias = async() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      timeout: 5000
    };
  
    await fetch(cloudAddress + 'categoria', requestOptions)
    .then(response => response.text())
    .then(result => {
      var listaCategorias = JSON.parse(result);
      setCategorias(listaCategorias);
      console.log(categorias);
    })
  }

  const getItems = async() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      timeout: 5000
    };
  
    await fetch(cloudAddress + 'item', requestOptions)
    .then(response => response.text())
    .then(result => {
      var listaItems = JSON.parse(result);
      setItems(listaItems);
      setItemsAux(listaItems);
    })
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={style.header}>
        <View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 28 }}>Olá,</Text>
            <Text style={{ fontSize: 28, fontWeight: "bold", marginLeft: 10 }}>
              {capitalizeFirstLetter(nomeUsuario)}
            </Text>
          </View>
        </View>
        <Image
          source={require("../../../assets/person.png")}
          style={{ height: 50, width: 50, borderRadius: 25 }}
        />
      </View>
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          paddingHorizontal: 20,
        }}
      >
        <View style={style.inputContainer}>
          <Icon name="search" size={28} />
          <TextInput
            style={{ flex: 1, fontSize: 18 }}
            placeholder="Pesquisar"
          />
        </View>
        <View style={style.sortBtn}>
          <Icon name="tune" size={28} color={COLORS.white} />
        </View>
      </View>
      <View>
        <ListCategories />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={items}
        renderItem={({ item }) => <Card food={item} />}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: COLORS.light,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  categoriesListContainer: {
    paddingVertical: 30,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 45,
    marginRight: 7,
    borderRadius: 30,
    alignItems: "center",
    paddingHorizontal: 5,
    flexDirection: "row",
    paddingRight: 18
  },
  categoryBtnImgCon: {
    height: 35,
    width: 35,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    height: 220,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: COLORS.white,
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
