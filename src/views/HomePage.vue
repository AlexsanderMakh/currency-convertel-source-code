<template>
  <div>
    <h1>Курсы валют относительно {{ selectedCurrency }}</h1>
    <CurrencyRates :baseCurrency="selectedCurrency" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from "vue";
import CurrencyRates from "@/components/CurrencyRates.vue";
import axios from "axios";

export default defineComponent({
  name: "HomePage",
  components: {
    CurrencyRates,
  },
  setup() {
    const selectedCurrency = ref("RUB"); // По умолчанию RUB
    const rates = ref<{ [key: string]: number }>({});

    const fetchRates = async (baseCurrency: string) => {
      try {
        const response = await axios.get(
          "https://status.neuralgeneration.com/api/currency"
        );
        if (response.data) {
          rates.value = response.data;
          console.log(`Rates fetched for ${baseCurrency}:`, rates.value);
        }
      } catch (error) {
        console.error("Error fetching rates:", error);
      }
    };

    watch(selectedCurrency, (newCurrency) => {
      fetchRates(newCurrency);
    });

    onMounted(() => {
      fetchRates(selectedCurrency.value);
    });

    return {
      selectedCurrency,
      rates,
    };
  },
});
</script>
<style scoped lang="scss">
.home-page {
	display: flex;
	justify-content: center;
	text-align: center;
	align-items: center;	
	padding: 24px;
	background: rgba(255, 255, 255, 0.1); // Полупрозрачный фон
	border-radius: 15px;
	box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
	margin: 20px;
	color: #ffffff;
}

h1 {
  margin-bottom: 16px;
  font-size: 2.2em;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.currency-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  padding: 16px;
  margin-bottom: 16px;
  color: #ffffff;
  transition: transform 0.3s;
}

.currency-card:hover {
  transform: scale(1.05);
}

.currency-card-header {
  font-size: 1.4em;
  font-weight: bold;
  color: #ffffff;
}

.currency-card-rate {
  font-size: 1.6em;
  font-weight: bold;
}

.currency-card-rate.positive {
  color: #00ff85;
}

.currency-card-rate.negative {
  color: #ff0057;
}
</style>
