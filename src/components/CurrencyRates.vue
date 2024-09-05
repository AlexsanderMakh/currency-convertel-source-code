<template>
  <div>
    <ul class="currency-list">
      <li
        v-for="(rate, currency) in formattedRates"
        :key="currency"
        class="currency-card"
      >
        <span class="currency-name">{{ currency }}</span>
        <span class="currency-rate">
          1 {{ baseCurrency }} = {{ rate.toFixed(2) }} {{ currency }}
        </span>
        <span
          class="currency-change"
          :class="getChangeClass(rateChange[currency])"
        >
          {{ rateChange[currency] > 0 ? "▲" : "▼" }}
          {{ Math.abs(rateChange[currency]).toFixed(4) }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "CurrencyRates",
  setup() {
    const store = useStore();
    const rates = computed(() => store.state.rates);
    const baseCurrency = computed(() => store.state.baseCurrency);

    const formattedRates = computed(() => {
      const rateEntries = Object.entries(rates.value);
      const formatted: Record<string, number> = {};
      rateEntries.forEach(([key, value]) => {
        const [from, to] = key.split("-");
        if (from === baseCurrency.value.toLowerCase()) {
          formatted[to.toUpperCase()] = value as number; // Приведение типа value к числу
        }
      });
      return formatted;
    });

    const rateChange = computed(() => {
      const change: Record<string, number> = {};
      Object.keys(formattedRates.value).forEach((currency) => {
        change[currency] = Math.random() * 0.02 - 0.01;
      });
      return change;
    });

    const getChangeClass = (change: number) => {
      return change > 0 ? "rate-up" : "rate-down";
    };

    onMounted(() => {
      store.dispatch("fetchRates");
    });

    return {
      formattedRates,
      baseCurrency,
      rateChange,
      getChangeClass,
    };
  },
});
</script>

<style scoped lang="scss">
.currency-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.currency-card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding: 16px;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.currency-name {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 8px;
}

.currency-rate {
  font-size: 16px;
  color: #2c3e50;
}

.currency-change {
  margin-top: 8px;
  font-size: 14px;
}

.rate-up {
  color: #27ae60;
}

.rate-down {
  color: #e74c3c;
}
</style>
