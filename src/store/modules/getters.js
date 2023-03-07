export default {
    news(state){
        return state.newsArr.filter(item => item.title.toLowerCase().indexOf(state.searchParam.toLowerCase()) > -1);
    },
    countries(state){
        return state.countriesNamesArr;
    },
    categories(state){
        return state.categoriesArr;
    },
    mainNews(state){
        return state.mainNews;
    },
    pages(state){
        return Math.ceil(state.totalResult / 10);
    },
    isError(state){
        return state.isError;
    }
}