<template>
    <div>
        <v-card-title>
            <span class="headline">Register a new user</span>
        </v-card-title>
        <v-card-text>
            <v-text-field
                    prepend-icon="person_outline"
                    label="First name"
                    v-model="form.firstName"
                    type="text"
                    required
            ></v-text-field>
            <v-text-field
                    prepend-icon="person_outline"
                    label="Last name"
                    v-model="form.lastName"
                    type="text"
            ></v-text-field>
            <v-text-field
                    prepend-icon="mail_outline"
                    label="Enter your email"
                    v-model="form.email"
                    type="email"
                    required
            ></v-text-field>
            <v-text-field
                    v-model="form.password"
                    label="Enter your password"
                    hint="At least 6 characters"
                    min="6"
                    prepend-icon="lock_outline"
                    :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                    :append-icon-cb="() => (showPassword = !showPassword)"
                    :type="showPassword ? 'password' : 'text'"
                    required
            ></v-text-field>
            <v-text-field
                    v-model="form.password2"
                    label="Repeat password"
                    prepend-icon="lock_outline"
                    :type="'text'"
                    required
            ></v-text-field>
            <div class="avatar_input">
                <VueImgInputer
                        v-model="form.file"
                        theme="light"
                        size="small"
                        accept=""
                        name="file"
                        bottomText="Select another image"
                        placeholder="Select your avatar"
                ></VueImgInputer>
            </div>
            <br>
            <v-btn
                    success
                    :loading="loading"
                    @click.native="submit"
                    :disabled="loading"
            >
                Submit
                <span slot="loader">Loading...</span>
            </v-btn>
            <v-spacer></v-spacer>
        </v-card-text>
    </div>
</template>
<script>
import VueImgInputer from 'vue-img-inputer';
    export default {
        data() {
            return {
                file:null,
                form: {},
                showPassword: true,
                loader: null,
                loading: false,
            }
        },
        computed: {
            login() {
                return this.$store.getters.getLogin;
            }
        },
        components: {
            VueImgInputer
        },
        methods: {
            submit() {
                if(this.form.password === this.form.password2){
                    this.loader = 'loading';
                    const vm = this;
                    const data = {};
                    const l = vm.loader;
                    this[l] = !vm[l];

                    data.data = vm.form;
                    data.url = this.$store.state.apiUrl+'/api/new-users/add';

                    const formData = new FormData();

                    Object.entries(data.data).forEach(e => {
                        formData.append(e[0], e[1]);
                    });

                    this
                        .$http.post(data.url, formData)
                        .then((res)=>{
                            if(res.success) {
                                vm.$emit('alertMessage', {msg: res.msg, color: res.success});
                            }
                            vm[l] = false;
                        })
                        .catch(e=>console.log(e));

                    vm.loader = null
                }
            }
        }
    }
</script>
<style>
    .avatar_input{
        display: flex;
        justify-content: center;
    }
    .vue-dropzone .dz-image{
        border-radius:50%;
    }
</style>
