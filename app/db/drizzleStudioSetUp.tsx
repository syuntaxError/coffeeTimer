import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import * as SQLite from "expo-sqlite";
import { View } from "react-native";

const db = SQLite.openDatabaseSync("recipe.db");

export default function App() {
  useDrizzleStudio(db);

  return <View></View>;
}
