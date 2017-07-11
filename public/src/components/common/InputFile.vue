<template>
    <div class="common">
        <v-text-field
                id="input_text"
                @click.native="clicked"
                v-bind:label="title"
                v-bind:value="file"
                prepend-icon="image"
                readonly
                :append-icon="'clear'"
                :append-icon-cb="clear"
        ></v-text-field>

        <input id="selectFile" type="file" v-on:change="fileSelected">
        <div style="clear:both"></div>
    </div>


</template>

<script>
    export default {
        data() {
            return {
                file:''
            }
        },
        props: {
            title: String
        },
        methods: {
            clear(e) {
                e.cancelBabel = true;
                this.file = '';
            },
            clicked(e){
                e.cancelBabel = true;
                e.preventDefault();
                if(e.target.getAttribute('id') === 'input_text') {
                    document.getElementById('selectFile').click();
                }

            },
            fileSelected(e) {
                if (e.target.files[0]) {
                    this.file = e.target.files[0].name;
                    this.$emit('selectedCallback', e.target.files[0]);
                } else {
                    this.$emit('selectedCallback', null);
                }
            },
        }
    }
</script>

<style scoped>
    .common{
        width: 100%;
        position: relative;
    }

    #selectFile {
        visibility: hidden;
        position: absolute;
        top: 0;
        right: 0;
        min-width: 100%;
        min-height: 100%;
        font-size: 100px;
        text-align: right;
        filter: alpha(opacity=0);
        opacity: 0;
        outline: none;
        cursor: inherit;
        display: block;
    }
</style>