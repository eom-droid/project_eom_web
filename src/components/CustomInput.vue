<template>
  <div class="input-wrapper">
    <p>{{ props.label }}</p>

    <input
      :value="props.modelValue"
      @input="updateValue"
      :type="type"
      :placeholder="placeholder"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
});

const value = ref(props.modelValue);

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event: Event) => {
  value.value = (event.target as HTMLInputElement).value;
  emit("update:modelValue", value.value);
};
</script>

<style scoped>
.input-wrapper {
  width: 100%;
}

.input-wrapper p {
  margin-bottom: 8px;
}

.input-wrapper input {
  font-size: 14px;
  width: 100%;
  height: 44px;
  padding: 0 10px;
  border: none;
  border-radius: 5px;
  box-sizing: border-box;
}

.input-wrapper input:focus {
  outline: none;
  border: 2px solid #22a45d;
}
</style>
