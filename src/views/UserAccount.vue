<template>
  <div id="app" >
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
                            <router-link to="/register">Register</router-link>
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

            <h2 class="active"> Profile Info </h2>


            <div class="error" v-if="error">{{error.message}}</div>
            <form @submit.prevent="submitForm">
                <div class="form-group">
                        <input type="text" class="fadeIn second" name="login" placeholder="First name" 
                        v-model.trim="$v.firstname.$model" :class="{
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
                        <input type="text" class="fadeIn third" name="login" placeholder="Last Name"
                        v-model.trim="$v.lastname.$model" :class="{
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
                <button type="submit" class="sbtn"> Happy Learning! {{ submitstatus }}</button>
            </form>
        </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import PostService from '../PostService';
import firebase from 'firebase';
import "firebase/auth";
export default {
    name: 'UserAccount',
    data(){
        return {
            firstname: '',
            lastname: '',
            submitstatus: null,
            error: '',
            id: '',
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
    },
    mounted() {
        this.getUserId();
    },
    methods: {
        async register(){
          //Data in Json Form
          console.log(this.firstname,this.lastname);
          var data = {
              "firstname": this.firstname,
              "lastname": this.lastname,
              "headline": "",
              "about": "",
              "links": "",
              "twitterUrl": "",
              "facebookUrl": "",
              "linkedinUrl": "",
              "youtubeUrl": "",
              "userId": this.id,
              "imageUrl": "",
            }
            await PostService.userAccount(data,this.id);
            this.$router.replace({ name: "Main" });
        },
        submitForm(){
            this.$v.$touch()
            if(this.$v.$invalid){
                this.submitstatus = "NOT YET"
            } else{
                this.submitstatus = "STARTED"
                this.register()
            }
        },
        async getUserId() {
            firebase.auth().onAuthStateChanged(user => {
                this.id = user.uid;
            });
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
</style>