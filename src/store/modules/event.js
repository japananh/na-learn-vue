import EventService from "@/services/EventService";

export const namespaced = true;
 
export const state = {
  events: [],
  eventsTotal: 0,
  event: {},
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
  createEvent({ commit }, event) {
    return EventService.postEvent(event).then(() => {
      commit("ADD_EVENT", event);
    });
  },
  fetchEvents({ commit }, { perPage, page }) {
    return EventService.getEvents(perPage, page)
      .then(response => {
        commit("SET_EVENT_TOTAL", parseInt(response.headers["x-total-count"]));
        commit("SET_EVENTS", response.data);
      })
      .catch(error => {
        console.log("fetchEvents -> error", error);
      });
  },
  fetchEvent({ commit, getters }, id) {
    const event = getters.getEventById(id);
    if (event) {
      commit("SET_EVENT", event);
    } else {
      return EventService.getEvent(id)
        .then(response => {
          commit("SET_EVENT", response.data);
        })
        .catch(error => {
          console.log("fetchEvent -> error", error);
        });
    }
  },
};

export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id);
  },
};
