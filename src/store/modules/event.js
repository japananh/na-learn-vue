import EventService from "@/services/EventService";

export const state = {
  events: [],
  eventsTotal: 0,
  event: {},
  perPage: 3,
};

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event);
  },
  SET_EVENTS(state, events) {
    state.events = events;
  },
  SET_EVENT_TOTAL(state, eventsTotal) {
    state.eventsTotal = eventsTotal;
  },
  SET_EVENT(state, event) {
    state.event = event;
  },
};

export const actions = {
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit("ADD_EVENT", event);
        const notification = {
          type: "success",
          message: "Your event has been created successfully!",
        };
        dispatch("notification/add", notification, { root: true });
      })
      .catch(error => {
        const notification = {
          type: "error",
          message: "There was a problem fetching events: " + error.message,
        };
        dispatch("notification/add", notification, { root: true });
        throw error;
      });
  },
  fetchEvents({ commit, dispatch, state }, { page }) {
    return EventService.getEvents(state.perPage, page)
      .then(response => {
        commit("SET_EVENT_TOTAL", parseInt(response.headers["x-total-count"]));
        commit("SET_EVENTS", response.data);
      })
      .catch(error => {
        const notification = {
          type: "error",
          message: "There was a problem fetching events: " + error.message,
        };
        console.log(notification);
        dispatch("notification/add", notification, { root: true });
      });
  },
  fetchEvent({ commit, state, /* dispatch, */ getters }, id) {
    if (id === state.event.id) {
      return state.event;
    }

    const event = getters.getEventById(id);

    if (event) {
      commit("SET_EVENT", event);
      return event;
    } else {
      // Need to return a promise so then() will work
      return EventService.getEvent(id).then(response => {
        commit("SET_EVENT", response.data);
        return response.data;
      });
      // .catch(error => {
      //   const notification = {
      //     type: "error",
      //     message: "There was a problem fetching event: " + error.message,
      //   };
      //   dispatch("notification/add", notification, { root: true });
      // });
    }
  },
};

export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id);
  },
};
