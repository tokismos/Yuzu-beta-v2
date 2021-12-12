import axios from "axios";

const api = axios.create({
  baseURL: " http://ae10-105-155-168-199.ngrok.io",
  // baseURL: "https://backend-yuzi.herokuapp.com/",
});

const getAllRecipes = async (item) => {
  //randomize data of array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };
  let url = "?";
  item.map((item) => {
    url = url + `${item.categorie}=${item.value}&`;
  });
  let data;
  try {
    const res = await api.get(`/recipes`);
    data = res.data;
    shuffleArray(data);
  } catch (e) {
    console.log("ERROR", e);
  }
  return data;
};

export { getAllRecipes, api };
