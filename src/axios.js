import axios from "axios";
import { HEROKU_API_URL } from "./consts/env";

const api = axios.create({
  // baseURL: "https://yuzustagingapi.herokuapp.com/",
  baseURL: "172.20.11.153:3000/",
});

const getAllRecipes = async (item) => {
  //randomize data of array
  const shuffleArray = (array) => {
    for (let i = array?.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };
  let url = "?";

  item.map((i) => {
    url = url + `${Object.keys(i)}=${Object.values(i)}&`;
  });

  try {
    const res = await api.get(`/recipes${url}`);
    const data = res.data.filter(
      (item) =>
        item.imgURL !== null &&
        item.thumbURL !== null &&
        item.nbrPersonne !== null
    );

    shuffleArray(data);
    return data;
  } catch (e) {
    console.log("ERROR", e);
  }
};

const getRecipeByName = async (name) => {
  try {
    const { data } = await api.get(`/recipes/byName/${name}`);

    return data;
  } catch (e) {
    console.error(e);
  }
};

const getRecipe = async (_id) => {
  try {
    const res = await api.get(`/recipes/${_id}`);

    return res.data;
  } catch (e) {
    console.log("ERROR", e);
  }
};
const incrementRight = async (_id) => {
  try {
    await api.patch("/recipes/incrementRight", { _id });
  } catch (e) {
    console.log("ERROR, Not Incremented", e);
  }
};
const incrementLeft = async (_id) => {
  try {
    await api.patch("/recipes/incrementLeft", { _id });
  } catch (e) {
    console.log("ERROR, Not Incremented", e);
  }
};
const setRating = async ({ _id, rating }) => {
  try {
    await api.post("/recipes/ratings", { _id, rating });
    console.log("done");
  } catch (e) {
    throw new Error("Error updating");
  }
};
export {
  getAllRecipes,
  getRecipe,
  api,
  incrementRight,
  incrementLeft,
  setRating,
  getRecipeByName,
};
