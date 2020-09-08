import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuelidate from 'vuelidate';
import store from "./store";
import firebase from "firebase/app";
import 'bootstrap/dist/css/bootstrap.min.css';


Vue.use(Vuelidate)

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyD1PIvNRT9QkoDzwckl0eHTD2B96KLkXDs",
  authDomain: "zarkacademy.firebaseapp.com",
  databaseURL: "https://zarkacademy.firebaseio.com",
  projectId: "zarkacademy",
  storageBucket: "zarkacademy.appspot.com",
  messagingSenderId: "527154632977",
  appId: "1:527154632977:web:006b031cd2626ecdb1d4b0",
  measurementId: "G-NSMP44X2PF"
};

firebase.initializeApp(firebaseConfig);

let app;

firebase.auth().onAuthStateChanged(user => {
  console.log("user", user);
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
