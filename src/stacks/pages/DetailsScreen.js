import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Text, Image } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../constants/colors";
import { SecondaryButton } from "../../components/Button";
import getImageItemByKey from "../../../assets/items";
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailsScreen = ({ navigation, route }) => {
  const item = route.params;

  const textoFixo = 'Adicionar ao Pedido       R$ ';

  const [quantidade, setQuantidade] = useState(1);
  const [observacao, setObservacao] = useState();
  const [textoAdicionar, setTextoAdicionar] = useState(textoFixo);
  const [precoItem, setPrecoItem] = useState(item.preco.replace(".", ","));

  useEffect(() => {
    setTextoAdicionar(textoAdicionar + precoItem);
  }, [])

  const adicionarAoPedido = async(food) => {
    AsyncStorage.getItem("items")
      .then(req => JSON.parse(req))
      .then(json => {
        food.observacao = observacao;
        food.valor = precoItem.replace(",", ".");
        food.quantidade = quantidade;
        if(json){
          json.push(food);
          AsyncStorage.setItem('items', JSON.stringify(json))
            .then(json => navigation.navigate("BottomNavigator", json))
            .catch(error => console.log('error!'+error));
        }else{
          const arr = [];
          arr.push(food);
          AsyncStorage.setItem('items', JSON.stringify(arr))
            .then(json => navigation.navigate("BottomNavigator", json))
            .catch(error => console.log('error!'+error));
        }
      })
      .catch(error => console.log('error!'));
  }

  const adicionarItem = async() => {
    const novaQtd = quantidade+1;
    const totalItem = (item.preco * novaQtd).toFixed(2);
    
    setQuantidade(novaQtd);
    setPrecoItem(totalItem);
    setTextoAdicionar(textoFixo + totalItem.replace(".", ","));
  }

  const removerItem = async() => {
    if(quantidade > 1){
      const novaQtd = quantidade-1;
      const totalItem = (item.preco * novaQtd).toFixed(2);

      setQuantidade(novaQtd);
      setPrecoItem(totalItem);
      setTextoAdicionar(textoFixo + totalItem.replace(".", ","));
    }
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
            <Text style={{ fontSize: 25, fontWeight: "bold", color: COLORS.white }} >
              {item.nome}
            </Text>
            <View style={style.iconContainer}>
              <Icon name="favorite-border" color={COLORS.primary} size={25} />
            </View>
          </View>
          <Text style={style.detailsText}>
            {item.ingredientes}
          </Text>

          <TextInput placeholder="Observações neste item ..." value={observacao} onChangeText={(text) => setObservacao(text)} style={style.observacao} multiline={true} numberOfLines={4} />
          <Text style={{ fontWeight: "bold", fontSize: 18, marginLeft: 270, marginTop: 20 }}>{quantidade}</Text>
          <View style={{ marginRight: 10, alignItems: "center" }}>
            
            <View style={style.actionBtn}>
              <Icon name="remove" size={25} color={COLORS.primary} onPress={() => removerItem()} />
              <Icon name="add" size={25} color={COLORS.primary} onPress={() => adicionarItem()} />
            </View>
          </View> 
          <View style={{ marginTop: 40, marginBottom: 40 }}>
            <SecondaryButton title={textoAdicionar} onPress={() => adicionarAoPedido(item)} />
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
    paddingBottom: 5,
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
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginRight: -200
  },
  observacao: {
    backgroundColor: 'white',
    height: 60,
    marginTop: 15,
    padding: 5,
    borderRadius: 5
  }
});

export default DetailsScreen;
