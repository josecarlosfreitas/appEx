import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Text, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../constants/colors";
import { PrimaryButton } from "../../components/Button";
import getImageItemByKey from "../../../assets/items";
import AsyncStorage from '@react-native-async-storage/async-storage';
import truncate from "../../utils/truncate";

const CartScreen = ({ navigation }) => {
  const CartCard = ({ item }) => {
    return (
      <View style={style.cartCard}>
        <Image source={getImageItemByKey(item.imagem)} style={{ height: 80, width: 80 }} />
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.nome}</Text>
          <Text style={{ fontSize: 13, color: COLORS.grey }}>
            {truncate(item.ingredientes, 25)}
          </Text>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            R${item.preco}
          </Text>
        </View>
        <View style={{ marginRight: 10, alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>3</Text>
          <View style={style.actionBtn}>
            <Icon name="remove" size={25} color={COLORS.white} onPress={() => removerItem(item)} />
            <Icon name="add" size={25} color={COLORS.white} onPress={() => adicionarItem(item)} />
          </View>
        </View>
      </View>
    );
  };

  const [items, setItems] = useState([]);

  useEffect(() => {
    getItemsPedido();
  }, [])

  const getItemsPedido = async() => {
    AsyncStorage.getItem("items")
      .then(req => JSON.parse(req))
      .then(json => {
        if(json){
          setItems(json);
        }
      })
      .catch(error => console.log('error!'));
  }

  const adicionarItem = async(item) => {
    console.log(item);
    console.log('add');
  }

  const removerItem = async(item) => {
    console.log(item);
    console.log('remover');
  }

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Pedido</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        data={items}
        renderItem={({ item }) => <CartCard item={item} />}
        ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
        ListFooterComponent={() => (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 15,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Total
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>$50</Text>
            </View>
            <View style={{ marginHorizontal: 30 }}>
              <PrimaryButton title="CHECKOUT" />
            </View>
          </View>
        )}
      />
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
  cartCard: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
});

export default CartScreen;
