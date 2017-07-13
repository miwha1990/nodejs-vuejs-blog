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
            <v-btn
                    class="ma-3 facebook"
                    primary
                    dark
                    @click.native="faceLog"
            >

                Via Facebook
            </v-btn>
            <a href="http://localhost:8000/auth/facebook">LOOOOOG</a>
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
            }
        },
        methods: {
            faceLog() {
                this.$http.get(
                    'http://localhost:8000/auth/facebook'
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
                data.url = 'http://localhost:8000/auth/login';
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