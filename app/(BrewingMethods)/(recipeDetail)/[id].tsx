import { getRecipeById, insertRecipe } from "../../db/dbHandler";
import { useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ThemedText } from "../../../components/ThemedText";
import TestButton from "../../../components/TestButton";
import { parse } from "@babel/core";

export default function RecipePage() {
  return <RecipePageBody />;
}

function RecipePageBody() {
  const { id } = useLocalSearchParams();
  const selectedId = typeof id === "string" ? parseInt(id, 10) : undefined; //文字列で受け取るので10進数へ型変更

  const db = useSQLiteContext();
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    const fetchRecipe = async () => {
      const recipeData = await getRecipeById(db, selectedId);
      setRecipe(recipeData[0]);
    };

    fetchRecipe();
  }, [selectedId]);

  // const sampleJSON = [{ action: "お湯を注ぐ", end: 10, start: 0 }];
  // const stringfyJSON = JSON.stringify(sampleJSON);
  // console.log(sampleJSON[0]);
  // //console.log(stringfyJSON[0]);
  // //  console.log(sampleJSON.map((step) => step.start));
  // //console.log(recipe.howToMethod);
  // console.log(JSON.parse(recipe.howToMethod));
  return (
    <SafeAreaView style={styles.main}>
      <View>
        <ThemedText>recipePage</ThemedText>
        <View>
          <TestButton
            title="console.logテスト"
            onPress={() => {
              const parsedJSON = JSON.parse(recipe.howToMethod);
              parsedJSON.map((step) => {
                console.log(step.action);
                console.log(step.start);
                console.log(step.end);
              });
            }}
          />

          <ThemedText>メソッド:{recipe?.method}</ThemedText>
          <ThemedText>挽き目:{recipe?.grindSize}</ThemedText>
          <ThemedText>豆量(g):{recipe?.beanWeight}</ThemedText>
          <ThemedText>温度(℃):{recipe?.waterTemperature}</ThemedText>
          <ThemedText>湯量(g):{recipe?.waterAmount}</ThemedText>
          <ThemedText>
            {recipe?.howToMethod
              ? JSON.parse(recipe?.howToMethod).map((step, index) => (
                  <View key={index}>
                    <ThemedText>{step.action}</ThemedText>
                    <ThemedText>
                      {step.start},{step.end}
                    </ThemedText>
                  </View>
                ))
              : "読み込み中"}
          </ThemedText>
          {/* <ThemedText>レシピ:{steps}</ThemedText> */}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#171717",
    height: "100%",
  },
});
