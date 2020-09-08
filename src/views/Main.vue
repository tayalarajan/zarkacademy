<template>
  <div>
    <!-- Start Banner Area -->
    <section class="banner-area relative">
      <div class="container">
        <div class="row d-flex align-items-center justify-content-center">
          <div class="about-content col-lg-12">
            <h1 class="text-white">
              Zark Academy
            </h1>
            <p>Our Courses can help you get throuhg the industrial standars that all the companies are expecting</p>
            <div class="link-nav">
              <span class="box">
                <router-link to="/">Home</router-link>
                <i class="lnr lnr-arrow-right"></i>
                <router-link to="#">Zark Academy</router-link>
              </span>
            </div>
            <br>
            <p v-if="id">Your ID: {{id}}</p>
            <button class="sbtn" @click="signOut">Sign out</button>
          </div>
        </div>
      </div>
      <div class="rocket-img">
        <img src="../assets/img/rocket.png" alt="">
      </div>
    </section>
    <p class="error" v-if="error">{{error}}</p>
    <section class="feature-area">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="section-title text-center">
              <h1>List of Courses</h1>
              <p>
                Our Courses can help you get throuhg the industrial standars that all the companies are expecting
              </p>
            </div>
          </div>
        </div>
        <div class="searchCourses">
          <label for="search">Search:</label>
          <input type="text" id="search" v-model="search" v-on:keyup="filteredList" placeholder="Search for a course">
        </div>
        <div class="feature-inner row">
          <div class="col-lg-4 col-md-6"
            v-for="(post, index) in filteredList"
            v-bind:item="post"
            v-bind:index="index"
            v-bind:key="post.id"
            v-on:click="gotoCourse(post)"
          >
            <div class="feature-item">
              <i class="ti-crown"></i>
              <h4>{{post.courseName}}</h4>
              <div class="wow fadeIn" data-wow-duration="1s" data-wow-delay=".1s">
                <p>{{post.authorName}}</p>
                <p>{{post.courseDescription}}</p>
                <iframe :src=post.courseLink v-on:click="gotoCourse(post)" frameborder="0" allowfullscreen width="100%" height="200" style="border-radius: 2px; "></iframe> 
                <p>{{post.totalVideos}}</p>
              </div>
            </div>
          </div>
          <div class="loadMore">
            <a v-on:click="loadMessages">Load More>>></a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import firebase from 'firebase';
import "firebase/auth";
import PostService from '../PostService';
export default {
  data() {
    return {
      secrets: "",
      posts: [],
      error: '',
      id: '',
      search:'',
      messageCount : 20,
    };
  },
  async created(){
    try{
      this.posts = await PostService.getPosts();
    } catch(err){
      this.error=err.message;
    }
    console.log(this.posts)
  },
  mounted() {
    this.getSecrets();
  },
  computed:{
    filteredList() {
      if(this.search == '')
      {
        return this.posts
      }
      else
      {
        return this.posts.filter(post => {
        return post.courseName.toLowerCase().includes(this.search.toLowerCase())
        }) 
      }
    },
  },
  methods: {
    loadMessages(){
        this.messageCount = this.messageCount +20
    },
    async getSecrets() {
      await firebase.auth().onAuthStateChanged(user => {
        this.id = user.uid;
      });
      try{
        var response = await PostService.checkUserAccount(this.id);
        if(response.data.check=="false"){
          this.$router.replace({ name: "UserAccount" });
        }
      } catch(err){
        this.error=err.message;
      }
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({ name: "Home" });
        });
    },
    gotoCourse(post){
      console.log(post)
      localStorage.setItem("currCourse", JSON.stringify(post))
      localStorage.setItem("course", JSON.stringify(this.posts.filter(function(item){return item.uniqueCourseID == post.uniqueCourseID})))
      this.$router.replace({ name: "Course",params:{currCourse:post,course:this.posts.filter(function(item){return item.uniqueCourseID == post.uniqueCourseID})}});
    }
  }
};
</script>

<style lang="scss" scoped>
div {
  color: inherit;
}
  .divSection{
    padding: 1em;
    display: grid;
    grid-template-columns: 50% 50%;
  }
  .divSection span{
    text-align: left;
    padding-left: 3em;
  }
  .divSection p{
    text-align: left;
    margin: 0;
    word-break: break-all;
  }
  .submitSection{
    padding-left: 50%;
  }
  .submitSection button{
    width: 5em;
  }
  .post{
    background-color: yellowgreen;
    margin: 0.5em 0em;
    border: 1px solid black;
  }
  .deleteButton{
    text-align: right;
  }
  .signOut{
    padding: 0em 1em;
    float: right;
  }
    .sbtn  {
    background-color: #fff;
    border: none;
    color: #000;
    padding: 15px 80px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    text-transform: uppercase;
    font-size: 13px;
    -webkit-box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
    box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
    -webkit-border-radius: 5px 5px 5px 5px;
    border-radius: 5px 5px 5px 5px;
    margin: 5px 20px 40px 20px;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
  }
  
  .sbtn:hover  {
    background-color: #39ace7;
  }

  .feature-item {
    cursor: pointer;
  }

  .searchCourses{
    padding:1em 0em;
  }

</style>