<template>
    <div class="text-xs-center">
        <v-pagination v-bind:length.number="Math.ceil(total / limit)" v-model="this_page" v-on:input="changed"></v-pagination>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                this_page: this.page+1,
            }
        },
        props: ['page', 'total', 'limit'],
        methods: {
          changed(e) {
              if(e !== this.this_page) this.$emit('updatePageIndex', e);
              this.$emit('@update:page', e)

          }
        }
    }
</script>