<template>
  <div class="home">
    <!-- Start Banner Area -->
    <section class="banner-area relative">
      <div class="container">
        <div class="row d-flex align-items-center justify-content-center">
          <div class="about-content col-lg-12">
            <h1 class="text-white">
              Admin
            </h1>
            <p>Our Courses can help you get throuhg the industrial standars that all the companies are expecting</p>
            <div class="link-nav">
              <span class="box">
                <router-link to="/">Home</router-link>
                <i class="lnr lnr-arrow-right"></i>
                <router-link to="#">Admin</router-link>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="rocket-img">
        <img src="../assets/img/rocket.png" alt="">
      </div>
    </section>
    <PostComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import PostComponent from "@/components/PostComponent.vue";

export default {
  name: "Admin",
  components: {
    PostComponent
  }
};
</script>
