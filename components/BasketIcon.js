import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal } from "../features/basketSlice";
import { useNavigation } from "@react-navigation/native";
import Currency from "react-currency-formatter";

const BasketIcon = () => {
  const basketItems = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const navigation = useNavigation();
    
  if (!basketItems.length) return;

  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity
        className="mx-5 bg-[#00CCBB] p-4 rounded-lg flex-row items-center space-x-1"
        onPress={() => navigation.navigate("Basket")}
      >
        <Text className="text-white font-extrabold text-lg bg-[#01A296] py-1 px-2">
          {basketItems.length}
        </Text>
        <Text className="text-white flex-1 text-center font-extrabold text-lg">
          View Basket
        </Text>

        <Text className="text-lg font-extrabold text-white">
          <Currency quantity={basketTotal} currency="GBP"></Currency>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
