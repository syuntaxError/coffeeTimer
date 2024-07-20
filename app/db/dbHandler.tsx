import * as SQLite from "expo-sqlite";
import recipeList from "../(BrewingMethods)/recipeList";

export const setUpRecipe = async (db) => {
  await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS recipeList (
        id INTEGER PRIMARY KEY NOT NULL,
        method TEXT,
        dripper TEXT,
        grindSize TEXT,
        mesh INTEGER,
        beanWeight INTEGER,
        waterAmount INTEGER,
        waterTemperature INTEGER,
        howToMethod TEXT
      )
    `);
};

export const getRecipe = async (db) => {
  const allRows = await db.getAllAsync(`SELECT* FROM recipeList`);
  return allRows;
};

export const getRecipeById = async (db, id) => {
  const row = await db.getAllAsync(`SELECT* FROM recipeList WHERE id = ? `, id);
  return row;
};

export const insertRecipe = async (db, object) => {
  const statement = await db.prepareAsync(
    `INSERT INTO recipeList (
        method,
        dripper,
        grindSize,
        mesh,
        beanWeight,
        waterAmount,
        waterTemperature,
        howToMethod
    ) VALUES (
        $method,
        $dripper,$grindSize,
        $mesh,
        $beanWeight,
        $waterAmount,
        $waterTemperature,
        $howToMethod
     )`
  );
  try {
    //SQLiteに格納するため文字列に変換
    const howToMethodJSON = JSON.stringify(object.howToMethod);

    await statement.executeAsync({
      $method: object.method,
      $dripper: object.dripper,
      $grindSize: object.grindSize,
      $mesh: object.mesh,
      $beanWeight: object.beanWeight,
      $waterAmount: object.waterAmount,
      $waterTemperature: object.waterTemperature,
      $howToMethod: howToMethodJSON,
    });
    console.log("insert sacsess!");
  } catch {
    console.log("error");
  } finally {
    await statement.finalizeAsync();
    console.log("finalizeAsync ok");
  }
};

//選択したものを変更できるよう改善が必要。今はmethodだけを狙ってる
export const updateRecipe = async (db, recipeId, newName) => {
  await db.runAsync(
    `UPDATE recipeList SET method = ? WHERE id = ?;`,
    newName,
    recipeId
  );
};

export const deleteRecipe = async (db) => {
  await db.runAsync(`
      DELETE FROM recipeList`);
};

export const checkTable = async (db, tableName) => {
  await db.runAsync(`
    PRAGMA table_info(${tableName});`);
};
