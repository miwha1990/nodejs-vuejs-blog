<template>
    <v-layout row justify-center>

        <v-dialog v-model="dialog2" lazy absolute width="380px">
            <span slot="activator"  class="text-xs-left">Login</span>
            <v-card  class="pb-2">
                <login v-if="switcher" v-on:alertMessage="alertMsg"></login>
                <register  v-on:alertMessage="alertMsg" v-else></register>
                <v-spacer></v-spacer>
                <p class="text-xs-right ma-0">
                    <v-btn small v-if="switcher" @click.native.stop="switcher = !switcher" outline class="deep-orange--text text--lighten-2">Register</v-btn>
                    <v-btn small outline @click.native.stop="switcher = !switcher" class="deep-orange--text text--lighten-2" v-else >Login</v-btn>
                </p>
            </v-card>
            <v-spacer></v-spacer>
            <v-alert v-bind:class="alert_color ? 'green' : 'red'" dismissible transition="scale-transition" v-model="alert">
                {{alert_msg}}
            </v-alert>
        </v-dialog>
    </v-layout>
</template>
<script>
    import login from './Modal-inner-login.vue';
    import register from './Modal-inner-registration.vue';
    export default {
        data() {
          return {
              alert: false,
              alert_msg:'',
              alert_color:'',
              switcher: true
          }
        },
        computed: {
          dialog2(){
              return this.modal;
          }
        },
        methods: {
          alertMsg(e) {
              const vm = this;
              vm.alert = true;
              vm.alert_msg = e.msg;
              vm.alert_color = e.color;
              setTimeout(()=>{
                  vm.dialog2 = false;
                  vm._computedWatchers.dialog2.value = false;
                  vm.alert = false;
                  if(e.color && e.login) {vm.$store.dispatch('authenticate');}
              }, 1500);
          }
        },
        props:['modal'],
        components: {login, register}

    }
</script>