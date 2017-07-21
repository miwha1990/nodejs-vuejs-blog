<template>
    <v-app
            height="100%"
            dark
            id="e3"
            standalone
    >
        <v-navigation-drawer
                class="pb-0"
                persistent
                absolute
                height="100%"
                clipped
                enable-resize-watcher
                v-model="drawer"
        >
            <v-list dense>
                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon class="white--text text--darken-1">person</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title class="white--text text--darken-1"> Online ({{Object.keys(connectedUsers).length}})</v-list-tile-title>
                </v-list-tile>
                <v-divider dark></v-divider>
                <v-list>
                    <v-list-tile v-for="(value, k, index) in connectedUsers" :key="index" avatar>

                        <v-list-tile-avatar>
                            <img :src="'https://randomuser.me/api/portraits/men/22.jpg'" alt="">
                        </v-list-tile-avatar>
                        <v-list-tile-title class="online_users">
                            <span v-text="value"></span>&nbsp;<span v-if="userIsTyping(k)"><v-icon>create</v-icon>...</span>
                        </v-list-tile-title>

                    </v-list-tile>
                </v-list>
                <v-list-tile class="mt-3">
                    <v-list-tile-action>
                        <v-icon class="grey--text text--darken-1">add_circle_outline</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title class="grey--text text--darken-1">Browse Channels</v-list-tile-title>
                </v-list-tile>
                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon class="grey--text text--darken-1">settings</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title class="grey--text text--darken-1">Manage Notifications</v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>

        <main>
            <v-container>
                <v-layout>
                    <v-flex xs12>
                        <v-card>
                            <div class="chat-content">
                                <v-list two-line dark>
                                    <template v-for="(msg, index) in messages">
                                        <v-list-tile v-if="msg.type==='info'" v-bind:key="msg.info">
                                            <v-list-tile-content>
                                                <v-list-tile-sub-title>
                                                    <span v-html="msg.info"></span>
                                                </v-list-tile-sub-title>
                                            </v-list-tile-content>
                                            <v-list-tile-action>
                                                <v-list-tile-action-text>{{ msg.timestamp }}</v-list-tile-action-text>
                                            </v-list-tile-action>
                                        </v-list-tile>
                                        <v-list-tile avatar v-bind:key="index"v-if="msg.type==='chat'">
                                            <v-list-tile-avatar>
                                                <img v-bind:src="'https://randomuser.me/api/portraits/men/28.jpg'">
                                            </v-list-tile-avatar>
                                            <v-list-tile-content>
                                                <v-list-tile-title v-html="msg.user"></v-list-tile-title>
                                                <v-list-tile-sub-title v-html="msg.text"></v-list-tile-sub-title>
                                            </v-list-tile-content>
                                            <v-list-tile-action>
                                                <v-list-tile-action-text>{{ msg.timestamp }}</v-list-tile-action-text>
                                            </v-list-tile-action>
                                        </v-list-tile>
                                    </template>
                                </v-list>
                            </div>
                            <form>
                                <input
                                       v-on:keyup="usersAreTyping"
                                       @keydown.enter.stop.prevent="send"
                                       v-on:keyup.13="stopTyping('13')"
                                       v-on:keyup.8="stopTyping('8')"
                                       @compositionstart="composing=true"
                                       @compositionend="composing=false"
                                       v-model="message.text"
                                       type="text"
                                       placeholder="Type text..."
                                >
                                <v-btn @click.native.stop="send" flat class="orange--text">
                                    <v-icon dark v-tooltip:top="{ html: 'SEND' }" class="deep-orange--text text--lighten-2">send</v-icon>
                                </v-btn>
                            </form>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </main>
    </v-app>
</template>
<script>

    export default {
        data(){
            return {
                composing: false,
                connectedUsers: {},
                messages: [],
                message: {
                    msg: '',
                    type: '',
                    action: '',
                    user: this.$store.getters.getLogin,
                    text: '',
                    timestamp: ''
                },
                infoMessage: {
                    type: '',
                    info: '',
                    timestamp: ''
                },
                areTyping: [],
                userSwitch: false,
                drawer: true
            }
        },
        computed: {
            conUsers(){
                return this.connectedUsers;
            },
        },
        sockets:{
            Onlines(users){
                this.connectedUsers = users;
            },
            chat_message(message) {
                this.messages.push(message);
                const div = document.getElementsByClassName('chat-content')[0];
                div.scrollTop = div.scrollHeight;
            },
            update_people(users) {
                this.connectedUsers = users;
            },
            Joined(name, socketId){
                if(!this.userSwitch) {
                    this.$set(this.message, 'user', name);
                    const now = new Date();
                    this.message.type = 'info';
                    this.message.info ='<i class="blue--text">User <b >'+name+'</b> has joined.</i>';
                    this.message.timestamp = now.getHours()+':'+now.getMinutes()+' '+now.getDate()+'-'+now.getMonth()+'-'+now.getFullYear();
                    this.$socket.emit('chat.message', this.message);
                }
                this.userSwitch = true;
            },
            Typing(val) {
                this.areTyping.push(val);
            },
            StopTyping(val) {
                const index = this.areTyping.indexOf(val);
                if(index >= 0) {
                    this.areTyping.splice(index, 1);
                }
            },
            Left(socketObject) {
                const socket_Object = JSON.parse(socketObject);
                const newConnected = JSON.parse(JSON.stringify(this.connectedUsers));
                if(newConnected[socket_Object.socketId]) {
                    delete newConnected[socket_Object.socketId];
                    const now = new Date();
                    this.infoMessage.type = 'info';
                    this.infoMessage.info ='<i class="red--text">User <b >'+socket_Object.name+'</b> has left.</i>';
                    this.infoMessage.timestamp = now.getHours()+':'+now.getMinutes()+' '+now.getDate()+'-'+now.getMonth()+'-'+now.getFullYear();
                    this.$socket.emit('chat.message', this.infoMessage);
                    this.connectedUsers = newConnected;
                }

            }
        },
        created() {
            const token = this.$cookie.get('token');
            if(token) {
                this.$http.get('http://localhost:8000/me/', {
                    headers: {
                        Authorization: `JWT ${token}`
                    }})
                    .then((response)=>{
                        const login =  response.body.data.firstName;
                        this.$socket.emit('join', login);
                    })
                    .catch(err => err);
            } else {
                this.$router.push({ name: 'posts' })
            }
        },
        methods: {
            send(){
                if(this.message.text !== '') {
                    const now = new Date();
                    this.message.type = 'chat';
                    this.message.timestamp = now.getHours()+':'+now.getMinutes()+' '+now.getDate()+'-'+now.getMonth()+'-'+now.getFullYear();
                    this.$socket.emit('chat.message', this.message);
                    this.message.text ='';
                }

            },
            userIsTyping(username) {
                if(this.areTyping.indexOf(username) >= 0) {
                    return true
                } else {return false;}
            },
            usersAreTyping() {
                if(this.areTyping.indexOf(this.$socket.id) <= -1) {
                    this.areTyping.push(this.$socket.id);
                    this.$socket.emit('user.typing', this.$socket.id);
                }
            },
            stopTyping(keycode){
                if(keycode === '13' || (keycode === '8' && this.message.text === '')) {
                    const index = this.areTyping.indexOf(this.$socket.id);
                    if(index >= 0) {
                        this.areTyping.splice(index, 1);
                        this.$socket.emit('stop.typing', this.$socket.id);
                    }
                }

            }
        }

    }
</script>
<style>
    header {
        padding-bottom: 0;
    }
    .chat-content{
        height: calc(100vh - 132px);
        padding: 20px 20px 5px 20px;
        overflow: auto;
    }
    main{
        padding-top: 32px;
    }
    main form{
        position: relative;
        width: 100%;
        background: grey;
    }
    main form input{
        width: calc(100% -  80px);
        float: left;
        height: 48px;
        padding-left: 20px;
        outline: none;
        vertical-align: middle;
        font-size: 20px;
    }
    main form button{
        min-width: 0 !important;
    }
    main form button i:before{
        font-family:Arial;
    }
    html{
        overflow-y: hidden;
    }
    .online_users i{
        vertical-align: inherit;
        font-size: 15px !important;
    }
    .list__tile__action {
        min-width: 95px;
    }
</style>