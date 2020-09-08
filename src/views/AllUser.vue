<template>
  <div id="app">
    <!-- Start Banner Area -->
	<section class="banner-area relative">
		<div class="container">
			<div class="row d-flex align-items-center justify-content-center">
				<div class="about-content col-lg-12">
					<h1 class="text-white">
						All Users Available In Zark World
					</h1>
					<p>Our Courses can help you get throuhg the industrial standars that all the companies are expecting</p>
					<div class="link-nav">
						<span class="box">
							<router-link to="/main">Zark Academy</router-link>
							<i class="lnr lnr-arrow-right"></i>
                            <router-link to="">Profile Info</router-link>
						</span>
					</div>
				</div>
			</div>
		</div>
		<div class="rocket-img">
			<img src="../assets/img/rocket.png" alt="">
		</div>
	</section>
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
            v-on:click="gotoIndividualBlog(post.userId)"
          >
            <div class="feature-item">
              <h4>{{post.firstname}} {{post.lastname}}</h4>
              <div class="wow fadeIn" data-wow-duration="1s" data-wow-delay=".1s">
                <div v-if="post.imageUrl===''">
                    <img src="../assets/img/defaultuser.png" alt="../assets/img/defaultUser.png" style="width:100%; height:250px">
                </div>
                <div v-else>
                    <img :src="post.imageUrl"  style="width:100%; height:250px">
                </div>
                <h3>{{post.headline}}</h3>
                <p>{{post.about}}</p>
              </div>
            </div>
          </div>
    </div>
  </div>
</template>

<script>
import PostService from '../PostService';
import firebase from 'firebase';
import "firebase/auth";
export default {
    name: 'UserBlog',
    data(){
        return {
            id: '',
            users: [],
            search:''
        }
    },
    async created(){
        this.getUserId();
    },
    computed:{
    filteredList() {
      if(this.search == '')
      {
        return this.users
      }
      else
      {
        return this.users.filter(post => {
        return post.firstname.toLowerCase().includes(this.search.toLowerCase())
        }) 
      }
    },
  },
    methods: {
        async getUserId() {
            await firebase.auth().onAuthStateChanged(user => {
                this.id = user.uid;
            });
            try{
                var response = await PostService.getAllUser();
                this.users = response.data;
                console.log(this.users);
            } catch(err){
                this.error=err.message;
            }
        },
        async gotoIndividualBlog(userid){
            this.$router.replace({ name: "UserBlog",params: {id: userid} });
        }
    }
};
</script>

<style scoped>
@import '../assets/login.css';
.error {
  color: red;
  font-size: 18px;
}

#formContent {
    padding:10px;
}

.userdetail {
    margin-top: 20px;
}

.userdetail h4 span {
    font-weight: 600;
}

.userdetail h4 {
    margin-bottom: 40px;
}
</style>