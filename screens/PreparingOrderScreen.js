import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";

const PreparingOrderScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 5000);
  }, []);

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-[#00ccbb]">
      <Animatable.Image
        source={require("../assets/order-confirm.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-96 w-96"
      ></Animatable.Image>

      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-lg my-10 text-white font-bold text-center"
      >
        Waiting for Restaruant to accept your order!
      </Animatable.Text>

      <Progress.Circle
        size={60}
        indeterminate={true}
        color="white"
      ></Progress.Circle>
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
