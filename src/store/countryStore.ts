import { defineStore } from 'pinia';
import axios from 'axios';

export const useCountryStore = defineStore('country', {
  state: () => ({ countries: [], country: [] }),
  getters: {
    getAllCountriesState: (state) => state.countries,
    getCountryByNameState: (state) => state.country,
  },
  actions: {
    async getAllCountries() {
      const allCountries = await axios.get(
        'https://restcountries.com/v3.1/all'
      );
      this.countries = allCountries.data;
    },
    async getCountryByName(name: string) {
      const country = await axios.get(
        `https://restcountries.com/v3.1/name/${name.toLocaleLowerCase()}`
      );
      this.country = country.data;
    },
  },
});
