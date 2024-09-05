<template>
  <header class="app-header">
    <nav class="nav">
      <router-link to="/" class="nav-link">Главная</router-link>
      <router-link to="/convert" class="nav-link">Конвертация</router-link>
    </nav>
    <div class="currency-selector">
      <label for="base-currency" class="label">Основная валюта:</label>
      <div class="dropdown-container">
        <select
          id="base-currency"
          v-model="selectedCurrency"
          @change="onCurrencyChange"
          class="styled-select"
        >
          <option
            v-for="currency in currencies"
            :key="currency"
            :value="currency"
          >
            {{ currency }}
          </option>
        </select>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "AppHeader",
  setup() {
    const store = useStore();
    const currencies = ["USD", "EUR", "RUB"];

    const selectedCurrency = computed({
      get: () => store.state.baseCurrency,
      set: (value: string) => store.dispatch("changeBaseCurrency", value),
    });

    return {
      selectedCurrency,
      currencies,
    };
  },
});
</script>

<style scoped lang="scss">
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: linear-gradient(90deg, #000428, #004e92); // Градиентный фон
  color: #ffffff;

  .nav {
    display: flex;

    .nav-link {
      margin-right: 24px;
      color: #ffffff;
      font-size: 1.1em;
      font-weight: 500;
      text-decoration: none;
      padding-bottom: 8px;
      border-bottom: 2px solid transparent;
      transition: border-color 0.3s ease;

      &:hover {
        border-bottom: 2px solid #ffffff;
      }

      &.router-link-active {
        font-weight: bold;
        border-bottom: 2px solid #ffffff;
      }
    }
  }

  .currency-selector {
    display: flex;
    align-items: center;

    .label {
      margin-right: 8px;
      font-size: 1.1em;
      font-weight: 500;
    }

    .dropdown-container {
      position: relative;
      width: 160px;

      .styled-select {
        width: 100%;
        padding: 10px;
        font-size: 1.2rem;
        color: #000000;
        background: linear-gradient(45deg, #007bff, #00d2ff);
        border: 2px solid #00d2ff;
        border-radius: 12px;
        appearance: none;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
        transition: all 0.3s ease;
        cursor: pointer;

        &:hover {
          background: linear-gradient(45deg, #0056b3, #0099cc);
          border-color: #007bff;
        }

        &:focus {
          outline: none;
          box-shadow: 0px 0px 15px rgba(0, 218, 255, 0.7);
        }
      }

      .styled-select:before {
        content: "▼";
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 1rem;
        color: #ffffff;
        pointer-events: none;
      }
    }
  }
}
</style>
