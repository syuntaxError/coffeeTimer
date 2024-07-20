import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { router } from "expo-router";
import {
  deleteRecipe,
  getRecipe,
  insertRecipe,
  setUpRecipe,
} from "./db/dbHandler";
import { ThemedText } from "../components/ThemedText";
import { Image } from "expo-image";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { FontAwesome6 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import TestButton from "../components/TestButton";

export default HomeScreen = () => {
  return (
    <SafeAreaView style={styles.main}>
      <ScrollView style={styles.rap}>
        <BrewingMethods />
        <TastingNote />
        <BeansList />
      </ScrollView>
    </SafeAreaView>
  );
};

export function BrewingMethods() {
  const [selectedId, setSelectedId] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const db = useSQLiteContext();

  useEffect(() => {
    const initializeRecipes = async () => {
      await setUpRecipe(db);
      const readingRecipes = await getRecipe(db);
      setRecipes(readingRecipes);
    };

    initializeRecipes();
  }, []);

  const sampleData = {
    beanWeight: 25,
    dripper: "ハリオ V60",
    grindSize: "中細挽き",
    howToMethod: [
      { start: 0, end: 30, action: "蒸らし" },
      { start: 30, end: 120, action: "1投目" },
      { start: 120, end: 240, action: "2投目" },
      { start: 240, end: 300, action: "3投目" },
    ],
    id: 2,
    mesh: 24,
    method: "ドリップ",
    waterAmount: 360,
    waterTemperature: 95,
  };

  return (
    <SafeAreaView>
      <TestButton
        title="insertRecipeボタン"
        onPress={() => {
          insertRecipe(db, sampleData);
        }}
      />
      <TestButton
        title="deleteRecipeボタン"
        onPress={() => {
          deleteRecipe(db);
        }}
      />

      <View style={styles.titleContainer}>
        <ThemedText style={styles.title}>抽出メソッド</ThemedText>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => {
                router.push("/createMethod");
              }}
            >
              <FontAwesome6 name="plus" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => {
                router.push("/recipeList");
              }}
            >
              <FontAwesome6 name="list-ul" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.panelContainer}>
        <FlatList
          data={recipes}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          extraData={selectedId}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedId(item.id);
                router.push({
                  pathname: "/(recipeDetail)/[id]",
                  params: { id: item.id },
                });
              }}
            >
              <View style={styles.panel}>
                <View style={styles.panel_upperSection}>
                  <ThemedText>{item.method}</ThemedText>
                </View>
                <View style={styles.panel_middleSection}>
                  <Image
                    style={styles.image}
                    source={require("./assets/image/harioV60.jpeg")}
                    contentFit="cover"
                  />
                </View>
                <View style={styles.panel_bottomSection}>
                  <View style={styles.bottomSection_upperGroup}>
                    <ThemedText>
                      <FontAwesome5 name="coffee" size={14} color="white" />
                      {item.waterAmount}ml
                    </ThemedText>
                    <ThemedText>
                      <FontAwesome6
                        name="temperature-half"
                        size={14}
                        color="white"
                      />
                      {item.waterTemperature}℃
                    </ThemedText>
                  </View>
                  <View style={styles.bottomSection_lowerGroup}>
                    <View style={styles.lowerGroup_grindGroupe}>
                      <Octicons name="package" size={14} color="white" />
                      <ThemedText>{item.grindSize}</ThemedText>
                      <ThemedText>{item.mesh}クリック</ThemedText>
                    </View>
                    <ThemedText>
                      <MaterialIcons name="scale" size={14} color="white" />
                      {item.beanWeight}g
                    </ThemedText>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

export function TastingNote() {
  return (
    <View>
      <View>
        <ThemedText>テイスティングノート</ThemedText>
      </View>
      <View>
        <ThemedText>+</ThemedText>
        <ThemedText>=リスト</ThemedText>
      </View>
      <View style={styles.stepContainer}>
        <ThemedText>横にスライドするListが入る。レーダーチャート</ThemedText>
      </View>
    </View>
  );
}

export function BeansList() {
  return (
    <View>
      <View>
        <ThemedText>コーヒー豆管理</ThemedText>
      </View>
      <View>
        <ThemedText>+</ThemedText>
        <ThemedText>=リスト</ThemedText>
      </View>
      <View style={styles.stepContainer}>
        <ThemedText>横にスライドするListが入る。コーヒー豆</ThemedText>
      </View>
    </View>
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
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 16,
  },
  button: {
    marginLeft: 30,
  },

  panelContainer: {
    alignItems: "center",
  },

  panel: {
    position: "relative",
    backgroundColor: "#433333",
    width: 350,
    height: 200,
    margin: 10,
    borderRadius: 8,
  },
  panel_upperSection: { margin: 10 },

  panel_middleSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  image: { width: 120, height: 120 },

  panel_bottomSection: {
    position: "absolute",
    bottom: 0,
    flexDirection: "column",
  },
  bottomSection_upperGroup: {
    width: "100%",
    paddingRight: 20,
    paddingLeft: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomSection_lowerGroup: {
    width: "100%",
    paddingRight: 20,
    paddingLeft: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  lowerGroup_grindGroupe: {
    flexDirection: "row",
  },
});

const dummyRecipes = {
  method: "ペーパードリップ",
  dripper: "ハリオ V60",
  grindSize: "中挽き",
  mesh: 18,
  beanWeight: 20,
  waterAmount: 300,
  waterTemperature: 92,
  hotToMethod: "ドリップポット",
};
