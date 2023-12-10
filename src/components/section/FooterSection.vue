<template>
    <footer id="footer" role="banner">
        <a href="">
            <h1 class="logo">
                ON MOVIE
            </h1>
        </a>
        <p>Copyright ⓒ 2023 JinHoMoon.All rights reserved.</p>
            <nav class="nav">
                <ul>
                    <li><a href="/">홈</a></li>
                    <li><a href="https://github.com/jinhomun">GITHUB</a></li>
                    <li><a href="mailto:answlsgh95@gmail.com">MAIL</a></li>
                </ul>
            </nav>
    </footer>
</template>
<style lang="scss">
#footer {
    width: 100%;
    height: 100px;
    padding: 1rem;
    display: flex;
    align-items: center;
    top: 0;
    background-color: #000000;
    justify-content: space-between;

    p {
        font-size: 1rem;
        font-weight: bold;
    }
    .logo {
        width: 200px;
        height: 50px;
        line-height: 50px;
        font-size: 1.5rem;
        font-weight: bold;
        text-align: center;
        background-color: #ff0000;
        margin-right: 5rem;
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
                        color: #F80147;
                    }
                }
            }
        }
    }
}
</style>