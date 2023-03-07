<template>
    <div class='wrapper'>
        <NewsHeader />
        <NewsList />
        <NewsFooter />
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import NewsHeader from '../components/NewsHeader';
import NewsList from '../components/NewsBody';
import NewsFooter from '@/components/NewsFooter.vue';
export default {
    components: {
        NewsHeader,
        NewsList,
        NewsFooter
    },
    async mounted(){
        this.getNewsArr;
    },
    computed: {
        ...mapActions(['getNewsArr'])
    }
}
</script>