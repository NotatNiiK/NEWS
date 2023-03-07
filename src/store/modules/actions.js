export default {
    async getNewsArr({commit, state}){
        try{
          const url = `
            https://newsapi.org/v2/top-headlines?country=${state.countryName}&category=${state.categoryName}&page=${state.page}&pageSize=10&apiKey=22b307ea64594462a9093d15d2e188c8
          `;
          const request = (await fetch(url)).json();
          const result = await request;
          commit('setTotalResult', result.totalResults);
          const finalResult = await result.articles;
          commit('setMainNews', finalResult[0]);
          commit('setNewsArr', finalResult);
        }
        catch(e){
          commit('setErrorMessage', true);
        }
    }
}

