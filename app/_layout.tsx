import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import React from "react";
import { StatusBar } from "react-native";


const RootLayout = () => {
  return (
    <SQLiteProvider databaseName="recipe.db">

        <StatusBar barStyle={"light-content"} />
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
        </Stack>

    </SQLiteProvider>
  );
};

export default RootLayout;

// 修正が必要な箇所は、recipePage 関数内の以下の部分です。
// <Text>id:{data.id}</Text>
// Use code with caution.
// JavaScript
// このコードは、data 配列の最初の要素の id を表示しようとしていますが、useLocalSearchParams で取得した id を表示する必要があります。
// 修正後のコードは以下のようになります。
// import { useLocalSearchParams } from "expo-router";
// import React from "react";
// import { Text, View } from "react-native";

// function recipePage() {
//   const { id } = useLocalSearchParams();

//   // `data` 配列から `id` に対応するレシピデータを取得
//   const recipe = data.find(item => item.id === parseInt(id));

//   return (
//     <View>
//       <Text>recipePage</Text>
//       {/* `recipe` が存在する場合のみ表示 */}
//       {recipe && (
//         <View>
//           <Text>id: {recipe.id}</Text>
//           <Text>grindSize: {recipe.grindSize}</Text>
//           {/* その他のレシピ情報を表示 */}
//         </View>
//       )}
//     </View>
//   );
// }

// const data = [
//   // ... (レシピデータ)
// ];

// export default recipePage;
// Use code with caution.
// JavaScript
// 修正内容
// useLocalSearchParams で取得した id は文字列型なので、parseInt() を使って数値型に変換します。
// data 配列から id に対応するレシピデータを取得するために、find() メソッドを使用します。
// recipe が存在する場合のみ、レシピ情報を表示します。
// これで、recipePage 関数は、expo-router から渡された id に対応するレシピデータを表示するようになります。
