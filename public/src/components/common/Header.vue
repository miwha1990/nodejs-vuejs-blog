<template>
    <header>
        <v-container>
            <v-toolbar fixed dark class="primary">
                <div class="toolbar__content">
                    <v-toolbar-side-icon @click.native.stop="drawer = !drawer" class="white--text hidden-md-and-up"></v-toolbar-side-icon>
                    <v-toolbar-title class="white--text">{{title}}</v-toolbar-title>
                    <v-toolbar-items class="hidden-sm-and-down">
                        <span id="menu_list" v-for="(item, index) in items" :key="index">
                            <v-btn flat v-if="item.children">
                                <v-menu :nudge-width="100">
                                    <v-list-tile-title slot="activator">
                                        <span style="vertical-align: middle" class="white--text">{{item.text}}</span>
                                        <v-icon dark  class="white--text">arrow_drop_down</v-icon>
                                    </v-list-tile-title>
                                    <v-list>
                                        <v-list-tile v-for="(im, ind) in item.children" :key="ind">
                                            <router-link :to="`/posts\?category=`+ im.text">
                                                <v-list-tile-title v-html="im.text"></v-list-tile-title>
                                            </router-link>
                                        </v-list-tile>
                                    </v-list>
                                </v-menu>
                            </v-btn>

                            <router-link :to="{name: item.name}" class="btn btn--dark btn--flat" tag="button" v-else>
                                {{item.text}}
                            </router-link>
                        </span>
                    </v-toolbar-items>
                    <v-spacer></v-spacer>
                    <v-toolbar-items  class="hidden-sm-and-down">
                        <router-link :to="{name: 'chat'}" class="btn btn--flat white--text" tag="button" v-if="login">
                            <v-icon class="white--text">question_answer</v-icon> chat
                        </router-link>
                        <v-menu v-if="login">
                            <span slot="activator">
                                <v-list-tile class="white--text" dark>
                                    <v-list-tile-avatar class="white--text">
                                         <img :src="avatar || './static/no-avatar.png'">
                                    </v-list-tile-avatar>
                                    <v-list-tile-content>
                                        <v-list-tile-sub-title  class="white--text">
                                            <span style="vertical-align: middle" class="white--text">Hello, {{login}}!</span>
                                            <v-icon dark  class="white--text">arrow_drop_down</v-icon>
                                        </v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </span>
                            <v-list>
                                <v-list-tile>
                                    <v-list-tile-title v-on:click="logout"><v-icon>lock_open</v-icon>&nbsp;Logout</v-list-tile-title>
                                </v-list-tile>
                                <v-list-tile>
                                  <v-icon>settings</v-icon>&nbsp;<v-list-tile-title>Settings</v-list-tile-title>
                                </v-list-tile>
                            </v-list>
                        </v-menu>
                        <v-btn class="deep-orange lighten-2 white--text" @click.native.stop="modal = !modal;" flat v-else>
                            <v-icon class="white--text">input</v-icon>&nbsp;&nbsp;&nbsp;
                            <login-modal :modal="modal"></login-modal>
                        </v-btn>
                    </v-toolbar-items>
                </div>
            </v-toolbar>
        </v-container>
        <v-navigation-drawer temporary v-model="drawer" :mini-variant.sync="mini" dark>
            <v-list class="pa-10">
                <v-layout row wrap>
                    <v-flex xs10>
                        <v-list-item v-if="login">
                            <v-list-tile avatar tag="div">
                                <v-list-tile-avatar>
                                    <img :src="avatar || './static/no-avatar.png'" />
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-menu :nudge-width="100">
                                        <span slot="activator">
                                            <span style="vertical-align: middle">Hello, {{login}}!</span>
                                            <v-icon dark>arrow_drop_down</v-icon>
                                        </span>
                                        <v-list>
                                            <v-list-tile>
                                                <v-icon>lock_open</v-icon>&nbsp;<v-list-tile-title v-on:click="logout">Logout</v-list-tile-title>
                                            </v-list-tile>
                                            <v-list-tile>
                                                <v-icon>settings</v-icon>&nbsp;<v-list-tile-title>Settings</v-list-tile-title>
                                            </v-list-tile>
                                        </v-list>
                                    </v-menu>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list-item>
                        <v-list-item v-else>
                            <v-list-tile avatar @click.native.stop="modal2 = true" tag="div">
                                <v-list-tile-action>
                                    <v-icon>input</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title>
                                        <login-modal :modal="modal2"></login-modal>
                                    </v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list-item>
                    </v-flex>
                    <v-flex xs2>
                        <v-list-tile-action>
                            <v-btn icon dark @click.native.stop="mini = !mini">
                                <v-icon>chevron_left</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-flex>
                </v-layout>

            </v-list>
            <v-list dense>
                <template v-for="(item, i) in items">
                    <v-list-group v-if="item.children" v-model="item.model" no-action>
                        <v-list-tile slot="item">
                            <v-list-tile-action>
                                <v-icon>{{ item.model ? item.icon : item['icon-alt'] }}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    {{ item.text }}
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>

                        <v-list-tile
                                v-for="(child, i) in item.children"
                                :key="i"
                        >
                            <router-link :to="`/posts\?category=`+ child.text">
                                <v-list-tile-action v-if="child.icon">
                                    <v-icon>{{ child.icon }}</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title>
                                        {{ child.text }}
                                    </v-list-tile-title>
                                </v-list-tile-content>
                            </router-link>

                        </v-list-tile>

                    </v-list-group>

                    <router-link :to="{name: item.name}" class="list__tile" v-else>
                        <v-list-tile-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                {{ item.text }}
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </router-link>

                </template>
            </v-list>
        </v-navigation-drawer>

    </header>
</template>
<script>
    import loginModal from './Modal-login.vue';
    export default {
        data () {
            return {
                drawer: null,
                modal:false,
                modal2:false,
                items: [
                    { icon: 'home', text: 'Home', name: 'posts' },
                    {
                        icon: 'keyboard_arrow_up',
                        'icon-alt': 'keyboard_arrow_down',
                        text: 'Categories' ,
                        model: false,
                        children: [
                            { text: 'All' },
                            { text: 'Business' },
                            { text: 'Leisure' },
                            { text: 'Work' },
                            { text: 'Not categorized' }
                        ]
                    },
                    { icon: 'contacts', text: 'Contacts', name: 'contacts' }
                ],
                mini: false,
                right: true
            }
        },
        computed: {
            login() {
                return this.$store.getters.getLogin;
            },
            title() {
                return this.$store.getters.getTitle;
            },
            avatar() {
                return this.$store.getters.getAvatar;
            }
        },
        components: {
            loginModal
        },
        methods: {
            logout() {
                this.$store.dispatch('logout');
            }
        }
    }
</script>
<style>
    #menu_list button{
        margin:0;
        color:white;
        width: 100%;
        height:100%;
    }
    .toolbar__content{

    }
    header{
        padding-bottom: 40px;
    }
    header a{
        text-decoration: none;
    }
    @media screen and (max-width: 768px) {
        header{
            padding-bottom: 20px;
        }
    }
</style>
