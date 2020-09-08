import axios from 'axios';

const url = 'http://localhost:5000/api/posts/';

class PostService{
    //Get Posts
    static getPosts(){
       return new Promise((resolve, reject)=>{
           try{
                axios.get(url)
                .then(function (response) {
                    const data=response.data;
                    resolve(
                        data.map(post => ({
                        ...post,
                        id: post.id,
                        createdAt: new Date(post.createdAt)
                        }))
                    );
                })
                .catch(function (error) {
                    console.log(error);
                });
           } catch(err){
                reject(err);
            }
        });
    }

    //Get Bookmarked Posts
    static getBookmarkedPosts(data){
        return new Promise((resolve, reject)=>{
            try{
                 axios.post(url+'getBookmarkedPosts/',data)
                 .then(function (response) {
                    const data=response.data;
                    resolve(
                        data.map(post => ({
                        ...post,
                        id: post.id,
                        createdAt: new Date(post.createdAt)
                        }))
                    );
                })
                .catch(function (error) {
                    console.log(error);
                });
            } catch(err){
                reject(err);
            }
        });
    }

    //Create Post
    static insertPost(data){
        return axios.post(url,data);
    }

    //login
    static login(data){
        return axios.post(url+'login/',data);
    }

    //register
    static register(data){
        return axios.post(url+'register/',data);
    }

    //Delete Post
    static deletePost(id){
        return axios.delete(`${url}${id}`);
    }
    //Check Whethere the user have updated the account settings
    static checkUserAccount(id){
        return axios.get(url+'checkUserAccount/'+id);    
    }
    //User Account
    static userAccount(data, id){
        return axios.post(url+'userAccount/'+id,data);
    }

    static userAccountInfo(id){
        return axios.get(url+'userAccountInfo/'+id);
    }

    static getUserDetail(id){
        return axios.get(url+'getUserDetail/'+id);    
    }

    //post Comment
    static postComment(data){
        return axios.post(url+'postComment/',data);
    }

    //load comments
    static getComments(){
        return axios.get(url+'getComments/');
    }

    //bookmark
    static bookMark(data,id){
        return axios.post(url+'bookMark/'+id,data);
    }

    //Get bookmark Details
    static getBookmarkDetail(id){
        return axios.get(url+'bookMark/'+id);    
    }

    //Uploading User Posts
    static uploadUserPosts(data,id){
        return axios.post(url+'uploadUserPosts/'+id,data);
    }

    //getting user blog posts
    static gettingUserPosts(id){
        //return axios.get(url+'uploadUserPosts/'+id);
        return new Promise((resolve, reject)=>{
            try{
                 axios.get(url+'uploadUserPosts/'+id)
                 .then(function (response) {
                     const data=response.data;
                     resolve(
                         data.map(post => ({
                         ...post,
                         id: post.id,
                         createdAt: new Date(post.createdAt)
                         }))
                     );
                 })
                 .catch(function (error) {
                     console.log(error);
                 });
            } catch(err){
                 reject(err);
             }
        });
    }

    //delete user blog post
    static deleteUserBlogPost(data){
        return axios.post(url+'deleteUserBlogPost/',data);
    }

    //post message from discussion centre
    static postMessage(data){
        return axios.post(url+'postMessage/',data);
    }

    //load all messages from discussion centre
    static getAllMessages(){
        return axios.get(url+'getAllMessages/');
    }

    //delete message from discussion centre
    static deleteMessage(id){
        return axios.delete(`${url}`+'deleteMessage/'+`${id}`);
    }

    //Individual Post
    static individualPost(data){
        return axios.post(url+'individualPost/',data);
    }

    //Like a Post
    static likePost(data){
        return axios.post(url+'likePost/',data);
    }

    //Get People Liked
    static peopleLiked(data){
        return axios.post(url+'peopleLiked/',data);
    }

    //Get Post Comment
    static getPostComments(id){
        return axios.get(url+'getPostComments/'+id);
    }

    //Upload Post Comment
    static uploadPostComments(data){
        return axios.post(url+'uploadPostComments/',data);
    }

    //Share A Post
    static shareAPost(data){
        return axios.post(url+'shareAPost/',data);
    }

    //getAllUser
    static getAllUser(){
        return axios.get(url+'getAllUser/');
    }

    //getIndividualUserChat
    static getIndividualUserChat(data){
        return axios.post(url+'individualChat/',data);
    }

    //postIndividualUserChat
    static postIndividualUserChat(data){
        return axios.post(url+'postIndividualChat/',data);
    }

    //deleteIndividualChatMessage
    static deleteIndividualChatMessage(data){
        return axios.post(url+'deleteIndividualChatMessage/',data);
    }
}

export default PostService;
