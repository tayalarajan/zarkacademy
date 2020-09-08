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
                <router-link to="/main">Zark Academy</router-link>
                <i class="lnr lnr-arrow-right"></i>
                <router-link to="#">Course</router-link>
              </span>
            </div>
            <br>
            <button class="sbtn" v-on:click="gotoBack()">Back</button>
          </div>
        </div>
      </div>
      <div class="rocket-img">
        <img src="../assets/img/rocket.png" alt="">
      </div>
    </section>

    <section class="feature-area">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="section-title text-center">
              <h1>{{currentCourse.courseName}}</h1>
              <p>{{currentCourse.courseDescription}}</p>
            </div>
          </div>
        </div>
        <div class="feature-inner row">
          <div class="col-lg-8 col-md-6 leftf">
            <div class="well well-lg">
              <div class="well well-sm"><h2>{{currentCourse.courseDescription}}</h2></div><br>
              <iframe :src=currentCourse.courseLink frameborder="0" allowfullscreen width="100%" height="500" style="border-radius: 2px; "></iframe> 
              <h3>Autor Name: {{currentCourse.authorName}}</h3>
              <h3>Total Videos: {{currentCourse.totalVideos}}</h3>
              <button v-on:click="bookMarkCourse" class="sbtn">{{bookMarkText}}</button>
              <div class="commentSection">
                <textarea v-model="comment" placeholder="post your comment"></textarea>
                <button v-on:click="postComment" class="sbtn">Post</button>
                <button v-on:click="clearComment" class="sbtn">Clear</button>
              </div>
              <div class="allCommentsSection">
              <div class="comments-container">
                  <div class="comment"
                      v-for="(post, index) in allComments.data.slice(0,messageCount)"
                      v-bind:item="post"
                      v-bind:index="index"
                      v-bind:key="post.id"
                      v-on:click="changeCurrentCourse(post)"
                  >
                      
                      <div class="userNameArea"  v-if="post.uniqueCourseID === currentCourse.uniqueCourseID">
                        <router-link class="nav-link" :to="{name: 'UserBlog', params: {id: post.userid}}"><p class="text">{{post.userName}}</p></router-link>
                      </div>
                      <div class="commentedTimeArea" v-if="post.uniqueCourseID === currentCourse.uniqueCourseID">
                      <p class="text">{{post.commentedTime}}</p>
                      </div>
                      <div class="commentArea" v-if="post.uniqueCourseID === currentCourse.uniqueCourseID">
                      <p class="text">{{post.comment}}</p>
                      </div>
                      <hr>
                  </div>
                  <div class="loadMore">
                    <a v-on:click="loadMessages">Load More>>></a>
                </div>
              </div>
          </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 rightf">
              <div class="post"
                  v-for="(post, index) in fullCourse"
                  v-bind:item="post"
                  v-bind:index="index"
                  v-bind:key="post.id"
                  v-on:click="changeCurrentCourse(post)"
              >
                  <h3>{{post.courseDescription}}</h3>
                  <h5>{{post.courseName}}</h5>
                  <h5>Author: {{post.authorName}}</h5>
                  <h5>Total Videos: {{post.totalVideos}}</h5>
              </div>
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
    name:"Course",
    data(){
        return{
            currentCourse :[],
            fullCourse :[],
            comment:"",
            id:"",
            firstname:"",
            allComments:[],
            bookMarkText:"Click To Bookmark",
            userDetails:[],
            messageCount : 20,
        }
    },
    async created(){
        await this.getUserId();
        this.currentCourse = localStorage.getItem("currCourse")
        this.fullCourse = localStorage.getItem("course")
        this.currentCourse = JSON.parse(this.currentCourse)
        this.fullCourse = JSON.parse(this.fullCourse)
        this.loadComments()

        var response =await PostService.getBookmarkDetail(this.id);
        var currBookMark = []
        if(response.data == 'None')
        {
          this.bookMarkText = "Click To Bookmark"
        }
        else
        {
          currBookMark = response.data[0].uniqueCourseID
          if(currBookMark.includes(this.currentCourse.uniqueCourseID))
          {
            this.bookMarkText = "Bookmarked"
          }
        }  
    },
    methods:{
        loadMessages(){
            this.messageCount = this.messageCount +20
        },
        async loadComments(){
          try{
            this.allComments = await PostService.getComments();
          } catch(err){
            this.error=err.message;
          }
        },
        gotoBack(){
            localStorage.removeItem("currCourse")
            localStorage.removeItem("course")
            this.$router.replace({ name: "Main" });
        },
        changeCurrentCourse(post){
          this.currentCourse = post;
        },
        async postComment(){
          if(this.comment != "")
          {
            var data = {
              userid : this.id,
              comment: this.comment,
              commentedTime: new Date(),
              userName : this.firstname,
              courseId : this.currentCourse.uniqueCourseID
            }
            console.log(data)
            await PostService.postComment(data);
            this.comment=""
            this.loadComments()
          }
          else{
            alert("Type Something to post")
          }
        },
        clearComment(){
          this.comment = ""
        },
        async getUserId() {
            await firebase.auth().onAuthStateChanged(user => {
                this.id = user.uid;
            });
            try{
                var response = await PostService.userAccountInfo(this.id);
                this.firstname=response.data.firstname;
            } catch(err){
                this.error=err.message;
            }
        },
        async bookMarkCourse(){
          var response =await PostService.getBookmarkDetail(this.id);
          console.log(response.data)
          var bookMarkedCourses = []
          if(response.data == 'None')
          {
            bookMarkedCourses.push(this.currentCourse.uniqueCourseID)
            console.log(bookMarkedCourses)
            this.bookMarkText = "Bookmarked"
          }
          else
          {
            bookMarkedCourses = response.data[0].uniqueCourseID
            if(bookMarkedCourses.includes(this.currentCourse.uniqueCourseID))
            {
              bookMarkedCourses.pop(this.currentCourse.uniqueCourseID)
              this.bookMarkText = "Click To Bookmark"
            }
            else
            {
              bookMarkedCourses.push(this.currentCourse.uniqueCourseID)
              console.log(bookMarkedCourses)
              this.bookMarkText = "Bookmarked"
            }
            
          }
          var data = {
            courseId:bookMarkedCourses,
          }
          await PostService.bookMark(data,this.id);
          
        }
    }
}
</script>

<style scoped>
div {
  color: inherit;
}

.wishListButton{
  margin:0em 1em;
}

.courseSection{
    display: grid;
    grid-template-columns: 60% 40%;
}

.current-course{
  height: 100%;
  padding: 7em 5em;
}

.posts-container{
    margin: 0 auto;
    height: 30em;
    overflow-y: scroll;
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
  .deleteButton{
    text-align: right;
  }
  .signOut{
    padding: 0em 1em;
    float: right;
  }

  .commentSection{
    margin:2em 0em;
  }

  .commentSection textarea{
    width:100%;
    border: none;
    border-radius: 10px;
  }

  .comment{
    height:fit-content;
    margin: 1em 0em;
  }

  .comment .userNameArea{
    float: left;
  }

  .comment .userNameArea p{
    font-weight: 700;
  }

  .comment .commentArea{
    padding: 1em;
    border: 1px solid black;
    text-align: left;
  }

  .comments-container{
    height: 35em;
    overflow-y: scroll;
    padding: 10px;
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

  .leftf {
    color: #000;
    text-align: center;
  }
  .leftf h2 {
    color: #000;
    font-weight: 700;
    
  }

  .rightf {
    height: 35em;
    overflow-y: scroll;
  } 

  .post{
    margin: 3em 0em;
    border: 1px solid black;
    cursor: pointer;
  }

  .feature-inner {
    background: #43cea2; /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #43cea2, #185a9d); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #43cea2, #185a9d); 
    padding: 20px;
    border-radius: 20px;
  }

  .post {
    padding: 10px;
    text-align: center;
    color: #000;
  }

  .post h3 {
    font-weight: 700;
  }

  ::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 2px grey; 
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #000; 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #1a1919; 
}
</style>

