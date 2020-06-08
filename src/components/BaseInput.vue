<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input :value="value" v-bind="$attrs" v-on="listeners" />
  </div>
</template>

<script>
import { formFieldMixin } from "@/mixins/formFieldMixin";

export default {
  // Use mixins to reduce repeated code
  mixins: [formFieldMixin],
  // inheritAttrs: false,
  // props: {
  //   label: {
  //     type: String,
  //     default: "",
  //   },
  //   value: [String, Number],
  // },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue,
      };
    },
  },
  // methods: {
  //   updateValue(event) {
  //     this.$emit("input", event.target.value);
  //   },
  // },
};
</script>
