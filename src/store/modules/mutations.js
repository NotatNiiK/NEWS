export default {
    setNewsArr(state, newsArr){
      state.newsArr = newsArr;
    },
    searchNews(state, param){
      state.searchParam = param;
    },
    changeNewsCountry(state, country ){
      state.countryName = country;
    },
    changeNewsCategory(state, category) {
      state.categoryName = category;
    },
    setTotalResult(state, totalResult) {
        state.totalResult = totalResult;
    },
    changePage(state, n){
      state.page = n;
    },
    setMainNews(state, news) {
      state.mainNews = news;
    },
    setErrorMessage(state, value){
      state.isError = value;
    }
}