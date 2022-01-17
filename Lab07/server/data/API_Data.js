const axios = require("axios");

const exportedMethods = {
  async getAllPokemon(pageNum) {
    const responseData = [];
    const limit = 20;
    let offset = (pageNum - 1) * limit;
    try {
      let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/`, {
        params: {
          limit: limit,
          offset: offset,
        },
      });

      for (let i = 0; i < response.data.results.length; i++) {
        const tempUrl = response.data.results[i].url;
        console.log(tempUrl.split("/")[`${tempUrl.split("/").length - 2}`]);
        const tempId = tempUrl.split("/")[`${tempUrl.split("/").length - 2}`];
        const tempImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${tempId}.png`;

        const temp = {
          id: tempId,
          name: response.data.results[i].name,
          img: tempImg,
          url: tempUrl,
        };
        responseData.push(temp);
      }

      const modifiedResponseData = {
        totalCount: response.data.count,
        pokeData: responseData,
      };
      return modifiedResponseData;
    } catch (error) {
      console.error(error);
    }
  },
  async getPokemon(pokeId) {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokeId}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
};

module.exports = exportedMethods;
