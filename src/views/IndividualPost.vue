<template>
  <div id="app">
    <!-- Start Banner Area -->
    <div class="feature-inner row">
        <div class="feature-item">
            <i class="ti-crown"></i>
            <router-link class="nav-link" :to="{name: 'UserBlog', params: {id: this.userId}}"><p class="text">{{this.firstname}} {{this.lastname}} {{this.createdAt}}</p></router-link>
            <div class="wow fadeIn" data-wow-duration="1s" data-wow-delay=".1s">
                <img :src="this.imageUrl">
                <p>{{this.description}}</p>
            </div>
            <button class="btn btn-default"><a v-on:click="gotoPeopleLiked" style="color:blue">{{this.likecount}} Likes</a></button>
            <button class="btn btn-danger" v-show="likestatus" v-on:click="likePost">UnLike &#x270C;</button> <button class="btn btn-danger" v-show="!likestatus" v-on:click="likePost">Like &#x2764;</button> <button class="btn btn-primary" v-on:click="shareAPost" >Share &#x27A6;</button>
        </div>
    </div>
    <div class="commentArea">
        <div class="inputArea">
            <textarea v-model="comment" placeholder="post your comment"></textarea>
        </div>
        <div class="postButton">
            <button v-on:click="postComment" class="sbtn">Post</button>
        </div>
    </div>
    
    <div class="allCommentsArea">
        <div class="allComment "
            v-for="(post, index) in allComments.data"
            v-bind:item="post"
            v-bind:index="index"
            v-bind:key="post.id"
            v-on:click="changeCurrentCourse(post)"
        >
            <div class="nameTimeSection">
                <router-link class="nav-link" :to="{name: 'UserBlog', params: {id: post.userId}}"><p class="text">{{post.firstname}}</p></router-link>
                <p class="text">{{post.createdAt}}</p>
            </div>
            <div class="jumbotron">
                <p class="text">{{post.comment}}</p>
            </div>
            <hr>
        </div>
    </div>
    <div class="feature-inner row ">
          <div class="col-lg-4 col-md-6 "
            v-for="(post, index) in posts"
            v-bind:item="post"
            v-bind:index="index"
            v-bind:key="post.id"
            v-on:click="gotoPeopleBlog(post.userId)"
          >
            <div class="feature-item">
              <h4>{{post.firstname}} {{post.lastname}}</h4>
              <div v-if="post.imageUrl===''" class="wow fadeIn" data-wow-duration="1s" data-wow-delay=".1s">
                <img src="../assets/img/defaultuser.png" alt="../assets/img/defaultUser.png" style="width:100%; height:250px">
              </div>
              <div v-else class="wow fadeIn" data-wow-duration="1s" data-wow-delay=".1s">
                <img :src="post.imageUrl"  style="width:100%; height:250px">
              </div>
              <h3>{{post.headline}}</h3>
              <div class="wow fadeIn" data-wow-duration="1s" data-wow-delay=".1s">
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
    name: 'IndividualPost',
    data(){
        return {
            id: '',
            postId: '',
            firstname: '',
            lastname: '',
            description: '',
            imageUrl: '',
            createdAt: '',
            userId: '',
            likes: {},
            likestatus: false,
            likecount: '',
            posts: [],
            currentUserFirstname: '',
            currentUserLastname: '',
            comment: '',
            allComments:[],
        }
    },
    async created(){
        console.log("Hello")
        await firebase.auth().onAuthStateChanged(user => {
                this.id = user.uid;
        });
        try{
            var response = await PostService.userAccountInfo(this.id);
            this.currentUserFirstname=response.data.firstname;
            this.currentUserLastname=response.data.lastname;
            console.log(response.data);
        } catch(err){
            this.error=err.message;
        }
        this.individualPost();
        this.loadComments();
    },
    methods:{
        async likePost(){
            if(this.likes[this.id]==undefined){
                this.likestatus=true;
            }
            else{
                this.likestatus=false;
            }
            var data = {
              "userId": this.userId,
              "likes": this.likestatus, 
              "postId": this.postId,
              "id": this.id, 
            }
            await PostService.likePost(data);
            this.individualPost();
        },
        async individualPost(){
            console.log("individual post");
            try{
                var data={
                    userId:this.$route.params.userid,
                    postId:this.$route.params.postid
                }
                var response = await PostService.individualPost(data);
                this.firstname=response.data.firstname;
                this.lastname=response.data.lastname;
                this.description=response.data.description;
                this.createdAt=response.data.createdAt;
                this.imageUrl=response.data.imageUrl;
                this.userId=response.data.userId;
                this.likes = response.data.likes;
                this.postId = response.data.postid;
                if(this.likes[this.id]==undefined){
                    this.likestatus=false;
                }
                else{
                    this.likestatus=true;
                }
                this.likecount=Object.keys(this.likes).length;             
            } catch(err){
                this.error=err.message;
            }
            
        },
        async gotoPeopleLiked(){
            var data={
                likes: this.likes,
            }
            console.log(data);
            var response = await PostService.peopleLiked(data);
            this.posts=response.data;
            console.log(this.posts);
        },
        async gotoPeopleBlog(id){
            console.log(id);
            this.$router.replace({ name: "UserBlog",params: {id: id} });
        },
        async postComment(){
          if(this.comment != "")
          {
            var data = {
                firstname:this.currentUserFirstname,
                lastname:this.currentUserLastname,
                postId:this.postId,
                userId:this.id,
                comment:this.comment,
                createdAt:new Date(),
            }
            await PostService.uploadPostComments(data);
            this.comment=""
            this.loadComments()
          }
          else{
            alert("Type Something to post")
          }
        },
        async loadComments(){
          try{
            this.allComments = await PostService.getPostComments(this.$route.params.postid);
            console.log(this.allComments)
          } catch(err){
            this.error=err.message;
          }
        },
        async shareAPost(){
            var data={
                firstname: this.currentUserFirstname,
                lastname: this.currentUserLastname,
                userId: this.id,
                imageUrl: this.imageUrl,
                description: this.description,
                createdAt: this.createdAt,
                postId: this.postId,
                likes: {},
            }
            console.log("share a post");
            var response=await PostService.shareAPost(data);
            alert(response.data.message);
        }
    },
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

.inputArea{
    padding:1em 3em;
}

.inputArea textarea{
    width: 100%;
}

.postButton{
    padding: 0em 3em 1em 3em;
}

.postButton button{
    margin: 0;
}

.allCommentsArea{
    padding: 0em 3em;
}

.jumbotron{
    padding:1em;
}

.nameTimeSection{
    display: flex;
}

.nameTimeSection a{
    padding: 0em 1em;
}

</style>