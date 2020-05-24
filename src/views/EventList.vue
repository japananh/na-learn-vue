<template>
  <div>
    <h1>Event Listing</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <template v-if="page !== 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
      >
        Prev page
      </router-link>
    </template>
    <template v-if="hasNextPage">
      <router-link
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
      >
        Next page
      </router-link>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import EventCard from "@/components/EventCard.vue";

export default {
  components: {
    EventCard,
  },
  // ComponentDidMount
  created() {
    this.perPage = 3;

    this.$store.dispatch("fetchEvents", {
      perPage: this.perPage,
      page: this.page,
    });
    console.log(this.eventsTotal, this.page * 3);
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    ...mapState(["events", "eventsTotal", "user"]),
    hasNextPage() {
      return this.eventsTotal > this.page * this.perPage;
    },
  },
};
</script>
