import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";
import sanityClient from "../sanity";
import { SafeAreaView } from "react-native-safe-area-context";

const FeaturedRow = ({ title, description, id }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "featured" && _id == $id]{
      ...,
      restaurants[]->{
      ...,
      dishes[] ->,
        category -> {
          name
        }  
       }
    }[0]`,
        { id }
      )
      .then((result) => {
        setRestaurants(result?.restaurants);
      });
  }, []);

  return (
    <View className="my-2">
      <View className="flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon size={20} color="#00ccbb" />
      </View>
      <Text className="text-xs text-gray-500 px-4"> {description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {/*Restaruant Cards*/}
        {restaurants?.map((restaurant) => (
          <RestaurantCard
            id={restaurant._id}
            key={restaurant._id}
            imgUrl={restaurant?.image}
            title={restaurant.name}
            rating={restaurant.rating}
            genre={restaurant?.category?.name || ""}
            address={restaurant.address}
            short_description={restaurant?.short_description || ""}
            dishes={restaurant.dishes || []}
            long={restaurant.long}
            lat={restaurant.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
