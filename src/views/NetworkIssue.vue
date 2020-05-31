<template>
  <div>
    <h1>Uh-Oh!</h1>
    <h3>
      It looks like you're experiencing some network issues. Please click the
      back button and try again.
    </h3>
    <router-link :to="{ name: 'event-link' }">
      Or go back to the Home page.
    </router-link>
  </div>
</template>
