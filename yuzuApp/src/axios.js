import axios from "axios";

const api = axios.create({
  // baseURL: "http://e85e-50-100-167-5.ngrok.io",
  baseURL: "https://backend-yuzi.herokuapp.com/",
});

const getAllRecipes = async (item) => {
  //randomize data of array
  const shuffleArray = (array) => {
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
    data = res.data.filter((item) => item.imgURL != null);
  } catch (e) {
    console.log("ERROR", e);
  }
  shuffleArray(data);

  return data;
};

const getRecipe = async (_id) => {
  try {
    const res = await api.get(`/recipes/${_id}`);
    data = res.data;
    console.log("DAATA", data);
  } catch (e) {
    console.log("ERROR", e);
  }
  return data[0];
};
const incrementRight = async (_id) => {
  try {
    console.log("IIIIIDD", _id);
    const res = await api.patch("/recipes/incrementRight", { _id });

    console.log("It incremented");
  } catch (e) {
    console.log("ERROR, Not Incremented", e);
  }
};
const incrementLeft = async (_id) => {
  try {
    console.log("lololoolo");
    await api.patch("/recipes/incrementLeft", { _id });

    console.log("It incremented");
  } catch (e) {
    console.log("ERROR, Not Incremented", e);
  }
};
export { getAllRecipes, getRecipe, api, incrementRight, incrementLeft };
