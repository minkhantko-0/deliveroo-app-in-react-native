import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../features/basketSlice";
import { XCircleIcon } from "react-native-heroicons/solid";
import Currency from "react-currency-formatter";
import { urlFor } from "../sanity";
const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const basketItems = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);

  const [groupedBasketItems, setGroupedBasketItems] = useState([]);

  const dispatch = useDispatch();

  useMemo(() => {
    const groupedBasketItems = basketItems.reduce((results, basketItem) => {
      (results[basketItem.id] = results[basketItem.id] || []).push(basketItem);
      return results;
    }, {});

    setGroupedBasketItems(groupedBasketItems);
  }, [basketItems]);

  return (
    <SafeAreaView className="flex-1 bg-white px-4">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-sm">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>

          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <XCircleIcon height={50} width={50} color={"#00CCBB"} />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={{ uri: "https://links.papareact.com/wru" }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Deliver in 30-45 minutes</Text>
          <TouchableOpacity>
            <Text className="text-[#00ccbb]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedBasketItems).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5"
            >
              <Text className="text-[#00ccbb]">{items.length} x</Text>
              <Image
                className="w-12 h-12 rounded-full"
                source={{ uri: urlFor(items[0].image).url() }}
              />
              <Text className="flex-1">{items[0].name}</Text>
              <Text className="text-gray-600">
                <Currency quantity={items[0].price} currency="GBP"></Currency>
              </Text>
              <TouchableOpacity>
                <Text
                  className="text-[#00ccbb] text-xs"
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">
              <Currency quantity={basketTotal} currency="GBP"></Currency>
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery fee</Text>
            <Text className="text-gray-400">
              <Currency quantity={5.99} currency="GBP"></Currency>
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="font-extrabold">Order Total</Text>
            <Text className="text-gray-400">
              <Currency quantity={5.99 + basketTotal} currency="GBP"></Currency>
            </Text>
          </View>
          <TouchableOpacity
            className="rounded-lg p-4 bg-[#00ccbb]"
            onPress={() => navigation.navigate("PreparingOrder")}
          >
            <Text className="text-center text-white text-lg font-bold">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
