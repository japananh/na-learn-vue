<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select
      :value="value"
      @change="updateValue"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <option
        v-for="option in options"
        :key="option"
        :value="option"
        :selected="option === value"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
import { formFieldMixin } from "@/mixins/formFieldMixin";

export default {
  // Use mixins to reduce repeated code
  mixins: [formFieldMixin],
  // Stop inherit attributes at parent
  // inheritAttrs: false,
  props: {
    // label: {
    //   type: String,
    //   default: "",
    // },
    // value: [String, Number],
    options: {
      type: Array,
      required: true,
    },
  },
  // methods: {
  //   updateValue(event) {
  //     this.$emit("input", event.target.value);
  //   },
  // },
};
</script>
