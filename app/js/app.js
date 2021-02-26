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

    function initHeroReviewSlider() {
        if (document.querySelector('.review-hero__slider')) {
            var swiper = new Swiper('.review-hero__slider', {
                spaceBetween: 60,
                slidesPerView: 'auto',
                breakpoints: {
                    320: {
                        spaceBetween: 40,
                        initialSlide: 2,
                        centeredSlides: true,
                    },
                    750: {
                        spaceBetween: 60,
                        centeredSlides: false,
                    },
                }
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

    function initCircleRating() {
        const circleRatings = document.querySelectorAll('.rating__circle-wrapper');

        if (circleRatings.length > 0) {
            circleRatings.forEach(rating => {
                const circle = rating.querySelector('.rating__circle');
        
                const value = rating.querySelector('.rating__value');
                const valueFrom = rating.querySelector('.rating__from');
                const valueTo = rating.querySelector('.rating__to');
                const radius = circle.r.baseVal.value;
                const circumference = 2 * Math.PI * radius;
                
                circle.style.strokeDasharray = `${circumference} ${circumference}`;
                circle.style.strokeDashoffset = circumference;
                setProgress(value);
    
                function setProgress(value) {
                    let percent = (valueFrom.textContent * 100) / valueTo.textContent;
                    const offset = circumference - percent / 100 * circumference;
                    circle.style.strokeDashoffset = offset;
                }
            })
        }
    }

    function showCreditsItems() {
        if ($('.credits__item').length > 0) {
            
            $(".credits__item").hide();
            $(".credits__item").each(function(index){
                if (this.classList.contains('credits__item--mob-hidden') && document.documentElement.clientWidth <= 550) {
                    $(this).hide();
                } else {
                    $(this).delay(index*500).fadeIn(1000);
                }
            });
        }
    }

    function showMore() {
        if ($('.more__btn').length > 0) {
            $('.more__btn').on('click', function(e){
                e.preventDefault();
                $('.more__btn').hide(500);
                $('.more__text').addClass('open');
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

    function initRatingBars() {
        const bars = document.querySelectorAll('.rating__bar');

        bars.forEach(bar => {
            const value = bar.querySelector('.rating__bar-value span');
            const barFill = bar.querySelector('.rating__bar-fill');
            barFill.style.width = value.textContent * 100 / 5 + '%';
        })
    }

    function initDynamicAdapt() {
        function DynamicAdapt(type) {
            this.type = type;
        }
        
        DynamicAdapt.prototype.init = function () {
            const _this = this;
            // массив объектов
            this.оbjects = [];
            this.daClassname = "_dynamic_adapt_";
            // массив DOM-элементов
            this.nodes = document.querySelectorAll("[data-da]");
        
            // наполнение оbjects объктами
            for (let i = 0; i < this.nodes.length; i++) {
                const node = this.nodes[i];
                const data = node.dataset.da.trim();
                const dataArray = data.split(",");
                const оbject = {};
                оbject.element = node;
                оbject.parent = node.parentNode;
                оbject.destination = document.querySelector(dataArray[0].trim());
                оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
                оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.оbjects.push(оbject);
            }
        
            this.arraySort(this.оbjects);
        
            // массив уникальных медиа-запросов
            this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
                return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
            }, this);
            this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
                return Array.prototype.indexOf.call(self, item) === index;
            });
        
            // навешивание слушателя на медиа-запрос
            // и вызов обработчика при первом запуске
            for (let i = 0; i < this.mediaQueries.length; i++) {
                const media = this.mediaQueries[i];
                const mediaSplit = String.prototype.split.call(media, ',');
                const matchMedia = window.matchMedia(mediaSplit[0]);
                const mediaBreakpoint = mediaSplit[1];
        
                // массив объектов с подходящим брейкпоинтом
                const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
                    return item.breakpoint === mediaBreakpoint;
                });
                matchMedia.addListener(function () {
                    _this.mediaHandler(matchMedia, оbjectsFilter);
                });
                this.mediaHandler(matchMedia, оbjectsFilter);
            }
        };
        
        DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
            if (matchMedia.matches) {
                for (let i = 0; i < оbjects.length; i++) {
                    const оbject = оbjects[i];
                    оbject.index = this.indexInParent(оbject.parent, оbject.element);
                    this.moveTo(оbject.place, оbject.element, оbject.destination);
                }
            } else {
                for (let i = 0; i < оbjects.length; i++) {
                    const оbject = оbjects[i];
                    if (оbject.element.classList.contains(this.daClassname)) {
                        this.moveBack(оbject.parent, оbject.element, оbject.index);
                    }
                }
            }
        };
        
        // Функция перемещения
        DynamicAdapt.prototype.moveTo = function (place, element, destination) {
            element.classList.add(this.daClassname);
            if (place === 'last' || place >= destination.children.length) {
                destination.insertAdjacentElement('beforeend', element);
                return;
            }
            if (place === 'first') {
                destination.insertAdjacentElement('afterbegin', element);
                return;
            }
            destination.children[place].insertAdjacentElement('beforebegin', element);
        }
        
        // Функция возврата
        DynamicAdapt.prototype.moveBack = function (parent, element, index) {
            element.classList.remove(this.daClassname);
            if (parent.children[index] !== undefined) {
                parent.children[index].insertAdjacentElement('beforebegin', element);
            } else {
                parent.insertAdjacentElement('beforeend', element);
            }
        }
        
        // Функция получения индекса внутри родителя
        DynamicAdapt.prototype.indexInParent = function (parent, element) {
            const array = Array.prototype.slice.call(parent.children);
            return Array.prototype.indexOf.call(array, element);
        };
        
        // Функция сортировки массива по breakpoint и place 
        // по возрастанию для this.type = min
        // по убыванию для this.type = max
        DynamicAdapt.prototype.arraySort = function (arr) {
            if (this.type === "min") {
                Array.prototype.sort.call(arr, function (a, b) {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) {
                            return 0;
                        }
        
                        if (a.place === "first" || b.place === "last") {
                            return -1;
                        }
        
                        if (a.place === "last" || b.place === "first") {
                            return 1;
                        }
        
                        return a.place - b.place;
                    }
        
                    return a.breakpoint - b.breakpoint;
                });
            } else {
                Array.prototype.sort.call(arr, function (a, b) {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) {
                            return 0;
                        }
        
                        if (a.place === "first" || b.place === "last") {
                            return 1;
                        }
        
                        if (a.place === "last" || b.place === "first") {
                            return -1;
                        }
        
                        return b.place - a.place;
                    }
        
                    return b.breakpoint - a.breakpoint;
                });
                return;
            }
        };
        
        const da = new DynamicAdapt("max");
        da.init();
    }

    function initAos() {
        AOS.init({
            duration: 700
        });
    }
    
    initMenu();
    initClientsSlider();
    initHeroReviewSlider();
    changeHeader();
    showCreditsItems();
    showMore();
    initAnswersAccordion();
    initMenu750();
    initDynamicAdapt();
    initCircleRating();
    initRatingBars();
    initAos();
})