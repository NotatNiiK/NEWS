<template>
    <div class="wrapper">
        <div class="introduction">
            <div class='introduction__video'>
                <video autoplay muted loop>
                    <source src="../assets/video/background.webm" type="video/webm">
                    <source src="../assets/video/background.mp4" type="video/mp4">
                </video>
            </div>
            <div class="introduction__body">
                <Transition name="intro-title" appear>
                    <h1 class="introduction__title">News</h1>
                </Transition>
                <Transition name="intro-button" appear>
                    <RouterLink class='introduction__link' to='/news'>Read</RouterLink>
                </Transition>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.introduction {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

	&__video {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;

        video{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        &::before{
            content: '';
            position: absolute;
            z-index: 2;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
        }
	}

	&__body{
        position: relative;
        z-index: 3;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

	&__title {
        font-size: 5rem;
        font-weight: 700;
        line-height: 140%;
        letter-spacing: 15px;
        color: #fff;
        text-transform: uppercase;
        
        @media all and (max-width: 48em) {
            font-size: 3.5rem;
        }
	}

	&__link {
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 14rem;
        min-width: 10rem;
        padding: 8px;
        background: transparent;
        border: 2px solid #fff;
        border-radius: 5px;
        margin: 5px 0;
        text-decoration: none;
        font-size: 1.5rem;
        color: #fff;
        line-height: 120%;
        transition: all .4s ease 0s;

        @media all and (min-width: 62em){
            &:hover{
                background: #fff;
                color: #000;
            }
        }
    }
}

.intro-title-enter-active,
.intro-title-leave-active,
.intro-button-enter-active,
.intro-button-leave-active {
  transition: all 0.8s ease 0s;
}

.intro-title-enter-from,
.intro-title-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}

.intro-button-enter-from,
.intro-button-leave-to {
  opacity: 0;
  transform: translateY(50px);
}

</style>