document.addEventListener('DOMContentLoaded', function() {

    function initTogglePassword() {
        const passwordToggleBtn = document.querySelector('.password-eye');
        function togglePassword() {
            var x = document.querySelector(".form__password");
            if (x.type === "password") {
                x.type = "text";
            } else {
                x.type = "password";
            }
        }
        passwordToggleBtn.addEventListener('click', togglePassword);
    }
    
    initTogglePassword();

    function initMenu() {
        const menuBtn = document.querySelector('.header__menu-btn');
        const menu = document.querySelector('.header__inner');
        const navigationLinks = document.querySelectorAll('.header__navigation li a');
        const html = document.querySelector('html');
        menuBtn.addEventListener('click', function() {
            menu.classList.toggle('active');
            menuBtn.classList.toggle('active');
            html.classList.toggle('overflow-hidden');
        })
        if (document.documentElement.clientWidth < 1025) {
            navigationLinks.forEach(item => {
            item.addEventListener('click', () => {
                menu.classList.remove('active');
                menuBtn.classList.remove('active');
                html.classList.remove('overflow-hidden');
            })
        })
        }
    }

    function initHeroSlider() {
        var swiper = new Swiper('.hero__slider', {
            loop: true,
            allowTouchMove: false,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }

    function initGamesSlider() {
        var swiper = new Swiper('.games__slider', {
            loop: true,
            slidesPerView: 3,
            spaceBetween: 30,
            allowTouchMove: false,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                },
                480: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 3,
                },
                
            }
        });
    }

    function initPartnersSlider() {
        var swiper = new Swiper('.partners__slider', {
            loop: true,
            slidesPerView: 3,
            spaceBetween: 30,
            allowTouchMove: false,
            navigation: {
                nextEl: '.partners__next',
                prevEl: '.partners__prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                },
                480: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 3,
                },
                
            }
        });
    }

    function initProvidersSlider() {
        var swiper = new Swiper('.providers__slider', {
            loop: true,
            slidesPerView: 3,
            spaceBetween: 30,
            allowTouchMove: false,
            navigation: {
                nextEl: '.providers__next',
                prevEl: '.providers__prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                },
                600: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 3,
                },
                1024: {
                    slidesPerView: 4,
                },
                
            }
        });
    }
    
    function initModals() {
        document.querySelectorAll('[data-micromodal-trigger]').forEach(function(item){
            item.addEventListener('click', function(e) {
                e.preventDefault();

                document.querySelector('.header__inner').classList.remove('active');
                document.querySelector('.header__menu-btn').classList.remove('active');
                document.querySelector('html').classList.remove('overflow-hidden');
            })
        })
        document.querySelector('.modal__registration').addEventListener('click', function() {
            MicroModal.close('modal-2');
            MicroModal.show('modal-1');
            document.querySelector('html').classList.add('overflow-hidden');
        })
        document.querySelector('.modal__sign').addEventListener('click', function() {
            MicroModal.close('modal-1');
            MicroModal.show('modal-2');
            document.querySelector('html').classList.add('overflow-hidden');
        })

        MicroModal.init({
            onShow: modal => document.querySelector('html').classList.add('overflow-hidden'), // [1]
            onClose: modal => document.querySelector('html').classList.remove('overflow-hidden'), // [2]
        });
    }

    function initScrollToBlock() {
        document.querySelectorAll('a[href^="#"').forEach(link => {

            link.addEventListener('click', function(e) {
                e.preventDefault();

                let href = this.getAttribute('href').substring(1);
        
                const scrollTarget = document.getElementById(href);
                const topOffset = 100;
                const elementPosition = scrollTarget.getBoundingClientRect().top;
                const offsetPosition = elementPosition - topOffset;
        
                window.scrollBy({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }
    
    initMenu();
    initHeroSlider();
    initGamesSlider();
    initPartnersSlider();
    initProvidersSlider();
    initModals();
    initScrollToBlock();
})