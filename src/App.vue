<template>
  <div id="app">
    <Navbar />
    <router-view />
    <Footer />
    
    <!-- ####################### Start Scroll to Top Area ####################### -->
    <div id="back-top">
      <a title="Go to Top" href="#"></a>
    </div>
    <!-- ####################### End Scroll to Top Area ####################### -->
    <Chatbot />
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
export default {
  name: 'app',
  components: {
    Navbar,
    Footer,
    Chatbot
  }
}
</script>

<style>

@import './assets/css/main.css';
@import './assets/css/linearicons.css';
@import './assets/css/font-awesome.min.css';
@import './assets/css/bootstrap.css';
@import './assets/css/magnific-popup.css';
@import './assets/css/nice-select.css';
@import './assets/css/animate.min.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
