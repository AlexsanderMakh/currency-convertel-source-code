<template>
  <div class="dropdown-container">
    <select
      v-model="selectedCurrency"
      @change="updateValue"
      class="styled-select"
    >
      <option v-for="currency in currencies" :key="currency" :value="currency">
        {{ currency }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "CurrencyDropdown",
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const currencies = ref(["USD", "EUR", "RUB", "CAD"]);

    const selectedCurrency = ref(props.modelValue);

    watch(
      () => props.modelValue,
      (newVal) => {
        selectedCurrency.value = newVal;
      }
    );

    const updateValue = () => {
      emit("update:modelValue", selectedCurrency.value);
    };

    return {
      currencies,
      selectedCurrency,
      updateValue,
    };
  },
});
</script>

<style scoped lang="scss">
.dropdown-container {
  position: relative;
  width: 100%;
  max-width: 180px;
  margin: 0 auto;
}

.styled-select {
  width: 100%;
  padding: 10px;
  font-size: 1.2rem;
  color: #333;
  background: #fff;
  border: 2px solid #007bff;
  border-radius: 10px;
  appearance: none;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: #0056b3;
  }

  &:focus {
    outline: none;
    border-color: #0056b3;
    box-shadow: 0px 0px 10px rgba(0, 123, 255, 0.5);
  }
}

.styled-select:before {
  content: "▼";
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.8rem;
  color: #007bff;
  pointer-events: none;
}
</style>
