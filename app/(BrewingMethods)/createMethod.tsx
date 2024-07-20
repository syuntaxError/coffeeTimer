import { router } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useState } from "react";
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { getRecipe, insertRecipe } from "../db/dbHandler";
import { Picker } from "@react-native-picker/picker";
import { ThemedText } from "../../components/ThemedText";

function createMethod() {
  const db = useSQLiteContext();
  const [method, onChangeMethod] = useState("");
  const [selectedDripper, setSelectedDripper] = useState("");
  const [beanWeight, onChangeBeanWeight] = useState("");
  const [selectedGrindSize, setSelectedGrindSize] = useState();
  const [mesh, onChangeMesh] = useState("");
  const [waterAmount, onChangeWaterAmount] = useState("");
  const [waterTemperature, onChangeWaterTemperature] = useState("");
  const [howToMethod, onChangeHowToMethod] = useState("");

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* <ThemedText>createMethod</ThemedText> */}

        <View>
          <ThemedText style={styles.ThemedText}>
            このメソッドの名前はなんですか？:
          </ThemedText>
          <TextInput
            style={styles.input}
            onChangeText={onChangeMethod}
            value={method}
            placeholder="ここに入力してください"
          />
        </View>

        <View style={styles.pickerContainer}>
          <ThemedText style={styles.ThemedText}>
            どこのドリッパーを使用していますか？
          </ThemedText>
          <Picker
            selectedValue={selectedDripper}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedDripper(itemValue)
            }
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            {drippers.map((dripper) => (
              <Picker.Item key={dripper} label={dripper} value={dripper} />
            ))}
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <ThemedText style={styles.ThemedText}>
            コーヒー豆の挽き目は？:
          </ThemedText>
          <Picker
            selectedValue={selectedGrindSize}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedGrindSize(itemValue)
            }
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            {grindSizes.map((grindSize) => (
              <Picker.Item
                key={grindSize}
                label={grindSize}
                value={grindSize}
              />
            ))}
          </Picker>
        </View>

        <View>
          <ThemedText style={styles.ThemedText}>挽き目の数値は？</ThemedText>
          <TextInput
            style={styles.input}
            onChangeText={onChangeMesh}
            value={mesh}
            placeholder="useless placeholder"
            keyboardType="numeric"
          />
        </View>

        <View>
          <ThemedText style={styles.ThemedText}>コーヒー豆の量は？</ThemedText>
          <TextInput
            style={styles.input}
            onChangeText={onChangeBeanWeight}
            value={beanWeight}
            placeholder="useless placeholder"
            keyboardType="numeric"
          />
        </View>

        <View>
          <ThemedText style={styles.ThemedText}>
            使用するお湯の量は？
          </ThemedText>
          <TextInput
            style={styles.input}
            onChangeText={onChangeWaterAmount}
            value={waterAmount}
            placeholder="useless placeholder"
            keyboardType="numeric"
          />
        </View>

        <View>
          <ThemedText style={styles.ThemedText}>お湯の温度は？</ThemedText>
          <TextInput
            style={styles.input}
            onChangeText={onChangeWaterTemperature}
            value={waterTemperature}
            placeholder="useless placeholder"
            keyboardType="numeric"
          />
        </View>

        <View>
          <ThemedText style={styles.ThemedText}>
            抽出の手順を入力してください
          </ThemedText>
          <TextInput
            style={styles.input}
            onChangeText={onChangeHowToMethod}
            value={howToMethod}
            placeholder="useless placeholder"
          />
        </View>

        <TouchableOpacity
          onPress={async () => {
            const newRecipe = {
              method: method,
              dripper: selectedDripper,
              beanWeight: beanWeight,
              grindSize: selectedGrindSize,
              mesh: mesh,
              waterAmount: waterAmount,
              waterTemperature: waterTemperature,
              howToMethod: JSON.stringify(howToMethod),
            };
            await insertRecipe(db, newRecipe);
            const newData = await getRecipe(db);
            console.log(newData);
            router.replace("/");
          }}
        >
          <ThemedText style={styles.submit}>submit</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const drippers = [
  "hario V60",
  "karita wave",
  "hario Switch Dripper",
  "水出しコーヒー",
  "その他",
];

const grindSizes = [
  "細挽き",
  "中細挽き",
  "中挽き",
  "中粗挽き",
  "粗挽き",
  "その他",
];

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#171717",
    height: "100%",
  },
  contentContainer: {
    margin: 10,
    alignItems: "center",
  },

  ThemedText: {
    color: "white",
    marginTop: 20,
  },
  input: {
    height: 40,
    width: 350,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    color: "white",
  },

  pickerContainer: {
    width: 350,
  },
  picker: {},

  pickerItem: {
    height: 130,
    color: "white",
  },
  submit: {
    marginTop: 30,
    fontSize: 24,
    color: "gray",
  },
});

export default createMethod;
