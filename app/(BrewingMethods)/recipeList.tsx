import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native";
import { deleteRecipe, getRecipe } from "../db/dbHandler";
import { ThemedText } from "../../components/ThemedText";
import AppleStyleSwipeableRow from "../../components/AppleStyleSwipableRow";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function recipeList() {
  const db = useSQLiteContext();
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    const initializeRecipes = async () => {
      const readingRecipes = await getRecipe(db);
      setRecipes(readingRecipes);
    };

    initializeRecipes();
  }, [db, recipes]);

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.main}>
        <View style={styles.rap}>
          <ThemedText>recipeList</ThemedText>
          <FlatList
            data={recipes}
            renderItem={({ item }) => (
              <AppleStyleSwipeableRow
                onDelete={() => {
                  console.log("はろー");
                }}
              >
                <View style={styles.list}>
                  <ThemedText>メソッド: {item.method}</ThemedText>
                  <ThemedText>grindSize: {item.waterAmount}</ThemedText>
                  <ThemedText>beanWeight: {item.waterTemperature}</ThemedText>
                  <ThemedText>{item.grindSize}</ThemedText>
                  <ThemedText>{item.mesh}</ThemedText>
                  <ThemedText>{item.beanWeight}</ThemedText>
                </View>
              </AppleStyleSwipeableRow>
            )}
          />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#171717",
    height: "100%",
  },
  rap: {
    margin: 10,
  },
  list: {
    marginBottom: 20,
  },
});

export default recipeList;
