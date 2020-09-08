<template>
  <div id="app">
    <!-- Start Banner Area -->
	<section class="banner-area relative">
		<div class="container">
			<div class="row d-flex align-items-center justify-content-center">
				<div class="about-content col-lg-12">
					<h1 class="text-white">
						Profile Info
					</h1>
					<p>Our Courses can help you get throuhg the industrial standars that all the companies are expecting</p>
					<div class="link-nav">
						<span class="box">
							<router-link to="/">Home</router-link>
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
    <router-link class="nav-link" :to="{name: 'UserBlog', params: {id: this.id}}">Go To My Blog</router-link>
    <div class="wrapper fadeInDown">
        <div id="formContent">
            <div v-if="updateform">
                <button class="sbtn" v-on:click="change">Back</button>
                <h2 class="active"> Profile Info </h2>
                <div class="error" v-if="error">{{error.message}}</div>
                <form @submit.prevent="submitForm">
                    <div class="form-group">
                            <label>First Name</label><br>
                            <input type="text" class="form-control" v-model.trim="$v.firstname.$model" :class="{
                                'is-invalid': $v.firstname.$error, 'is-valid': !$v.firstname.$invalid
                            }">
                            <div class="valid-feedback">
                                Your first name is valid!
                            </div>
                            <div class="invalid-feedback">
                                <span v-if="!$v.firstname.required">First name is required</span>
                                <span v-if="!$v.firstname.minLength">First name must have at least {{$v.firstname.$params.minLength.min}} letters.</span>
                                <span v-if="!$v.firstname.maxLength">First name can have atmost {{$v.firstname.$params.maxLength.max}} letters.</span>
                            </div>
                    </div>
                    <div class="form-group">
                            <label>Last Name</label><br>
                            <input type="text" class="form-control" v-model.trim="$v.lastname.$model" :class="{
                                'is-invalid': $v.lastname.$error, 'is-valid': !$v.lastname.$invalid
                            }">
                            <div class="valid-feedback">
                                Your last name is valid!
                            </div>
                            <div class="invalid-feedback">
                                <span v-if="!$v.lastname.required">Last name is required</span>
                                <span v-if="!$v.lastname.minLength">Last name must have at least {{$v.lastname.$params.minLength.min}} letters.</span>
                                <span v-if="!$v.lastname.maxLength">Last name can have atmost {{$v.lastname.$params.maxLength.max}} letters.</span>
                            </div>
                    </div>
                    <div class="form-group">
                            <label>Headline</label><br>
                            <input type="text" class="form-control" v-model.trim="$v.headline.$model" :class="{
                                'is-invalid': $v.headline.$error, 'is-valid': !$v.headline.$invalid
                            }">
                            <div class="valid-feedback">
                                Your headline is valid!
                            </div>
                            <div class="invalid-feedback">
                                <span v-if="!$v.headline.minLength">Headline must have at least {{$v.headline.$params.minLength.min}} letters.</span>
                                <span v-if="!$v.headline.maxLength">Headline can have atmost {{$v.headline.$params.maxLength.max}} letters.</span>
                            </div>
                    </div>
                    <div class="form-group">
                            <label>About</label><br>
                            <input type="text" class="form-control" v-model.trim="$v.about.$model" :class="{
                                'is-invalid': $v.about.$error, 'is-valid': !$v.about.$invalid
                            }">
                            <div class="valid-feedback">
                                Your about is valid!
                            </div>
                            <div class="invalid-feedback">
                                <span v-if="!$v.about.minLength">Headline must have at least {{$v.about.$params.minLength.min}} letters.</span>
                                <span v-if="!$v.about.maxLength">Headline can have atmost {{$v.about.$params.maxLength.max}} letters.</span>
                            </div>
                    </div>
                    <div class="form-group">
                            <label>Links</label><br>
                            <input type="url" class="form-control" v-model.trim="$v.links.$model" :class="{
                                'is-invalid': $v.links.$error, 'is-valid': !$v.links.$invalid
                            }">
                            <div class="valid-feedback">
                                Your link is valid!
                            </div>
                            <div class="invalid-feedback">
                                <span v-if="!$v.links.links">This Website is invalid.</span>
                            </div>
                    </div>
                    <div class="form-group">
                            <label>Add your Twitter username (e.g. johnsnow).</label><br>
                            <div class="input-group"> <span class="input-group-addon">http://twitter.com/</span> <input type="text" class="form-control" v-model.trim="$v.twitterUrl.$model" :class="{
                                'is-invalid': $v.twitterUrl.$error, 'is-valid': !$v.twitterUrl.$invalid
                            }">
                                <div class="valid-feedback">
                                    Your Twitter Id is valid!
                                </div>
                                <div class="invalid-feedback">
                                    <span v-if="!$v.twitterUrl.minLength">Twitter URL must have at least {{$v.twitterUrl.$params.minLength.min}} letters.</span>
                                    <span v-if="!$v.twitterUrl.maxLength">Twitter URL can have atmost {{$v.twitterUrl.$params.maxLength.max}} letters.</span>
                                </div>
                             </div>
                    </div>
                    <div class="form-group">
                            <label>Input your Facebook username (e.g. johnsnow).</label><br>
                            <div class="input-group"> <span class="input-group-addon">http://www.facebook.com/</span> <input type="text" class="form-control" v-model.trim="$v.facebookUrl.$model" :class="{
                                'is-invalid': $v.facebookUrl.$error, 'is-valid': !$v.facebookUrl.$invalid
                            }">
                                <div class="valid-feedback">
                                    Your Facebook Id is valid!
                                </div>
                                <div class="invalid-feedback">
                                    <span v-if="!$v.facebookUrl.minLength">Facebook Id must have at least {{$v.facebookUrl.$params.minLength.min}} letters.</span>
                                    <span v-if="!$v.facebookUrl.maxLength">Facebook Id can have atmost {{$v.facebookUrl.$params.maxLength.max}} letters.</span>
                                </div>
                             </div>
                            
                    </div>
                    <div class="form-group">
                            <label>Input your LinkedIn resource id (e.g. in/johnsnow).</label><br>
                            <div class="input-group"> <span class="input-group-addon">http://www.linkedin.com/</span> <input type="text" class="form-control" v-model.trim="$v.linkedinUrl.$model" :class="{
                                'is-invalid': $v.linkedinUrl.$error, 'is-valid': !$v.linkedinUrl.$invalid
                            }">
                                <div class="valid-feedback">
                                    Your Linkedin Id is valid!
                                </div>
                                <div class="invalid-feedback">
                                    <span v-if="!$v.linkedinUrl.minLength">Linkedin Id must have at least {{$v.linkedinUrl.$params.minLength.min}} letters.</span>
                                    <span v-if="!$v.linkedinUrl.maxLength">Linkedin Id can have atmost {{$v.linkedinUrl.$params.maxLength.max}} letters.</span>
                                </div>
                             </div>
                            
                    </div>
                    <div class="form-group">
                            <label>Input your Youtube username (e.g. johnsnow).</label><br>
                            <div class="input-group"> <span class="input-group-addon">http://www.youtube.com/</span> <input type="text" class="form-control" v-model.trim="$v.youtubeUrl.$model" :class="{
                                'is-invalid': $v.youtubeUrl.$error, 'is-valid': !$v.youtubeUrl.$invalid
                            }">
                                <div class="valid-feedback">
                                    Your Youtube Id is valid!
                                </div>
                                <div class="invalid-feedback">
                                    <span v-if="!$v.youtubeUrl.minLength">Youtube Id must have at least {{$v.youtubeUrl.$params.minLength.min}} letters.</span>
                                    <span v-if="!$v.youtubeUrl.maxLength">Youtube Id can have atmost {{$v.youtubeUrl.$params.maxLength.max}} letters.</span>
                                </div>
                            </div>
                    </div>
                    <div class="form-group">
                            <label>Upload Your Profile!</label><br>
                            <div class="input-group"> <input type="file" v-on:change="OnChangeFile">
                                <div class="spinner-grow text-muted" v-show="uploadStatus">.........Uploading</div>
                            </div>
                            <div v-if="imageUrlValidation">
                                <div class="alert alert-success">{{this.imageUrlMessage}}</div>
                            </div>
                            <div v-else>
                                <div class="alert alert-danger">{{this.imageUrlMessage}}</div>
                            </div>
                    </div>
                    <div v-if="this.fileData!=''">
                        <img :src="this.previewUrl"  style="width:100%; height:250px">
                    </div>
                    <button type="submit" class="btn btn-success"> Update {{ submitstatus }}</button>
                </form>
            </div>
            <div>
                <div v-if="userdetails">
                    <button class="sbtn" v-on:click="change">Click Here To Update!</button>
                    <div class="error" v-if="error">{{error.message}}</div>
                    <div>
                        <div v-if="this.imageUrl===''">
                            <img src="../assets/img/defaultuser.png" alt="../assets/img/defaultUser.png" style="width:100%; height:250px">
                        </div>
                        <div v-else>
                            <img :src="this.imageUrl"  style="width:100%; height:250px">
                        </div>
                        <h2 class="active">User Details</h2>
                        <div class="userdetail">
                            <h4><span>First Name:</span>  {{this.firstname}}</h4>
                            <h4><span>Last Name:</span>  {{this.lastname}}</h4>
                            <h4><span>Headline:</span>  {{this.headline}}</h4>
                            <h4><span>About:</span>  {{this.about}}</h4>
                            <h4><span>Link:</span>  {{this.links}}</h4>
                            <h4><span>Twitter:</span>  http://twitter.com/{{this.twitterUrl}}</h4> 
                            <h4><span>Facebook:</span>  http://www.facebook.com/{{this.facebookUrl}}</h4>
                            <h4><span>LinkedIn:</span>  http://www.linkedin.com/{{this.linkedinUrl}}</h4>
                            <h4><span>Youtube:</span>  http://www.youtube.com/{{this.youtubeUrl}}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, maxLength, url } from 'vuelidate/lib/validators'
import PostService from '../PostService';
import firebase from 'firebase';
import "firebase/auth";
export default {
    name: 'UpdateProfile',
    data(){
        return {
            firstname: '',
            lastname: '',
            headline: '',
            about: '',
            links: '',
            twitterUrl: '',
            facebookUrl: '',
            linkedinUrl: '',
            youtubeUrl: '',
            submitstatus: null,
            error: '',
            id: '',
            updateform: false,
            userdetails: true,
            imageUrl: '',
            imageUrlMessage: "Your Profile Pic Is Valid!",
            imageUrlValidation: true,
            fileName: '',  
            fileSize: '',  
            fileType: '',
            fileData: '',
            uploadStatus: false,
            previewUrl: '',
        }
    },
    validations: {
        firstname: {
            required,
            minLength: minLength(3),
            maxLength: maxLength(20)
        },
        lastname: {
            required,
            minLength: minLength(3),
            maxLength: maxLength(20)
        },
        headline: {
            minLength: minLength(3),
            maxLength: maxLength(60)
        },
        about: {
            minLength: minLength(5),
            maxLength: maxLength(200)
        }, 
        links: {
            url
        },
        twitterUrl: {
            minLength: minLength(3),
            maxLength: maxLength(30)
        },
        facebookUrl: {
            minLength: minLength(3),
            maxLength: maxLength(30)
        },
        linkedinUrl: {
            minLength: minLength(3),
            maxLength: maxLength(30)
        },
        youtubeUrl: {
            minLength: minLength(3),
            maxLength: maxLength(30)
        },
    },
    mounted() {
        this.getUserId();
    },
    methods: {
        async register(){
          //Data in Json Form
          if(this.fileName!=''){
            var File_Name = this.fileName;
            const store = firebase.storage();
            var storageRef = store.ref('photos/' + File_Name);
                    await storageRef.put(this.fileData)
                    .then(snapshot => {
                        return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
                    })
                    .then(downloadURL => {
                        this.imageUrl = `${downloadURL}`;
                        this.uploadStatus=false;
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
            }
            if(this.imageUrlValidation){
                var data = {
                    "firstname": this.firstname,
                    "lastname": this.lastname,
                    "headline": this.headline,
                    "about": this.about,
                    "links": this.links,
                    "twitterUrl": this.twitterUrl,
                    "facebookUrl": this.facebookUrl,
                    "linkedinUrl": this.linkedinUrl,
                    "youtubeUrl": this.youtubeUrl,
                    "userId": this.id,
                    "imageUrl": this.imageUrl,
                }
                await PostService.userAccount(data,this.id);
                this.uploadStatus=false;
                this.$router.replace({ name: "UserBlog", params: {id:this.id}});
            }
        },
        async OnChangeFile(event){
            this.fileData =  event.target.files[0];
            this.previewUrl = URL.createObjectURL(this.fileData)
            this.fileName = this.fileData.name;  
            this.fileSize = this.fileData.size;  
            this.fileType = this.fileData.type;
            var MB =  this.fileSize / 1024 / 1024;
            if(this.fileType=="image/jpeg" || this.fileType=="image/png"){
                if(MB < 5){
                    this.imageUrlMessage="Your Profile Pic Is Valid!";
                    this.imageUrlValidation=true;
                    
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
                this.register()
                this.uploadStatus=true;
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
                this.headline= response.data.headline;
                this.about=response.data.about;
                this.links=response.data.links;
                this.twitterUrl=response.data.twitterUrl;
                this.facebookUrl=response.data.facebookUrl;
                this.linkedinUrl=response.data.linkedinUrl;
                this.youtubeUrl=response.data.youtubeUrl;
                this.imageUrl=response.data.imageUrl;
            } catch(err){
                this.error=err.message;
            }
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