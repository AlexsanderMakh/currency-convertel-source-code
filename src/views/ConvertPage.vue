<template>
  <div class="phone-container">
    <div class="screen">
      <h1>Конвертация валют</h1>
      <div class="conversion-display">
        <CurrencyDropdown v-model="currencyFrom" />
        <input
          type="number"
          v-model.number="amountFrom"
          @input="handleAmountFromChange"
          :style="{ fontSize: getFontSize(amountFrom) }"
          placeholder="0"
          class="amount-input"
          @focus="currentInput = 'from'"
        />
        <span>=</span>
        <CurrencyDropdown v-model="currencyTo" />
        <input
          type="number"
          v-model.number="amountTo"
          @input="handleAmountToChange"
          :style="{ fontSize: getFontSize(amountTo) }"
          placeholder="0"
          class="amount-input"
          @focus="currentInput = 'to'"
        />
      </div>
    </div>
    <div class="keypad">
      <button
        v-for="number in numbers"
        :key="number"
        @click="appendNumber(number)"
      >
        {{ number }}
      </button>
      <button @click="clearInput">C</button>
      <button @click="backspace">⌫</button>
      <button @click="switchCurrencies">⇆</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import CurrencyDropdown from "@/components/CurrencyDropdown.vue";
import axios from "axios";

export default defineComponent({
  name: "ConvertPage",
  components: { CurrencyDropdown },
  setup() {
    const currencyFrom = ref("RUB");
    const currencyTo = ref("USD");
    const amountFrom = ref<number | null>(null);
    const amountTo = ref<number | null>(null);
    const rates = ref<{ [key: string]: number }>({});
    const currentInput = ref<"from" | "to">("from");

    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];

    const fetchRates = async () => {
      try {
        const response = await axios.get(
          "https://status.neuralgeneration.com/api/currency"
        );
        if (response.data) {
          rates.value = response.data;
          convert();
        }
      } catch (error) {
        console.error("Error fetching rates:", error);
      }
    };

    const convert = () => {
      if (amountFrom.value === null || !currencyFrom.value || !currencyTo.value)
        return;
      const rateKey = `${currencyFrom.value.toLowerCase()}-${currencyTo.value.toLowerCase()}`;
      const rate = rates.value[rateKey];
      if (rate) {
        amountTo.value = parseFloat((amountFrom.value * rate).toFixed(2));
      }
    };

    const handleAmountFromChange = () => {
      if (currentInput.value === "from" && amountFrom.value !== null) {
        convert();
      }
    };

    const handleAmountToChange = () => {
      if (currentInput.value === "to" && amountTo.value !== null) {
        const rateKey = `${currencyTo.value.toLowerCase()}-${currencyFrom.value.toLowerCase()}`;
        const rate = rates.value[rateKey];
        if (rate && amountTo.value !== null) {
          amountFrom.value = parseFloat((amountTo.value / rate).toFixed(2));
        } else {
          amountFrom.value = null;
        }
      }
    };

    watch(amountFrom, () => {
      if (currentInput.value === "from") {
        convert();
      }
    });

    watch(amountTo, () => {
      if (currentInput.value === "to") {
        handleAmountToChange();
      }
    });

    const getFontSize = (amount: number | null) => {
      if (amount === null) return "2rem";
      const length = amount.toString().length;
      return length > 10
        ? `${Math.max(2 - (length - 10) * 0.1, 1.2)}rem`
        : "2rem";
    };

    const appendNumber = (number: string) => {
      const inputField = currentInput.value === "from" ? amountFrom : amountTo;
      if (inputField.value === null) {
        inputField.value = parseFloat(number);
      } else {
        inputField.value = parseFloat(`${inputField.value}${number}`);
      }
      currentInput.value === "from"
        ? handleAmountFromChange()
        : handleAmountToChange();
    };

    const clearInput = () => {
      const inputField = currentInput.value === "from" ? amountFrom : amountTo;
      inputField.value = null;
      currentInput.value === "from"
        ? (amountTo.value = null)
        : (amountFrom.value = null);
    };

    const backspace = () => {
      const inputField = currentInput.value === "from" ? amountFrom : amountTo;
      if (inputField.value) {
        inputField.value =
          parseFloat(inputField.value.toString().slice(0, -1)) || null;
        currentInput.value === "from"
          ? handleAmountFromChange()
          : handleAmountToChange();
      }
    };

    const switchCurrencies = () => {
      [currencyFrom.value, currencyTo.value] = [
        currencyTo.value,
        currencyFrom.value,
      ];
      convert();
    };

    fetchRates();

    return {
      currencyFrom,
      currencyTo,
      amountFrom,
      amountTo,
      numbers,
      appendNumber,
      clearInput,
      backspace,
      switchCurrencies,
      getFontSize,
    };
  },
});
</script>

<style scoped lang="scss">
.phone-container {
  width: 480px;
  margin: 0 auto;
  border-radius: 30px;
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.3);
  background: linear-gradient(145deg, #0f0c29, #302b63, #24243e);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
}

h1 {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.screen {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: inset 0px 5px 10px rgba(0, 0, 0, 0.5);
}

.conversion-display {
  display: flex;
  align-items: center;
  gap: 10px;
}

.amount-input {
  width: 130px;
  padding: 10px;
  font-size: 2rem;
  text-align: right;
  border: none;
  border-bottom: 2px solid #ddd;
  background: transparent;
  color: #ffffff;
  outline: none;
  -moz-appearance: textfield;
}
.amount-input::-webkit-outer-spin-button,
.amount-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.keypad {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

button {
  width: 60px;
  height: 60px;
  font-size: 1.5rem;
  border-radius: 50%;
  border: none;
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: rgba(255, 255, 255, 0.3);
}
</style>
