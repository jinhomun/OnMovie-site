<template>
    <header id="header" role="banner">
        <a href="/">
            <h1 class="logo">
                ON MOVIE
            </h1>
        </a>
        <!-- <nav class="nav">
            <ul>
                <li><a href="/">홈</a></li>
                <li><a href="#">영화 TOP10</a></li>
                <li><a href="#">코미디영화 TOP10</a></li>
            </ul>
        </nav> -->
    </header>
</template>
<style lang="scss">
#header {
    width: 100%;
    height: 100px;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    /* Center the child items horizontally */
    top: 0;
    background-color: #000000;

    .logo {
        width: 200px;
        height: 50px;
        line-height: 50px;
        font-size: 1.5rem;
        font-weight: bold;
        text-align: center;
        background-color: #ff0000;
    }

    .nav {
        ul {
            display: flex;

            li {

                a {
                    margin-right: 2rem;
                    font-size: 1rem;
                    font-weight: bold;

                    &:hover {
                        color: #ff0000;
                    }
                }
            }
        }
    }
}
</style>