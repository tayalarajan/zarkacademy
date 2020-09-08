<template>
  <div id="app">
    <!-- Start Banner Area -->
	<section class="banner-area relative">
		<div class="container">
			<div class="row d-flex align-items-center justify-content-center">
				<div class="about-content col-lg-12">
					<h1 class="text-white">
						Respective Users Blog
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
    <h1>User Profile Info</h1>
    <div class="feature-inner row">
    <div class="col-lg-4 col-md-6">
    <div class="feature-item">    
        <h4><label>Name:</label>{{this.firstname}} {{this.lastname}}</h4>
        <div class="wow fadeIn" data-wow-duration="1s" data-wow-delay=".1s">
                <div v-if="this.imageUrl===''">
                    <img src="../assets/img/defaultuser.png" alt="../assets/img/defaultUser.png" style="width:100%; height:250px">
                </div>
                <div v-else>
                    <img :src="this.imageUrl"  style="width:100%; height:250px">
                </div>
                <p><label>Headline:</label>{{this.headline}}</p>
                <p><label>About:</label>{{this.about}}</p>
        </div>
    </div>
    </div>
    </div>
    <button class="primary-btn" @click="gotoIndividualUserChat">Message</button>
    <h1>User Blog</h1>
    <div class="feature-inner row">
          <div class="col-lg-4 col-md-6"
            v-for="(post, index) in posts"
            v-bind:item="post"
            v-bind:index="index"
            v-bind:key="post.id"
            v-on:click="gotoIndividualPost(post.id,post.userId)"
          >
            <div class="feature-item">
              <div class="wow fadeIn" data-wow-duration="1s" data-wow-delay=".1s">
                <img :src="post.imageUrl"  style="width:100%; height:250px">
                <p>{{post.description}}</p>
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
            posts: [],
            firstname: '',
            lastname: '',
            headline: '',
            about: '',
            links: '',
            twitterUrl: '',
            facebookUrl: '',
            linkedinUrl: '',
            youtubeUrl: '',
            userId: '',
            imageUrl: '',
        }
    },
    async created(){
        this.getUserId();
        try{
        this.posts = await PostService.gettingUserPosts(this.$route.params.id);
        } catch(err){
        this.error=err.message;
        }
        console.log(this.posts)
    },
    methods: {
        async getUserId() {
            await firebase.auth().onAuthStateChanged(user => {
                this.id = user.uid;
            });
            try{
                var response = await PostService.userAccountInfo(this.$route.params.id);
                this.firstname=response.data.firstname;
                this.lastname=response.data.lastname;
                this.headline= response.data.headline;
                this.about= response.data.about;
                this.links= response.data.links;
                this.twitterUrl= response.data.twitterUrl;
                this.facebookUrl= response.data.facebookUrl;
                this.linkedinUrl= response.data.linkedinUrl;
                this.youtubeUrl= response.data.youtubeUrl;
                this.userId= response.data.userId;
                this.imageUrl= response.data.imageUrl;
            } catch(err){
                this.error=err.message;
            }
        },
        async gotoIndividualPost(postid,userid){
            console.log(postid,userid);
            this.$router.replace({ name: "IndividualPost",params: {userid: userid, postid: postid} });
        },
        async gotoIndividualUserChat(){
            this.$router.replace({ name: "IndividualUserChat",params: {id: this.$route.params.id} });
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