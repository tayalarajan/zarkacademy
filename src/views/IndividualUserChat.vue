<template>
    <div class="discussionSection">

        <div class="allMessages">
            <div class="messageSection"
            v-for="(post,index) in messages.data.slice(0,messageCount)"
            v-bind:item="post"
            v-bind:index="index"
            v-bind:key="post.id"
            >
                <div class="userDetails">
                    <div class="usernameSection">
                    <router-link class="nav-link" :to="{name: 'UserBlog', params: {id: post.userid}}"> <label>{{post.firstname}} {{post.lastname}}</label> </router-link>
                    </div>
                    <div class="timeSection">
                        <label>{{post.commentedTime}}</label>
                    </div>
                </div>
                <div class="jumbotron">
                    <div class="imageSection" v-if="post.imageURL">
                        <img :src="post.imageURL" style="height:250px">
                    </div>
                    <span>{{post.comment}}</span>
                </div>
            </div>
        </div>
        <div class="commentSection">
            <div class="textBoxSection">
                <label>Description</label><br>
                <textarea type="text" v-model="comment" class="form-control"  :class="{
                    'is-invalid': $v.description.$error, 'is-valid': !$v.description.$invalid
                }" placeholder="Write a Caption....." v-on:keyup.enter="postMessage"></textarea>
            </div>
            <div class="imageUploadSection">
                <label>Select an Image!</label><br>
                <div class="input-group"> <input id="imageFile" type="file" v-on:change="OnChangeFile">
                    <div class="spinner-grow text-muted" v-show="uploadStatus">.........Uploading</div>
                </div>
                <div v-if="imageUrlValidation">
                    <div class="alert alert-success">{{this.imageUrlMessage}}</div>
                </div>
                <div v-else>
                    <div class="alert alert-warning">{{this.imageUrlMessage}}</div>
                </div>
                <div class="cancelImage" v-if="showCancelButton">
                    <button v-on:click="cancelImage">Cancel</button>
                </div>
            </div>
            <div class="postButton">
                <button type="submit" v-on:click="postMessage" class="btn btn-success">POST</button>
            </div>
        </div>
        <div class="loadMore">
            <a v-on:click="loadMessages">Load More>>></a>
        </div>
    </div>
    
</template>

<script>
import { maxLength } from 'vuelidate/lib/validators'
import PostService from '../PostService';
import firebase from 'firebase';
import "firebase/auth";
export default {
    name:'DiscussionCentre',
    data(){
        return{
            uploadStatus:false,
            imageUrlMessage: "Image has'nt selected yet!",
            imageUrlValidation: true,
            id:"",
            firstname:"",
            lastname:"",
            comment:"",
            imageURL:"",
            error:"",
            messages:[],
            messageCount : 20,
            fileData: '',
            fileName: '',
            fileType:'',
            fileSize:'',
            showCancelButton:false
        }
    },
    created(){
        this.getMessages()
    },
    validations: {
        description: {
            maxLength: maxLength(255)
        },
    },
    methods:{
        loadMessages(){
            this.messageCount = this.messageCount +5
        },
        async getMessages(){
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
            firebase.firestore().collection('chat').doc(this.id).collection(this.$route.params.id).orderBy('createdAt','desc').onSnapshot(this.onMessage);
        },
        async onMessage(){
            try{
                var data={
                    ownerid :this.id,
                    recepientid:this.$route.params.id,
                }
                this.messages = await PostService.getIndividualUserChat(data);
            } catch(err){
                this.error=err.message;
            }
        },
        async OnChangeFile(event){
            this.fileData = event.target.files[0]  
            this.fileName = this.fileData.name;
            this.fileSize = this.fileData.size;  
            this.fileType = this.fileData.type;
            var File_Size = this.fileSize;
            var File_Type = this.fileType;
            var MB =  File_Size / 1024 / 1024;
            if(File_Type=="image/jpeg" || File_Type=="image/png"){
                if(MB < 5){
                    this.imageUrlMessage="Your image is Valid!";
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
            console.log('changed')
        },
        async cancelImage(){
            this.fileData =''
            this.fileName = ''
            this.fileSize = ''  
            this.fileType = ''
            document.querySelector('#imageFile').value =''
            this.showCancelButton=false
        },
        async postMessage(){
            this.$v.$touch()
            if(this.$v.$invalid || !this.imageUrlValidation){
                alert('Something went Wrong!')
            } else{
                this.uploadStatus=true;
                if(this.fileName!=''){
                const store = firebase.storage();
                var storageRef = store.ref('photos/' + this.fileName);
                    await storageRef.put(this.fileData)
                    .then(snapshot => {
                        return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
                    })
                    .then(downloadURL => {
                        this.imageURL = `${downloadURL}`;
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
                var data = {
                    senderId: this.id,
                    receiverId: this.$route.params.id,
                    firstname: this.firstname,
                    lastname: this.lastname,
                    comment: this.comment,
                    imageURL: this.imageURL,
                    createdAt: new Date(),
                }
                await PostService.postIndividualUserChat(data);
                this.uploadStatus=false;
                this.comment=""
                this.fileName=''
                this.imageURL=''
            }
        },
        async deletPost(id){
            var data = {
                senderId: this.id,
                receiverId: this.$route.params.id,
                documentId: id
            }
            await PostService.deleteIndividualChatMessage(data);
            this.getMessages();
        }
    }
}
</script>

<style scoped>
@import '../assets/login.css';

.discussionSection{
    
}

.commentSection{
    display: grid;
    grid-template-columns: 60% 20% 20%;
    padding: 1em 0em;
    position: fixed;
    top: 4.5em;
    background-color: lavender;
    width: 100%;
    z-index: 100;
}

.textBoxSection , .imageUploadSection, .postButton{
    padding:0em 1em;
}

.allMessages{
    margin-top: 15em;
}

.messageSection{
    padding: 0em 5em;
    margin: 5em 0em;
}

.usernameSection label{
    color: black;
}

.nav-link {
    padding: 0em;
}

.jumbotron{
    padding:0.5em 2em;
}

.deleteButton{
    float:right;
}

.loadMore{
    color:blue;
    cursor: pointer;
    text-align: center;
    padding: 1em 0em;
}

</style>