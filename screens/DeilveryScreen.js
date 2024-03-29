import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import { XMarkIcon } from "react-native-heroicons/solid";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";
import { PhoneIcon } from "react-native-heroicons/solid";

const DeilveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);

  return (
    <View className="bg-[#00ccbb] flex-1">
      <SafeAreaView className="z-50">
        <View className="flex-row justify-between items-start p-5">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XMarkIcon color={"white"} size={30} />
          </TouchableOpacity>
          <Text className="text-white font-light text-lg">Order Help</Text>
        </View>

        <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-lg text-gray-400 ">Estimated Arrival</Text>
              <Text className="text-4xl font-bold">45-55 minutes</Text>
            </View>
            <Image
              source={{ uri: "https://links.papareact.com/fls" }}
              className="h-20 w-20"
            />
          </View>

          <Progress.Bar
            size={30}
            color="#00ccbb"
            indeterminate={true}
          ></Progress.Bar>

          <Text className="mt-3 text-gray-500">
            Your order at {restaurant.title} is being prepared.
          </Text>
        </View>
      </SafeAreaView>
      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        mapType="standard"
        className="flex-1 -mt-10 z-0 "
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier="origin"
          pinColor="#00ccbb"
        />
      </MapView>
      <SafeAreaView className="bg-white flex-row items-center space-x-5 h-28">
        <Image
          source={{
            uri: "https://s3.amazonaws.com/media.thecrimson.com/photos/2014/11/07/202918_1301040.jpg",
          }}
          className="h-12 w-12 rounded-full bg-gray-300 p-4 ml-5"
        />

        <View className="flex-1">
          <Text className="text-lg">John Wick</Text>
          <Text className="text-gray-400">Your rider</Text>
        </View>
        <TouchableOpacity className="mr-5">
          <PhoneIcon size={30} color={"#00ccbb"} opacity={0.6} />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default DeilveryScreen;
