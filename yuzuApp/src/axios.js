import axios from "axios";
import { logPushNotificationOpenAsync } from "expo-facebook";

const api = axios.create({
  //baseURL: "http://4f54-105-154-109-13.ngrok.io",
  baseURL: "https://backend-yuzi.herokuapp.com/",
});

const getAllRecipes = async (item) => {
  //randomize data of array
  const shuffleArray = () => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };
  // let url = "?";
  // item.map((item) => {
  //   url = url + `${item.categorie}=${item.value}&`;
  // });
  // let data;
  try {
    const res = await api.get(`/recipes`);
    data = res.data;
    shuffleArray(data);
  } catch (e) {
    console.log("ERROR", e);
  }
  return data;
};

const getRecipe = async (_id) => {
  try {
    const res = await api.get(`/recipes/${_id}`);
    data = res.data;
    console.log("DAAANAAA", data);
  } catch (e) {
    console.log("ERROR", e);
  }
  return data[0];
};
export { getAllRecipes, getRecipe, api };
