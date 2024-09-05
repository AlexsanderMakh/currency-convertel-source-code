import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    rates: {} as Record<string, number>,
    baseCurrency: "RUB",
  },
  mutations: {
    setRates(state, rates) {
      state.rates = rates;
    },
    setBaseCurrency(state, currency) {
      state.baseCurrency = currency;
    },
  },
  actions: {
    async fetchRates({ commit }) {
      try {
        const response = await axios.get(
          "https://status.neuralgeneration.com/api/currency"
        );
        commit("setRates", response.data);
      } catch (error) {
        console.error("Failed to fetch rates:", error);
      }
    },
    changeBaseCurrency({ commit, dispatch }, currency) {
      commit("setBaseCurrency", currency);
      dispatch("fetchRates");
    },
  },
  getters: {
    rates: (state) => state.rates,
    baseCurrency: (state) => state.baseCurrency,
  },
});
