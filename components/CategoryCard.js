import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { urlFor } from "../sanity";

const CategoryCard = ({ imgUrl, title, id }) => {
  return (
    <TouchableOpacity className="mr-3 relative">
      <Image
        source={{ uri: urlFor(imgUrl).url() }}
        className="h-20 w-20 rounded"
      />
      <Text className="absolute text-white shadow-lg font-bold bottom-1 left-1">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
