<template>
    <header class="header" ref="header">
        <div class="header__container">
            <RouterLink to='/' class='header__logo'>
                NEWS
            </RouterLink>
            <ul class="header__nav" :class="{'burger-menu-active': isBurgerOpen}">
                <li class="header__item">
                    <input 
                        type="text" 
                        class="header__search" 
                        placeholder="Find news..."
                        :value='serchText'
                        @input='findNews'
                        :class="{'unclickable': news.length === 0}"
                    >                    
                </li>
                <li class="header__item param">
                    <select class="param__list" v-model='countryName' @change="$store.dispatch('getNewsArr')">
                         <option 
                            class='param__item' 
                            v-for="country in countries" 
                            :value="country.abrv" 
                            :key='country.abrv'
                        >
                        {{country.fullname}}
                        </option>
                    </select>
                </li>
                <li class="header__item param">
                    <select class="param__list" v-model='categoryName' @change="$store.dispatch('getNewsArr')">
                         <option 
                            class='param__item' 
                            v-for="(category, index) in categories" 
                            :value="category.value" 
                            :key='index'
                        >
                        {{category.title}}
                        </option>
                    </select>
                </li>
            </ul>
            <div 
                class="header__burger" 
                @click="toggleBurger"
                :class="{'burger-btn-active': isBurgerOpen}"
            >
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </header>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data(){
        return {
            serchText: '',
            isBurgerOpen: false,
        }
    },
    methods: {
        findNews(event){
            const newsPosition = this.getCoords(document.querySelector('.news__main-block')).top;
            window.scrollTo({
                top: newsPosition,
                behavior: 'smooth'
            })
            this.serchText = event.target.value;
            console.log(document.querySelector('.news__main-block'));
            this.$store.commit('searchNews', this.serchText);
        },
        getCoords(elem) {
            let box = elem.getBoundingClientRect();
            let body = document.body;
            let docEl = document.documentElement;
            let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
            let scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
            let clientTop = docEl.clientTop || body.clientTop || 0;
            let clientLeft = docEl.clientLeft || body.clientLeft || 0;
            let top  = box.top +  scrollTop - clientTop;
            let left = box.left + scrollLeft - clientLeft;
            return { top: Math.round(top), left: Math.round(left) };
        },
        toggleBurger(){
            this.isBurgerOpen = !this.isBurgerOpen;
            document.body.classList.toggle('lock')
        }
    },
    mounted(){
        if(pageYOffset > 40){
            this.$refs.header?.classList.add('srolled')
        }
        else{
            this.$refs.header?.classList.remove('srolled')
        }
        window.addEventListener('scroll',()=>{
            if(pageYOffset > 40){
                this.$refs.header?.classList.add('srolled')
            }
            else{
                this.$refs.header?.classList.remove('srolled')
            }
        })
    },
    computed: {
        ...mapGetters(['countries','categories','news']),
        countryName: {
            get(){
                return this.$store.state.countryName;
            },
            set(value) {
                const params = new URLSearchParams(window.location.search);
                params.set('country', value);
                console.log(window.location.pathname)
                const newUrl = window.location.pathname + '&' + params.toString();
                window.history.pushState({}, '', newUrl);
                this.$store.commit('changeNewsCountry', value);
            }
        },
        categoryName: {
            get(){
                return this.$store.state.categoryName;
            },
            set(value) {
                this.$store.commit('changeNewsCategory', value);
            }
        },
    }
}
</script>

<style lang="scss">

.header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    padding: 5px 0;
    z-index: 100;
    transition: all .4s ease 0s;
    &.srolled{
        background: #04143c;
        .header__container{
            border-bottom: none;
        }
    }

    &__container {
        display: flex;
        padding: 10px 15px;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px groove #fff;
    }

    &__logo {
        font-size: 2rem;
        font-weight: 700;
        text-transform: uppercase;
        color: #fff;
        transition: all .4s ease 0s;

        &:hover{
            color: #d1cece;
        }
    }

    &__nav {
        display: flex;
        align-items: center;
        @media all and (max-width: 48em) {
            padding: 80px 40px;
            display: block;
            position: fixed;
            left: -100%;
            top: 0;
            width: 100%;
            height: 100%;
            background: #04143cd6;
            color: #000;
            overflow: auto;
            text-align: right;
            transition: all .4s ease 0s;
        }
    }

    &__item{
        margin-left: 20px;
        color: #fff;
        font-size: 1rem;
    }

    &__search{
        padding: 5px 8px;
        transition: all .4s ease 0s;
        outline: none;
        border: none;
        &:focus{
            outline: none;
            box-shadow: 0px 0px 10px #fff;
        }
        @media all and (max-width: 48em) {
            width: 100%;
            padding: 10px 15px;
            margin-bottom: 20px;
        }
    }

    &__burger{
        display: none;
        @media all and (max-width:48em) {
            background: none;
            position: relative;
            z-index: 100;
            display: block;
            width: 35px;
            height: 30px;
            transition: all .4s ease 0s;
            div{
                position: relative;
                width: 100%;
                height: 1px;
                background: #fff;
                transition: all .4s ease 0s;
                margin: 0px 0px 9px 0px;
                &:last-child{
                    margin-bottom: 0;
                }
            }
            p{
                position: absolute;
                left: -3px;
                bottom: 3px;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: red;
            }
        }
    }
}

.param{
    &__list{
        padding: 4.5px 8px;
        &:focus{
            outline: none;
        }
        @media all and (max-width: 48em) {
            width: 100%;
            padding: 10px 15px;
            margin-bottom: 20px;
        }
    }
    &__item{
        text-transform: capitalize;
    }
}

.burger-btn-active{
    div{
        &:nth-child(1){
            transform-origin: center right;
            top: -3px;
            transform: rotate(-45deg);
        }
        &:nth-child(2){
            transform: scale(0);
        }
        &:nth-child(3){
            transform-origin: center right;
            bottom: -2px;
            transform: rotate(45deg);
        }
    }
}

.burger-menu-active{
    left: 0;
}

.unclickable{
    pointer-events: none;
}

</style>