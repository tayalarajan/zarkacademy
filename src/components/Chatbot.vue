<template>
    <div>
        <button class="float" @click="chatBot"><i class="fa fa-comment my-float"></i></button>
        <div v-if="chatScreen" class="chatbot">
            <h3>Chat With us</h3>
            <div class="messageSection" id="messageSection">
                <div class="messages" v-for="(message, index) in messages"
                v-bind:item="message"
                v-bind:index="index"
                v-bind:key="message.id">
                <div class="message">
                    <span> {{message}}</span>
                </div>

                </div>
            </div>
            <input  v-model="query" @keyup.enter="submit"  autofocus type="text" placeholder="How can I help?"><br>
            <button class="sendButton" v-on:click="submit">Send</button>
        </div>
    </div>
    
</template>

<script>
import { ApiAiClient } from 'api-ai-javascript';
import config from './../../config';
const client = new ApiAiClient({accessToken: config.app.token})
export default {
    name: 'chatbot',
    data(){
        return {
        query:"",
        messages : [],
        speech: config.locale.strings.voiceTitle,
        micro: false,
        muted: config.app.muted,
        online: navigator.onLine,
        config,
        uniqueCourseId: {
            'Angular 6':1,
            'HTML':2,
            'CSS':3,
            'Javascript':4,
            'React JS':5,
            'Vue JS':6,
            'Node JS': 7,
        },
        chatScreen: false
        }
    },
    methods:{
        submit(){
        this.messages.push(this.query)
        client.textRequest(this.query).then((response) => {
            if(response.result.action == "input.unknown" && this.config.app.googleIt == true){
                response.result.fulfillment.messages[0].unknown = true
                response.result.fulfillment.messages[0].text = response.result.resolvedQuery
            } // if the googleIt is enabled, show the button
            console.log(response.result.fulfillment.speech)
            this.messages.push(response.result.fulfillment.speech)
            console.log(this.messages)
            this.handle(response) // <- handle the response in handle() method

            this.query = ''
            this.speech = config.locale.strings.voiceTitle // <- reset query and speech
            this.scrollToBottom();
        })
        },
        scrollToBottom(){
        var container = document.querySelector("#messageSection");
        container.scrollTop = container.scrollHeight;
        },
        handle(response){
            if(response.result.fulfillment.speech || response.result.fulfillment.messages[0].type == 'simple_response'){
                let speech = new SpeechSynthesisUtterance(response.result.fulfillment.speech || response.result.fulfillment.messages[0].textToSpeech)
                speech.voiceURI = 'native'
                speech.lang = config.locale.settings.speechLang

                if(this.muted == false) window.speechSynthesis.speak(speech) // <- Speech output if microphone is allowed
            }
        },

        chatBot () {
            this.chatScreen = !this.chatScreen
        }
    }
}
</script>

<style scoped>
    .float{
        position:fixed;
        width:60px;
        height:60px;
        bottom:40px;
        right:80px;
        background-color:#39cfca;
        color:#FFF;
        border-radius:50px;
        text-align:center;
        box-shadow: 2px 2px 3px #999;
        outline: none;
    }
    
    .chatbot {
        position:fixed;
        bottom:30px;
        right:150px;
        background: #fff;
        padding: 10px;
        border-radius: 20px;
        
    }

    .chatbot input[type=text] {
        border-radius: 20px;
        margin-top: 20px;
        width: 280px;
        height: 40px;
        border: solid 1px #000;
    }

    .chatbot .sendButton {
        border: none;
        width: 200px;
        margin-top: 10px;
        margin-left: 50px;
        border-radius: 10px 10px 10px 10px;
        padding: 7px;
        background: #39cfca;
        outline: none;
        
    }

    .messageSection {
        height: 250px;
        width: 290px;
        background: #fff;
        border-radius: 20px 0px 0px 20px;
        overflow-y: scroll;
    }

    .chatbot h3 {
        text-align: center;
        padding-top: 5px;
        background: #39cfca;
        border-radius: 10px 10px 0px 0px;
    }

    .messages {
        padding: 12px;
    }

    .message span {
        background: rgb(204, 204, 204);
        padding: 10px;
        border-radius: 0px 10px 10px 10px;
    }

    .my-float{
        font-size: 30px;
        
    }

    @media (max-width: 770px){
        .float {
            bottom: 20px;
            right: 50px;
        }

        .chatbot {
            bottom:20px;
            right:120px;
        }
    }
    /* width */
    ::-webkit-scrollbar {
    width: 5px;
    
    }

    /* Track */
    ::-webkit-scrollbar-track {
    background: #fff;
    border-radius: 40px;
    
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
    background: #888;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
    background: #555;
    }
</style>