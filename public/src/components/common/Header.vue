<template>
    <header>
        <v-navigation-drawer temporary v-model="drawer" :mini-variant.sync="mini" dark>
            <v-list class="pa-0">
                <v-list-item>
                    <v-list-tile avatar tag="div">
                        <v-list-tile-avatar>
                            <img src="https://randomuser.me/api/portraits/men/85.jpg" />
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>John Leider</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-btn icon dark @click.native.stop="mini = !mini">
                                <v-icon>chevron_left</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list-item>
            </v-list>
            <v-list class="pt-0" dense>
                <v-divider></v-divider>
                <v-list-item v-for="item in items" :key="item">
                    <v-list-tile>
                        <v-list-tile-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar fixed dark class="primary">
            <div class="toolbar__content">
                <v-toolbar-side-icon @click.native.stop="drawer = !drawer" class="white--text"></v-toolbar-side-icon>
                <v-toolbar-title class="white--text">{{title}}</v-toolbar-title>
            </div>
        </v-toolbar>
    </header>
</template>
<script>
    export default {
        data () {
            return {
                drawer: null,
                items: [
                    { title: 'Home', icon: 'dashboard' },
                    { title: 'About', icon: 'question_answer' }
                ],
                mini: false,
                right: true
            }
        },
        computed: {
            title() {
                return this.$store.getters.getTitle;
            }
        },
        mounted: () => {
        }
    }
</script>
<style>
    header{
        padding-bottom: 80px;
    }
</style>