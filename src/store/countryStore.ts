import { defineStore } from 'pinia';
import axios from 'axios';

export const useCountryStore = defineStore('country', {
  state: () => ({ countries: [] }),
  getters: {
    getAllCountriesState: (state) => state.countries,
  },
  actions: {
    async getAllCountries() {
      const allCountries = await axios.get(
        'https://restcountries.com/v3.1/all'
      );
      this.countries = allCountries.data;
      console.log(this.countries);
    },
  },
});
