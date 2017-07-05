<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent>
            <v-btn fab large class="deep-orange lighten-2 white--text btn--floating" light id="add_button" slot="activator">
                <span class="white--text">
                    <v-icon dark>add</v-icon>
                </span>
            </v-btn>
            <v-card>
                <v-card-title class="headline">Use Google's location service?</v-card-title>
                <v-card-text>Let Google help apps determine location. This means sending anonymous location data toGoogle, even when no apps are running.</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Disagree</v-btn>
                    <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Agree</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>
<script>
    export default {
        data () {
            return {
                dialog: false
            }
        }
    }
</script>