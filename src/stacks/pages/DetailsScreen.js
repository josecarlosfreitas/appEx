import React from "react";
import { SafeAreaView, StyleSheet, View, Text, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../constants/colors";
import { SecondaryButton } from "../../components/Button";
import getImageItemByKey from "../../../assets/items";
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailsScreen = ({ navigation, route }) => {
  const item = route.params;

  const adicionarAoPedido = (food) => {
    AsyncStorage.getItem("items")
      .then(req => JSON.parse(req))
      .then(json => {
        if(json){
          const arrFiltered = json.filter(i => i.id == food.id);
          if(!arrFiltered.length){
            json.push(food);
          }
          navigation.goBack();
        }else{
          const arr = [];
          arr.push(food);
          AsyncStorage.setItem('items', JSON.stringify(arr))
            .then(json => navigation.goBack())
            .catch(error => console.log('error!'));
        }
      })
      .catch(error => console.log('error!'));
  }

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, paddingTop:20 }}>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{ fontSize: 20, fontWeight: "bold" }} onPress={navigation.goBack}>Voltar</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 280,
          }}
        >
          <Image source={getImageItemByKey(item.imagem)} style={{ height: 220, width: 220 }} />
        </View>
        <View style={style.details}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 25, fontWeight: "bold", color: COLORS.white }}
            >
              {item.nome}
            </Text>
            <View style={style.iconContainer}>
              <Icon name="favorite-border" color={COLORS.primary} size={25} />
            </View>
          </View>
          <Text style={style.detailsText}>
            {item.ingredientes}
          </Text>
          <View style={{ marginTop: 40, marginBottom: 40 }}>
            <SecondaryButton title="Adicionar ao Pedido" onPress={() => adicionarAoPedido(item)} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  details: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  iconContainer: {
    backgroundColor: COLORS.white,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  detailsText: {
    marginTop: 10,
    lineHeight: 22,
    fontSize: 16,
    color: COLORS.white,
  },
});

export default DetailsScreen;
