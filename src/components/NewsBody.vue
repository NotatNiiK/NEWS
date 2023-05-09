<template>
    <div class="news">
        <div class='news__intro'>
            <div class="news__container news__container_intr">
                <div class='news__main-news'>
                    <div class="news__main-author">{{mainNews?.author}}</div>
                    <div class="news__main-title">{{mainNews?.title}}</div>
                    <a :href='mainNews?.url' class="news__main-link" v-if="mainNews?.url"><span>Read more</span></a>
                </div>
            </div>
            <div class="news__arrow">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <div class="news__main-block">
            <div class="news__container">
                <div class='news__content' v-if='news.length && !isError'>
                    <ul class="news__list">
                        <TransitionGroup name="list">
                            <li class="news__item" v-for="article in news" :key="article.title">
                                <a :href="article.url" class="news__body" :title="article.author">
                                    <div class="news__img" v-if="article.urlToImage">
                                        <img 
                                            v-if="article.urlToImage" 
                                            :src="article.urlToImage" 
                                            :alt="article.author" 
                                            @error="e => e.target.src = img404"
                                        >
                                    </div>
                                    <div class="news__title">{{ article.title }}</div>
                                    <div class="news__text" v-html="article.description"></div>
                                    <div class="news__author">{{ article.author }}</div>
                                    <div class="news__published-at">{{ formatDate(article.publishedAt) }}</div>
                                </a>
                            </li>
                        </TransitionGroup>
                    </ul>
                    <div class='news__pagination' v-show="$store.state.searchParam.length === 0">
                        <button 
                            class="news__btn"
                            v-for='n in pages' 
                            :key="n" 
                            @click="changePage(n, $event)"
                            :class="[n == pageFromURL? 'active': '']"
                        >
                        {{n}}
                        </button>
                    </div>
                </div>
                <p 
                    class="news__not-found" 
                    v-else-if="notFound"
                >
                    OPPS... NOT FOUND
                </p>
                <span class="loader" v-else></span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
export default {
    data() {
        return {
            pageFromURL: null,
            btns: 0,
            img404: 'https://vaksi.by/design/verona/images/no_image.png',
        }
    },
    methods: {
        formatDate(date){
            let fullYear = date.slice(11, 16) + ' - ' + date.slice(0,10).split('-').reverse().join('.');
            return fullYear;
        },
        changePage(n, event){
            this.saveChangesInURL('page', n);
            document.querySelectorAll('.news__btn').forEach(item => {
                item.classList.remove('active');
                item.disabled = false;
            });
            event.target.classList.add('active');
            event.target.disabled = true;
            this.$store.commit('changePage', n);
            this.$store.dispatch('getNewsArr');
            window.scrollTo(0,0);
        },
        saveChangesInURL(param, value){
            const params = new URLSearchParams(window.location.search);
            params.set(param, value);
            const newUrl = window.location.pathname + '?' + params.toString();
            window.history.pushState({}, '', newUrl);
        },
    },
    mounted(){
        const params = new URLSearchParams(window.location.search);
        if(!params.get('page')){
            this.pageFromURL = 1;
            this.saveChangesInURL('page', this.pageFromURL);
        }
        else{
            const currentPage = params.get('page');
            this.pageFromURL = currentPage;
            this.$store.commit('changePage', currentPage);
        }
    },
    computed: {
        ...mapGetters(['news','mainNews','pages','isError']),
        ...mapState(['page']),
        notFound(){
            return this.news.length === 0 && this.$store.state.searchParam.length > 0;
        },
    },
}
</script>

<style lang='scss'>

.news {
    flex: 1 1 auto;
    background: #e4e1e1;

    &__intro{
        position: relative;
        min-height: 100vh;
        position: relative;
        background: url('../assets/img/mainBg.jpg') center / cover no-repeat fixed;

        &::before{
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: #00000083;
        }
    }

    &__container{
        &_intr{
            padding: 100px 15px;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
    }

    &__main-news{
        position: relative;
        z-index: 5;
        color: #fff;
        max-width: 50rem;
    }

    &__arrow {
        position: absolute;
        bottom: 5%;
        left: 50%;
        transform: translateX(-50%);
        width: 50px;
        height: 80px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: none;

        span {
            display: block;
            transform: rotate(-45deg);
            border-left: 3px solid #fff;
            border-bottom: 3px solid #fff;
            animation: arrow-anim 1s ease infinite alternate;
            transition: all .4s ease 0s;

            &:nth-child(3) {
                width: 20px;
                height: 20px;
                animation-delay: 0.1s;
            }

            &:nth-child(2) {
                width: 22px;
                height: 22px;
                animation-delay: 0.2s;
                border-color: rgb(207, 206, 206);
            }

            &:nth-child(1) {
                width: 25px;
                height: 25px;
                animation-delay: 0.3s;
                border-color: rgb(171, 169, 169);
            }
        }
    }

    &__main-author{
        font-size: 1.5rem;
        text-transform: uppercase;
        font-weight: 600;
        letter-spacing: 2px;
        margin-bottom: 20px;
        @media all and (max-width: 48em){
            font-size: 1.3rem;
        }
    }

    &__main-title{
        font-size: 3rem;
        line-height: 150%;
        margin-bottom: 30px;
        @media all and (max-width: 62em){
            font-size: 2.5rem;
        }
        @media all and (max-width: 48em){
            font-size: 2rem;
        }
        @media all and (max-width: 30em){
            font-size: 1.5rem;
        }
    }

    &__main-link{
        position: relative;
        border: 1px solid #fff;
        border-radius: 5px;
        color: #fff;
        padding: 10px 18px;
        transition: all .4s ease 0s;
        overflow: hidden;

        span{
            position: relative;
            z-index: 2;
        }

        &::before{
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 0;
            border-radius: 5px;
            height: 100%;
            background: #fff;
            transition: all .4s ease 0s;
        }
        &:hover{
            color: #000;
        }
        &:hover::before{
            width: 100%;
        }
    }

    &__main-block{
        position: relative;
        min-height: 100vh;
    }

    &__list {
        padding: 100px 0 30px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        row-gap: 40px;
        column-gap: 30px;
        margin-bottom: 40px;
        @media all and (max-width: 62em){
            padding: 50px 0 20px;
        }
        @media all and (max-width: 48em){
            padding: 30px 0 10px;
            margin-bottom: 0;
        }
    }

    &__item {
        flex: 0 0 34.63rem;
        @media all and (max-width: 48em){
            flex: 1 1 auto;
        }
    }

    &__body {
        border-radius: 8px;
        height: 100%;
        color: #000;
        display: flex;
        flex-direction: column;
        border-bottom: 2px solid gray;
        background: url('../assets/img/newsBg.jpg') center / cover fixed no-repeat;
        padding: 20px;
        color: #fff;
        transition: all .4s ease 0s;
        border-bottom: none;
        &:hover{
            box-shadow: 4px 3px 10px #04143c;
        }
        @media all and (max-width: 48em){
            padding: 10px;
        }
    }

    &__img {
        border-radius: 8px;
        overflow: hidden;
        position: relative;
        width: 100%;
        height: 15rem;
        margin-bottom: 10px;
        @media all and (max-width: 48em){
            height: 14rem;
        }
        img{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &__title {
        padding-top: 10px;
        font-size: 1.3rem;
        margin-bottom: 15px;
        line-height: 120%;
    }

    &__author {
        text-transform: uppercase;
        color: #fff;
        font-weight: 700;
        margin-bottom: 10px;
        @media all and (max-width: 48em){
            font-size: 0.875rem;
            margin-bottom: 10px;
        }
    }

    &__text {
        flex: 1 1 auto;
        font-size: 1rem;
        line-height: 140%;
        color: #fff;
        margin-bottom: 15px;
    }

    &__published-at {
        font-weight: 700;
        margin-bottom: 10px;
    }

    &__not-found{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        text-transform: uppercase;
        line-height: 120%;
        text-align: center;
        letter-spacing: 2px;
        font-size: 3rem;
        font-weight: 500;
    }

    &__pagination{
        padding: 10px 0 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        @media all and (max-width: 62em){
            padding: 20px 0;
        }
    }

    &__btn{
        cursor: pointer;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px;
        background: #04143c;
        font-size: 1rem;
        border-radius: 2px;
        color: #fff;
        font-weight: 700;
        text-align: center;
        border: none;
        margin: 0 5px;
        border-radius: 50%;
        transition: all .4s ease 0s;
        margin-bottom: 10px;

        &:hover{
            background: #1d3a74;
        }
        &.active{
            border: 2px solid #1d3a74;
            background: #fff;
            color: #1d3a74;
            transition: all .4s ease 0s;
            &:hover{
                background: #eceaea;
            }
        }
    }
}

.loader {
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 120;
    margin-left: -44px;
    margin-top: -44px;
    width: 5.5rem;
    height: 5.5rem;
    border: 10px solid #d9d9d9;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
} 

@keyframes arrow-anim {
    0% {
        transform: translateY(0px) rotate(-45deg);

    }

    100% {
        transform: translateY(15px) rotate(-45deg);
    }
}

.list-move, 
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}

</style>