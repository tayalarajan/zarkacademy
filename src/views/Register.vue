<template>
  <div id="app">
    <!-- Start Banner Area -->
	<section class="banner-area relative">
		<div class="container">
			<div class="row d-flex align-items-center justify-content-center">
				<div class="about-content col-lg-12">
					<h1 class="text-white">
						Register
					</h1>
					<p>Our Courses can help you get throuhg the industrial standars that all the companies are expecting</p>
					<div class="link-nav">
						<span class="box">
							<router-link to="/">Home</router-link>
							<i class="lnr lnr-arrow-right"></i>
							<router-link to="#">Register</router-link>
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
            <!-- Tabs Titles -->
            <h2 class="active"> Register</h2>
            <!-- <h2 class="inactive underlineHover">Sign Up </h2> -->

            <!-- Login Form -->
            <div class="error" v-if="error">{{error.message}}</div>
            <form @submit.prevent="submitForm">
                <div class="form-group">
                    <input type="text" id="email" class="fadeIn second" name="login" placeholder="Email" 
                        v-model.trim="$v.email.$model" :class="{
                                    'is-invalid': $v.email.$error, 'is-valid': !$v.email.$invalid
                                }"
                    >
                    <div class="valid-feedback">
                        Your email is valid!
                    </div>
                    <div class="invalid-feedback">
                        <span v-if="!$v.email.required">Email is required.</span>
                        <span v-if="!$v.email.isUnique">Email is invalid.</span>
                    </div>
                </div>

                <div class="form-group">
                    <input type="password" id="password" class="fadeIn third" name="login" placeholder="password"
                        v-model.trim="$v.password.$model" :class="{
                                    'is-invalid': $v.password.$error, 'is-valid': !$v.password.$invalid
                                }"
                    >
                    <div class="valid-feedback">
                        Your password is valid!
                    </div>
                    <div class="invalid-feedback">
                        <span v-if="!$v.password.required">Password is required.</span>
                        <span v-if="!$v.password.minLength">{{$v.password.$params.minLength.min}} characters minimum.</span>
                    </div>
                </div>

                <div class="form-group">
                    <input type="password" id="repeatpassword" class="fadeIn third" name="login" placeholder="repeat password"
                            v-model.trim="$v.repeatpassword.$model" :class="{
                            'is-invalid': $v.repeatpassword.$error, 'is-valid': (password!='') ? !$v.repeatpassword.$invalid: ''
                        }"
                    >
                    <div class="valid-feedback">
                        Your passwords are identical!
                    </div>
                    <div class="invalid-feedback">
                        <span v-if="!$v.repeatpassword.sameAsPassword">Passwords must be identical.</span>
                    </div>
                </div>

                <button type="submit" class="sbtn"> Register {{ submitstatus }}</button>
            </form>

            <!-- Remind Passowrd -->
            <div id="formFooter">
                <p>Already Registered? <router-link to="/login">Login</router-link></p>
            </div>

        </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, email, sameAs, } from 'vuelidate/lib/validators'
import firebase from 'firebase';
import "firebase/auth";
export default {
    name: 'Register',
    data(){
        return {
            email: '',
            password: '',
            repeatpassword: '',
            showpassword: false,
            submitstatus: null,
            error: '',
        }
    },
    validations: {
        email:{
            required,
            email,
            isUnique (value){
                if(value==='') return true

                //eslint-disable-next-line
                var email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                return new Promise((resolve)=>{
                    setTimeout(()=>{
                        resolve(email_regex.test(value))
                    }, 350+Math.random()*300)
                })
            },
        },
        password:{
            required,
            minLength: minLength(8),
        },
        repeatpassword:{
            sameAsPassword: sameAs('password')
        },
    },
    methods: {
        register(){
          //Data in Json Form
          firebase
            .auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .then(() => {
                console.log("Hello");
                this.$router.replace({ name: "UserAccount" });
            })
            .catch(error => (this.error = error));
        },
        toggleShowPassword () {
            var show = document.getElementById('password')
            if(this.showpassword == false){
                this.showpassword = true
                show.type = "text"
            } else {
                this.showpassword = false
                show.type = "password"
            }
        },
        submitForm(){
            this.$v.$touch()
            if(this.$v.$invalid){
                this.submitstatus = "FAIL"
            } else{
                this.submitstatus = "SUCCESS"
                this.register()
            }
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
</style>