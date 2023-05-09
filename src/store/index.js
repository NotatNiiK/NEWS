import { createStore } from 'vuex';
import mutations from './modules/mutations';
import actions from './modules/actions';
import getters from './modules/getters';

export default createStore({
  state() {
    return {
      isError: false,
      newsArr: [],
      searchParam: '',
      pageSize: 10,
      page: 1,
      totalResult: null,
      mainNews: null,
      countryName: 'ua',
      categoryName: 'general',
      categoriesArr: [
        {title: 'Business', value: 'business'},
        {title: 'Entertainment', value: 'entertainment'},
        {title: 'General', value: 'general'},
        {title: 'Science', value: 'science'},
        {title: 'Sports', value: 'sports'},
        {title: 'Technology', value: 'technology'},
      ],
      countriesNamesArr: [
        {fullname: 'Australia', abrv: 'au'},
        {fullname: 'Austria', abrv: 'at'},
        {fullname: 'Belgium', abrv: 'be'},
        {fullname: 'Brazil', abrv: 'br'},
        {fullname: 'Canada', abrv: 'ca'},
        {fullname: 'China', abrv: 'cn'},
        {fullname: 'France', abrv: 'fr'},
        {fullname: 'Germany', abrv: 'de'},
        {fullname: 'Italy', abrv: 'it'},
        {fullname: 'Japan', abrv: 'jp'},
        {fullname: 'Latvia', abrv: 'lv'},
        {fullname: 'Turkey', abrv: 'tr'},
        {fullname: 'Ukraine', abrv: 'ua'},
        {fullname: 'United Kingdom', abrv: 'gb'},
        {fullname: 'United States', abrv: 'us'},
      ],
    }
  },
  getters: getters,
  mutations: mutations,
  actions: actions,
})
