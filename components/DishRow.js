import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import Currency from "react-currency-formatter";
import { urlFor } from "../sanity";
import { PlusCircleIcon, MinusCircleIcon } from "react-native-heroicons/solid";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItemsWithId,
} from "../features/basketSlice";

const DishRow = ({ id, name, price, image, description }) => {
  const [isPressed, setIsPressed] = useState(false);
  const dispatch = useDispatch();
  const basketItems = useSelector(
    (state) => selectBasketItemsWithId(state, id),
    shallowEqual
  );

  const addItemToBasket = (item) => {
    dispatch(addToBasket({ id, name, price, image, description }));
  };

  const removeItemFromBasket = (item) => {
    if (!basketItems.length) return;
    dispatch(removeFromBasket({ id }));
  };

  return (
    <>
      <TouchableOpacity
        className={`bg-white border border-gray-200 p-4 ${
          isPressed && "border-b-0"
        }`}
        onPress={() => setIsPressed(!isPressed)}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <Text className="text-lg mb-1">{name}</Text>
            <Text className="text-gray-400">{description}</Text>
            <Text className="text-gray-400 mt-2">
              <Currency quantity={price} currency="GBP"></Currency>
            </Text>
          </View>
          <View className="h-20 w-20 bg-gray-300 border-2 border-white">
            <Image
              className="w-full h-full p-4"
              source={{ uri: urlFor(image).url() }}
            />
          </View>
        </View>
      </TouchableOpacity>
      {isPressed && (
        <View className="bg-white px-4">
          <View className="flex-row items-center space-x-2 pb-3">
            <TouchableOpacity
              onPress={removeItemFromBasket}
              disabled={!basketItems.length}
            >
              <MinusCircleIcon
                size={40}
                opacity={0.4}
                color={basketItems.length ? "#00CCBB" : "gray"}
              />
            </TouchableOpacity>
            <Text>{basketItems.length}</Text>
            <TouchableOpacity onPress={addItemToBasket}>
              <PlusCircleIcon size={40} opacity={0.4} color={"#00CCBB"} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
