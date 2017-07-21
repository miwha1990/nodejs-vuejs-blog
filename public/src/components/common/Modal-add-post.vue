<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent width="768px">
            <v-btn fab large class="deep-orange lighten-2 white--text btn--floating" light id="add_button" slot="activator">
                <span class="white--text">
                    <v-icon dark>add</v-icon>
                </span>
            </v-btn>
            <v-card>
                <v-card-title>
                    <span class="headline">Add new post</span>
                </v-card-title>
                <v-card-text>
                    <v-text-field label="Title" v-model="form.title" required></v-text-field>
                    <v-text-field label="Content" v-model="form.content" multi-line required></v-text-field>
                    <v-layout row wrap>
                        <v-flex xs12 sm6>
                            <v-menu
                                    lazy
                                    :close-on-content-click="false"
                                    v-model="menu"
                                    transition="v-scale-transition"
                                    offset-y
                                    full-width
                                    :nudge-left="40"
                                    width="100%"

                            >
                                <v-text-field
                                        slot="activator"
                                        label="Posted date"
                                        v-model="form.date"
                                        prepend-icon="event"
                                        readonly
                                ></v-text-field>
                                <v-date-picker v-model="form.date" landscape></v-date-picker>
                            </v-menu>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-select
                                    v-model="form.category"
                                    label="Category"
                                    required
                                    autocomplete
                                    :items="['Work', 'Business', 'Leisure', 'Not Categorised' ]"
                            ></v-select>
                        </v-flex>
                    </v-layout>

                    <Input-File title="Input Image" v-on:selectedCallback="fileSelectedFunc"></Input-File>
                    <v-spacer></v-spacer>
                    <small class="red--text">*indicates required field</small>
                </v-card-text>
                <div style="text-align:right">
                    <v-spacer></v-spacer><v-spacer></v-spacer>
                    <v-btn class="red--text darken-1" flat @click.native="dialog = false">Close</v-btn>
                    <v-btn class="blue--text darken-1" v:bind:type="submit" type="submit" flat @click.native="submitForm">Save</v-btn>
                </div>
            </v-card>
            <v-alert class="green" dismissible transition="scale-transition" v-model="alert">
                Post Created
            </v-alert>
        </v-dialog>
    </v-layout>
</template>
<script>
    import InputFile from './InputFile.vue';
    export default {
        data () {
            return {
                alert:false,
                form:{},
                dialog: false,
                menu: false,
                modal: false,
            }
        },
        components : {
            InputFile
        },
        computed: {
            login(){return this.$store.getters.getLogin;}
        },
        methods: {
            fileSelectedFunc(e) {
                this.form.imageUrl = e;
            },
            submitForm(e) {
                console.log(this.form);
                e.preventDefault();
                const formData = new FormData();
                Object.entries(this.form).forEach(e => {
                    formData.append(e[0], e[1]);
                });

                this
                    .$http.post('http://localhost:8000/api/posts/new_post', formData)
                    .then(this.onComplete.bind(this))
                    .catch(this.onError.bind(this));
            },
            onComplete(e){
                this.alert = true;
                this.$store.commit('ADD_POST', e.body);
                setTimeout(()=> {this.dialog = false;this.alert = false}, 1500);
            },
            onError(e) {
                console.error(e)
            }
        }
    }
</script>
<style>
    .dialog > .card{
        padding: 20px ;
    }
</style>