<template>
  <div class="container">
    <div v-show="authentication">
      <button class="primary-btn" v-on:click="logout">Logout</button>
      <div class="wrapper fadeInDown">
      <div id="formContent">
        <h2 class="active">Add Course</h2>
        <form>
          <div class="form-group">
            <input type="text" class="fadeIn" ref="courseName" placeholder="Enter Course Name">
          </div>
          <div class="form-group">
            <input type="text" class="fadeIn" ref="authorName" placeholder="Enter Author Name">
          </div>
          <div class="form-group">
            <input type="text" class="fadeIn" ref="courseDescription" placeholder="Enter Course Description">
          </div>
          <div class="form-group">
            <input type="text" class="fadeIn" ref="courseLink" placeholder="Enter Course Link">
          </div>
          <div class="form-group">
            <input type="text" class="fadeIn" ref="totalVideos" placeholder="Enter Total no of Videos">
          </div>
          <div class="form-group">
            <button class="primary-btn" @click.prevent="getFormValues()">Post!</button>
          </div>
        </form>
      </div>
    </div>
    <hr>
    <p class="error" v-if="error">{{error}}</p>
    <div class="feature-inner row">
      <div class="col-lg-4 col-md-6"
        v-for="(post, index) in posts"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post.id"
      >
        <div class="feature-item">
          <i class="ti-crown"></i>
          <h4>{{post.courseName}}</h4>
          <div class="wow fadeIn" data-wow-duration="1s" data-wow-delay=".1s">
            <p>{{post.authorName}}</p>
            <p>{{post.courseDescription}}</p>
            <p>{{post.totalVideos}}</p>
            <p class="linktext">{{post.courseLink}}</p><br>
            <button class="primary-btn" v-on:click="deleteMessage(post.id)">Delete</button>
          </div>
        </div>
      </div>
    </div>
    </div>
    <div v-show="!authentication">
      <h1>Admin Portal</h1>
      <form @submit.prevent="submitForm">
        <label>Secret Name:</label>
        <input type="text" ref="secretname">
        <label>Secret Key:</label>        
        <input type="password" ref="secretpassword">
        <button type="submit" class="sbtn">Try In</button>
      </form>
    </div>
  </div>
</template>

<script>
import PostService from '../PostService';

export default {
  name: 'PostComponent',
  data(){
    return {
      posts: [],
      error: '',
      courseName: '',
      courseDescription:'',
      courseLink:'',
      totalVideos:'',
      authorName:'',
      uniqueCourseID:{
        'Angular 6':1,
        'HTML':2,
        'CSS':3,
        'Javascript':4,
        'React JS':5,
        'Vue JS':6,
        'Node JS': 7,
      },
      authentication:false, 
      name:'',
      password:''
    }
  },
  async created(){
    try{
      this.posts = await PostService.getPosts();
      console.log(this.posts)
    } catch(err){
      this.error=err.message;
    }
  },
  methods: {
    async createPost(){
      //Data in Json Form
      var data = {
      'courseName':this.courseName,
      'authorName':this.authorName,
      'courseDescription':this.courseDescription,
      'courseLink':this.courseLink,
      'totalVideos':this.totalVideos,
      'uniqueCourseID':this.uniqueCourseID[this.courseName]
      }

      await PostService.insertPost(data);
      this.posts = await PostService.getPosts();
    },
    async deleteMessage(id){
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    },
    getFormValues(){
      this.courseName = this.$refs.courseName.value
      this.authorName = this.$refs.authorName.value
      this.courseDescription = this.$refs.courseDescription.value
      this.courseLink = this.$refs.courseLink.value
      this.totalVideos = this.$refs.totalVideos.value

      //Clear Text
      this.$refs.courseName.value = ''
      this.$refs.authorName.value=''
      this.$refs.courseDescription.value=''
      this.$refs.courseLink.value=''
      this.$refs.totalVideos.value=''
      this.createPost()
    },
    async submitForm(){
      if(this.$refs.secretname.value=="zarkacademy" && this.$refs.secretpassword.value=="zarkboys"){
        this.authentication=true;
      }
    },
    async logout(){
      this.authentication=false;
      this.$refs.secretname.value=''
      this.$refs.secretpassword.value=''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container{
    margin-top: 50px;
  }

  h1 {
    text-align: center;
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
  .linktext {
    font-size: 13px;
  }
</style>
