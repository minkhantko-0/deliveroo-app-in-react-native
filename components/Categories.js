import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import sanityClient from "../sanity";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "category"]`)
      .then((res) => setCategories(res));
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {/*CategoryCard*/}
      {categories.map((category) => (
        <CategoryCard
          key={category._id}
          imgUrl={category.image}
          id={category._id}
          title={category.name}
        />
      ))}
    </ScrollView>
  );
};

export default Categories;
