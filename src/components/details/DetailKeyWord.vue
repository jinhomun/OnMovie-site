<template>
    <div class="detail__keyward">
        <div class="container">
            <div class="keyword__wrap">
                <ul class="keyword__type">
                    <li class="keyword__name" v-for="keyword in movieKeyWord.keywords" :key="keyword.id">
                        <span>{{ keyword.name }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        movieKeyWord: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="scss">
.detail__keyward {
    margin-top: 10px;

    .keyword__wrap {
        // padding: 20px;
        width: 100%;

        .keyword__type {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;

            .keyword__name {
                margin: 0 10px 10px 0;
                padding: 5px 10px;
                border: 1px solid var(--black200);
                border-radius: 5px;
                background-color: var(--black200);

                span {
                    color: var(--white);
                    display: inline-block;
                    width: 100%;
                    font-size: 1rem;
                }
            }
        }
    }
}

@media (max-width:1450px) {
    .detail__keyward {
        .keyword__wrap {
            .keyword__type {
                .keyword__name {
                    span {
                        font-size: 0.8rem;
                    }
                }
            }
        }
    }
}

@media (max-width:1130px) {
    .detail__keyward {
        .keyword__wrap {
            .keyword__type {
                .keyword__name {
                    span {
                        font-size: 0.7rem;
                    }
                }
            }
        }
    }
}

@media (max-width:940px) {
    .detail__keyward {
        .keyword__wrap {
            .keyword__type {
                .keyword__name {
                    span {
                        font-size: 0.6rem;
                    }
                }
            }
        }
    }
}

@media (max-width:800px) {
    .detail__keyward {
        .keyword__wrap {
            .keyword__type {
                margin: 0 10px 5px 0;
                .keyword__name {
                    span {
                        font-size: 0.8rem;
                    }
                }
            }
        }
    }
}
</style>