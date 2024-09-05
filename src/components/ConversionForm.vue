<template>
  <div class="conversion-form">
    <div class="conversion-row">
      <CurrencyDropdown
        :value="currencyFrom"
        :currencies="currencies"
        @update:value="setCurrencyFrom"
      />
      <input
        type="number"
        v-model.number="amountFrom"
        @input="convert"
        placeholder="Amount"
      />
    </div>
    <div class="conversion-row">
      <CurrencyDropdown
        :value="currencyTo"
        :currencies="currencies"
        @update:value="setCurrencyTo"
      />
      <input
        type="number"
        v-model.number="amountTo"
        @input="convertReverse"
        placeholder="Amount"
        readonly
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import { useStore } from "vuex";
import CurrencyDropdown from "./CurrencyDropdown.vue";

export default defineComponent({
  name: "ConversionForm",
  components: {
    CurrencyDropdown,
  },
  setup() {
    const store = useStore();
    const currencies = ["USD", "EUR", "RUB"];

    const currencyFrom = ref("USD");
    const currencyTo = ref("EUR");
    const amountFrom = ref<number | null>(null);
    const amountTo = ref<number | null>(null);

    const rates = computed(() => store.state.rates);

    const convert = () => {
      if (amountFrom.value === null || isNaN(amountFrom.value)) {
        amountTo.value = null;
        return;
      }
      const rate =
        rates.value[currencyTo.value] / rates.value[currencyFrom.value];
      amountTo.value = parseFloat((amountFrom.value * rate).toFixed(2));
    };

    const convertReverse = () => {
      if (amountTo.value === null || isNaN(amountTo.value)) {
        amountFrom.value = null;
        return;
      }
      const rate =
        rates.value[currencyFrom.value] / rates.value[currencyTo.value];
      amountFrom.value = parseFloat((amountTo.value * rate).toFixed(2));
    };

    const setCurrencyFrom = (newCurrency: string) => {
      currencyFrom.value = newCurrency;
      convert();
    };

    const setCurrencyTo = (newCurrency: string) => {
      currencyTo.value = newCurrency;
      convertReverse();
    };

    watch([currencyFrom, currencyTo], () => {
      if (amountFrom.value !== null) {
        convert();
      } else if (amountTo.value !== null) {
        convertReverse();
      }
    });

    return {
      currencies,
      currencyFrom,
      currencyTo,
      amountFrom,
      amountTo,
      setCurrencyFrom,
      setCurrencyTo,
      convert,
      convertReverse,
    };
  },
});
</script>

<style scoped>
.conversion-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.conversion-row {
  display: flex;
  gap: 1rem;
}

input {
  flex: 2;
  padding: 0.5rem;
}
</style>
