<template>
    <div>
        <v-card-title>
            <span class="headline">Enter your credentials</span>
        </v-card-title>
        <v-card-text>
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
            <v-menu :nudge-width="100">
                <v-list-tile-title slot="activator">
                    <span style="vertical-align: middle" >Log via socials</span>
                    <v-icon dark >arrow_drop_down</v-icon>
                </v-list-tile-title>
                <v-list>
                    <v-list-tile >
                        <a :href="apiUrl+'http://localhost:8000/auth/facebook'" class="pa-2 facebook primary ma-3 btn btn--dark">Facebook</a>
                    </v-list-tile>
                    <v-list-tile >
                        <a :href="apiUrl+'http://localhost:8000/auth/google'" class="pa-2 facebook error ma-3 btn btn--dark">Google</a>
                    </v-list-tile>
                    <v-list-tile >
                        <a :href="apiUrl+'http://localhost:8000/auth/twitter'" class="pa-2 facebook info ma-3 btn btn--dark">Twitter</a>
                    </v-list-tile>
                </v-list>
            </v-menu>

            <v-btn
                    success
                    :loading="loading"
                    @click.native="submit"
                    :disabled="loading"
            >
                Log in
                <span slot="loader">Loading...</span>
            </v-btn>
            <v-spacer></v-spacer>
        </v-card-text>
    </div>

</template>
<script>
    export default {
        data() {
            return {
                form: {},
                showPassword: true,
                loader: null,
                loading: false,
                apiUrl: this.$store.state.apiUrl
            }
        },
        methods: {
            faceLog() {
                this.$http.get(
                    this.$store.state.apiUrl+'/auth/facebook'
                ).then((res) => {
                    console.log(res);
                });
            },
            submit() {
                this.loader = 'loading';
                const vm = this;
                const data = {};
                const l = vm.loader;
                this[l] = !vm[l];

                data.data = vm.form;
                data.url = this.$store.state.apiUrl+'/auth/login';
                vm.$store.dispatch('login', data).then(res=>{
                    if(res.success) {
                        vm.$emit('alertMessage', {msg: res.msg, color: res.success, login:true});
                    } else {
                        vm.$emit('alertMessage', {msg: res.body.msg, color: res.ok});
                    }
                    vm[l] = false;
                });
                vm.loader = null
            }
        }
    }
</script>
<style>
    .facebook i{
        width: 15px;
        height: 15px;
        color:white !important;

    }
</style>