<template>
    <aside>
        <section>
            <h5 class="deep-orange white--text lighten-2 text-xs-center">Categories</h5>
            <v-list>
                <template v-for="cat in categories">
                    <v-list-tile>
                        <v-list-tile-content>
                            <router-link :to="`/posts\?category=`+ cat">
                                <v-list-tile-title v-html="cat"></v-list-tile-title>
                            </router-link>
                            <!--<v-list-tile-title v-html="cat" v-on:click="filter(cat)"></v-list-tile-title>-->
                         </v-list-tile-content>
                    </v-list-tile>
                </template>
            </v-list>
        </section>
        <section>
            <v-date-picker v-model="picker"></v-date-picker>
        </section>
    </aside>
</template>
<script>
    export default {
        data(){
            return {
                picker:'',
                categories: ['All', 'Work', 'Leisure', 'Business', 'Learning', 'Not Categorized']
            }
        },
        methods: {

        }
    }
</script>
<style scoped>
    section{
        background: white;
        box-shadow: 0 3px 10px rgba(0,0,0,.23), 0 3px 10px rgba(0,0,0,.16);
        margin-bottom: 40px;
    }
    h5{
        padding: 10px;
        margin-bottom: 0;
    }
    a.list__tile:hover{
        background: rgba(162, 211, 255, 0.57);
        cursor: pointer;
    }
    .picker--date{
        box-shadow: none;
        width: 100%;
    }
</style>