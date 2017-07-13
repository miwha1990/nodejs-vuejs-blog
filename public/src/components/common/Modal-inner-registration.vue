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
    export default {
        data() {
            return {
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
        methods: {
            submit() {
                if(this.form.password === this.form.password2){
                    this.loader = 'loading';
                    const vm = this;
                    const data = {};
                    const l = vm.loader;
                    this[l] = !vm[l];

                    data.data = vm.form;
                    data.url = 'http://localhost:8000/api/users';
                    vm.$store.dispatch('register', data).then(res=>{
                        if(res.success) {
                            vm.$emit('alertMessage', {msg: res.msg, color: res.success});
                        }
                        vm[l] = false;
                    });
                    vm.loader = null
                }
            }
        }
    }
</script>