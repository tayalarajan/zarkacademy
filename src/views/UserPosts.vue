<template>
  <div id="app">
    <!-- Start Banner Area -->
	<section class="banner-area relative">
		<div class="container">
			<div class="row d-flex align-items-center justify-content-center">
				<div class="about-content col-lg-12">
					<h1 class="text-white">
						Share Your Thoughts $
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
    <div class="wrapper fadeInDown">
        <div id="formContent">
                <h2 class="active"> Build Your Trust </h2>
                <div class="error" v-if="error">{{error.message}}</div>
                <form @submit.prevent="submitForm">
                    <div class="form-group">
                            <label>Select an Image!</label><br>
                            <div class="input-group"> <label class="btn btn-success btn-file">Upload Image<input type="file" style="display:none;" id="imageFile" v-on:change="OnChangeFile"></label>
                                <div class="spinner-grow text-muted" v-show="uploadStatus">.........Uploading</div>
                            </div>
                            <div v-if="imageUrlValidation">
                                <div class="alert alert-success">{{this.imageUrlMessage}}</div>
                            </div>
                            <div v-else>
                                <div class="alert alert-danger">{{this.imageUrlMessage}}</div>
                            </div>
                    </div>
                    <div v-show="this.imageUrlValidation">
                        <img :src="this.previewUrl"  style="width:100%; height:250px">
                    </div>
                    <div class="cancelImage" v-if="showCancelButton">
                        <button v-on:click="cancelImage">Cancel</button>
                    </div>
                    <div class="form-group">
                            <label>Description</label><br>
                            <textarea type="text" class="form-control" v-model.trim="$v.description.$model" :class="{
                                'is-invalid': $v.description.$error, 'is-valid': !$v.description.$invalid
                            }" placeholder="Write a Caption....."></textarea>
                            <div class="valid-feedback">
                                Launch It!
                            </div>
                            <div class="invalid-feedback">
                                <span v-if="!$v.description.maxLength">Description name can have atmost {{$v.description.$params.maxLength.max}} letters.</span>
                            </div>
                    </div>
                    <button type="submit" class="btn btn-success"> Share {{ submitstatus }}</button>
                </form>
        </div>
    </div>
    <div class="feature-inner row">
          <div class="col-lg-4 col-md-6"
            v-for="(post, index) in posts"
            v-bind:item="post"
            v-bind:index="index"
            v-bind:key="post.id"
          >
            <div class="feature-item">
              <h4>{{post.firstname}} {{post.lastname}}</h4>
              <div class="wow fadeIn" data-wow-duration="1s" data-wow-delay=".1s">
                <img :src="post.imageUrl"  style="width:100%; height:250px">
                <p>{{post.description}}</p>
                <button class="primary-btn" v-on:click="deletePost(post.id)">Delete</button>
              </div>
            </div>
          </div>
    </div>
  </div>
</template>

<script>
import { maxLength } from 'vuelidate/lib/validators'
import PostService from '../PostService';
import firebase from 'firebase';
import "firebase/auth";
export default {
    name: 'UserPosts',
    data(){
        return {
            firstname: '',
            lastname: '',
            submitstatus: null,
            error: '',
            id: '',
            imageUrl: '',
            imageUrlMessage: "Image has'nt selected yet!",
            imageUrlValidation: false,
            fileName: '',  
            fileSize: '',  
            fileType: '',
            fileData: '',
            uploadStatus: false,
            description: '',
            posts: [],
            previewUrl:'',
            showCancelButton:false
        }
    },
    validations: {
        description: {
            maxLength: maxLength(255)
        },
    },
    async created(){
        await this.getUserId();
        try{
        this.posts = await PostService.gettingUserPosts(this.id);
        } catch(err){
        this.error=err.message;
        }
        console.log(this.posts)
    },
    mounted() {
        this.getUserId();
    },
    methods: {
        async register(){
          //Data in Json Form
          const store = firebase.storage();
          this.fileName = this.fileData.name;
          var File_Name = this.fileName;
          var storageRef = store.ref('photos/' + File_Name);
                    await storageRef.put(this.fileData)
                    .then(snapshot => {
                        return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
                    })
                    .then(downloadURL => {
                        this.imageUrl = `${downloadURL}`;
                        this.imageUrlMessage="Your Pic Is Valid!";
                        this.imageUrlValidation=true;
                        //Successfully uploaded file and got download link
                        return downloadURL;
                    })
                    .catch(error => {
                        this.uploadStatus=false;
                        this.imageUrlMessage="Something Wrong Happend Please Try Again";
                        this.imageUrlValidation=false;
                        // Use to signal error if something goes wrong.
                        this.error=`${error}`;
                    });
        if(this.imageUrlValidation){
            var data = {
              "firstname": this.firstname,
              "lastname": this.lastname,
              "userId": this.id,
              "imageUrl": this.imageUrl,
              "description": this.description,
              "likes": {},
            }
            await PostService.uploadUserPosts(data,this.id);
            this.uploadStatus=false;
            this.$router.replace({ name: "UserBlog", params: {id:this.id}});
        }
          
        },
        async OnChangeFile(event){
            this.fileData =  event.target.files[0];
            this.previewUrl = URL.createObjectURL(this.fileData)
            this.fileSize = this.fileData.size;  
            this.fileType = this.fileData.type;
            var File_Size = this.fileSize;
            var File_Type = this.fileType;
            var MB =  File_Size / 1024 / 1024;
            if(File_Type=="image/jpeg" || File_Type=="image/png"){
                if(MB < 5){
                    this.imageUrlMessage="Your Pic Is Valid!";
                    this.imageUrlValidation=true;
                    this.showCancelButton=true
                    
                }else{
                    this.imageUrlMessage="File size exceed the 10mb limit";
                    this.imageUrlValidation=false;
                }
            }
            else{
                this.imageUrlMessage="File Format Must be of type PNG or JPEG";
                this.imageUrlValidation=false;
            }
        },
        async cancelImage(){
            this.fileData =''
            this.previewUrl=''
            this.fileName = ''
            this.fileSize = ''  
            this.fileType = ''
            document.querySelector('#imageFile').value =''
            this.imageUrlValidation=false;
            this.imageUrlMessage = "Image has'nt selected yet!"
            this.showCancelButton=false
        },
        change(){
            this.updateform=!this.updateform;
            this.userdetails=!this.userdetails;
        },
        submitForm(){
            this.$v.$touch()
            if(this.$v.$invalid || !this.imageUrlValidation){
                this.submitstatus = "FAIL"
            } else{
                this.submitstatus = "SUCCESS"
                this.uploadStatus=true;
                this.register()
            }
        },
        async getUserId() {
            await firebase.auth().onAuthStateChanged(user => {
                this.id = user.uid;
            });
            try{
                var response = await PostService.userAccountInfo(this.id);
                this.firstname=response.data.firstname;
                this.lastname=response.data.lastname;
            } catch(err){
                this.error=err.message;
            }
        },
        async deletePost(postId) {
            console.log(postId,this.id);
            var data={
                "userId": this.id,
                "postId": postId,
            }
            await PostService.deleteUserBlogPost(data);
            this.$router.replace({ name: "Main" });
        },
        
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