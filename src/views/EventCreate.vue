<template>
  <div>
    <h1>Create an Event</h1>

    <form @submit.prevent="createEvent">
      <BaseSelect
        label="Select a category"
        :options="categories"
        v-model.trim="event.category"
        class="field"
        :class="{ error: $v.event.category.$error }"
        @blur="$v.event.category.$touch()"
      />
      <template v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required" class="errorMessage">
          Category is required.
        </p>
      </template>

      <h3>Name & describe your event</h3>
      <BaseInput
        label="Title"
        placeholder="Title"
        v-model.trim="event.title"
        type="text"
        @blur="$v.event.title.$touch()"
        class="field"
        :class="{ error: $v.event.title.$error }"
      />
      <template v-if="$v.event.title.$error">
        <p v-if="!$v.event.title.required" class="errorMessage">
          Title is required.
        </p>
      </template>

      <BaseInput
        type="text"
        placeholder="Description"
        label="Description"
        v-model="event.description"
        class="field"
        @blur="$v.event.description.$touch()"
        :class="{ error: $v.event.description.$error }"
      />
      <template v-if="$v.event.description.$error">
        <p v-if="!$v.event.description.required" class="errorMessage">
          Description is required.
        </p>
      </template>

      <h3>Where is your event?</h3>
      <BaseInput
        type="text"
        placeholder="Location"
        label="Location"
        v-model="event.location"
        class="field"
        @blur="$v.event.location.$touch()"
        :class="{ error: $v.event.location.$error }"
      />
      <template v-if="$v.event.location.$error">
        <p v-if="!$v.event.location.required" class="errorMessage">
          Location is required.
        </p>
      </template>

      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker
          v-model="event.date"
          placeholder="Select a date"
          :input-class="{ error: $v.event.date.$error }"
          @opened="$v.event.date.$touch()"
        />
      </div>
      <template v-if="$v.event.date.$error">
        <p v-if="!$v.event.date.required" class="errorMessage">
          Date is required.
        </p>
      </template>

      <BaseSelect
        label="Select a time"
        :options="times"
        v-model.trim="event.time"
        class="field"
        :class="{ error: $v.event.time.$error }"
        @blur="$v.event.time.$touch()"
      />
      <template v-if="$v.event.time.$error">
        <p v-if="!$v.event.time.required" class="errorMessage">
          Time is required.
        </p>
      </template>

      <BaseButton
        type="submit"
        buttonClass="-fill-gradient"
        :disabled="$v.$anyError"
        >Submit</BaseButton
      >
      <p v-if="$v.$anyError" class="errorMessage">
        Please fill out the required fields.
      </p>
    </form>
  </div>
</template>

<script>
import { mapState /* mapActions */ } from "vuex";
import Datepicker from "vuejs-datepicker";
import NProgress from "nprogress";
import { required } from "vuelidate/lib/validators";

export default {
  data() {
    const times = [];

    for (let i = 1; i <= 24; i++) {
      times.push(i + ":00");
    }
    return {
      times,
      // Work as well as mapState
      // categories: this.$$store.state.categories,
      event: this.createFreshEventObject(),
    };
  },
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required },
    },
  },
  methods: {
    // Another solution to dispatch action in component
    // ...mapActions({
    //   createEvent: "event/createEvent",
    // }),
    createEvent() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        console.log("createEvent -> !this.$v.$invalid", this.$v.$invalid);
        NProgress.start();

        // Another solution to dispatch action in component
        // this.createEvent(this.event)
        //   .then(() => {
        //     this.$router.push({
        //       name: "event-show",
        //       params: { id: this.event.id },
        //     });
        //     this.events = this.createFreshEventObject();
        //   })
        //   .catch(() => {
        //     NProgress.done();
        //   });

        this.$store
          .dispatch("event/createEvent", this.event)
          .then(() => {
            this.$router.push({
              name: "event-show",
              params: { id: this.event.id },
            });
            this.events = this.createFreshEventObject();
          })
          .catch(() => {
            NProgress.done();
          });
      }
    },
    createFreshEventObject() {
      // user.user = module-name.state
      const user = this.$store.state.user.user;
      const id = Math.floor(Math.random() * 1000000);
      return {
        id,
        user,
        category: "",
        organizer: user,
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        attendees: [],
      };
    },
  },
  computed: {
    ...mapState(["event.events", "categories"]),
  },
  components: {
    Datepicker,
  },
};
</script>

<style lang="scss" scoped>
.field {
  margin-bottom: 24px;
}
</style>
