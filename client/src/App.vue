<!-- Projekt - DT162G, JavaScript-baserad webbutveckling 
    Skapad av Frida Lazzari 2020-->
<template>
<div id="app">
    <Header />
    <Reportlist/>
    <Footer />
  </div>
</template>

<!-- JavaScript -->
<!-- importerar de 3 olika komponenterna till App.vue  -->
<script>
import Reportlist from './components/Reportlist.vue'
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

// exporterar de 3 olika komponenterna till App
export default {
  name: 'App',
  components: {
    Header,
    Reportlist,
    Footer
  }
}
</script>

<!-- CSS för alla storlekar/enheter -->
<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding:0;
  }
  
  body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.4;
  }

  #app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 2%;
  max-width:96%;
  height: auto;
}
</style>
