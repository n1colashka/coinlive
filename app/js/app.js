document.addEventListener('DOMContentLoaded', function() {


    function initMenu() {
        const menuBtn = document.querySelector('.header__menu-btn');
        const menu = document.querySelector('.header__navigation');
        const navigationLinks = document.querySelectorAll('.header__navigation li a');
        const html = document.querySelector('html');
        
        if (document.documentElement.clientWidth <= 750) {
            menuBtn.addEventListener('click', function() {
                menu.classList.toggle('active');
                menuBtn.classList.toggle('active');
                html.classList.toggle('overflow-hidden');
            })

            const menuLists = document.querySelectorAll('.menu__list a');
            menuLists.forEach(list => {
                list.addEventListener('click', function() {
                    if (list.parentElement.classList.contains('menu__list')) {
                        if (list.parentElement.classList.contains('open')) {
                            list.parentElement.classList.remove('open');
                        } else {
                            list.parentElement.classList.add('open');
                        }
                    }
                })
            })
        }
    }

    function initMenu750() {
        if (document.documentElement.clientWidth <= 1024 && document.documentElement.clientWidth > 750) {
            $('.menu__list').on('click', function() {
                $(this).addClass('open');
            })
            $('body').on('click', function(e) {
                if (e.target.closest('.menu__list')) {
                    $(e.target.closest('.menu__list')).addClass('open');
                } else {
                    $('.menu__list').removeClass('open');
                }
            })
        }
        
    }

    function initClientsSlider() {
        if (document.querySelector('.clients__slider')) {
            var swiper = new Swiper('.clients__slider', {
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                    type: 'fraction',
                    clickable: true,
                },
                spaceBetween: 35
            });
        }
    }

    function changeHeader() {
        const header = document.querySelector('.header');

        window.addEventListener('scroll', function() {
            if (window.pageYOffset >= 90) {
                header.classList.add('fixed');
            } else {
                header.classList.remove('fixed');
            }
        })

    }

    function showCreditsItems() {
        if ($('.credits__item').length > 0) {
            $(".credits__item").hide();
            $(".credits__item").each(function(index){
                $(this).delay(index*500).fadeIn(1000);
            });
        }
    }

    function showMore() {
        if ($('.about__btn').length > 0) {
            $('.about__btn').on('click', function(e){
                e.preventDefault();
                $('.about__btn').hide(500);
                $('.about__text').addClass('open');
            })
        }
    }

    function initAnswersAccordion() {
        const answers = document.querySelectorAll('.answers__item');
        if (answers.length > 0) {
            $('.answers__item-title').on('click', function (){
                $(this).parent('.answers__item').toggleClass('active');
            })
        }
    }
    
    initMenu();
    initClientsSlider();
    changeHeader();
    showCreditsItems();
    showMore();
    initAnswersAccordion();
    initMenu750();
})