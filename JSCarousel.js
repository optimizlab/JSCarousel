/*
 * JSCarousel
 * Version: 1.0.0
 * Author: Rachid HARAKAT
 * Author mail: rachidonline<at>gmail<dot>com
 * Project link: https://optimizlab.github.io/JSCarousel/
 **/


(function () {

    function JSCarousel(args) {
        if (!args)
            return;

        this.carousel = document.querySelector(args.carousel) || null;
        this.slides = this.carousel.querySelectorAll(args.slide) || null;
        this.navButtons = document.querySelector(args.navButtons) || null;

        if (this.navButtons) {
            this.btnIndex = this.navButtons.querySelector(args.btnIndex) || null;
            this.btnNext = this.navButtons.querySelector(args.btnNext) || null;
            this.btnPrev = this.navButtons.querySelector(args.btnPrev) || null;
        }

        this.autoPlay = parseFloat(args.autoPlay) || 0;

        this.carouselWidth = 0;
        this.activeSlideId = 1;
        this.anchorButtons = [];

        this.init();
    }

    JSCarousel.prototype.init = function () {
        /*
         * First our slider is linear and horizontal
         * Make slide container fite to slides with			
         **/

//        console.log(this);

        this.setContainerWidth();

        /*
         * Add buttons indexs
         **/
        if (this.navButtons) {
            this.setAnchorsButton();
        }
        if (this.autoPlay > 0) {
            this.setAutoPlay();
        }

    };
    JSCarousel.prototype.setContainerWidth = function () {
        var i = 0;
        for (i; i < this.slides.length; i++) {
            var style = this.slides[i].currentStyle || window.getComputedStyle(this.slides[i]),
                    width = this.slides[i].offsetWidth, // or use style.width
                    margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight),
                    padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight),
                    border = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
            var realwidth = width + (margin - padding) + border;
            this.carouselWidth += parseInt(realwidth);
        }
        this.carousel.style.width = this.carouselWidth + 'px';
    };
    JSCarousel.prototype.setAnchorsButton = function () {
        /*
         * Geven container as a ul
         * Creating li > button (<button data-index="7" type="button"></button>)
         **/
        for (var i = 1; i <= this.slides.length; i++) {

            var mLi = document.createElement('li');
            var mBut = document.createElement('button');
            mBut.innerHTML = i;
            mBut.setAttribute("data-index", i);
            mBut.setAttribute("type", 'button');
            mBut.setAttribute('class', 'anchor');

            if (i === 1) {
                mLi.setAttribute('class', 'first');
            }            

            addGoToEventListener(mBut, this);

            mLi.appendChild(mBut);
            this.btnIndex.appendChild(mLi);
            this.anchorButtons.push(mBut);
        }

        addGoToNextEventListener(this.btnNext, this);
        addGoToPreviewEventListener(this.btnPrev, this);
    };
    JSCarousel.prototype.setAutoPlay = function () {
        var _ = this;
        setInterval(function () {
            _.goToNext();
        }, this.autoPlay * 1000);
    };
    JSCarousel.prototype.goTo = function (pos) {
        var pos = parseInt(pos);
        this.activeSlideId = pos - 1;
        if (pos === 1) {
            this.carousel.style.left = '0px';
        } else {
            this.carousel.style.left = parseFloat(((this.carouselWidth / this.slides.length) * (pos - 1)) * -1) + 'px';
        }
        //change visibility
        for (var i = 0; i < this.slides.length; i++) {
            this.changeOpacityAndVisibility(i);
        }
    };
    JSCarousel.prototype.goToNext = function () {
        var pos = this.activeSlideId + 1;

//        console.log('goToNext: ' + pos);

        if (this.activeSlideId >= this.slides.length - 1) {
            pos = 1;
        } else {
            pos = pos + 1;
        }

        this.activeSlideId = pos;
        this.goTo(pos);
    };
    JSCarousel.prototype.goToPreview = function () {
        var pos = this.activeSlideId;

//        console.log('goToPreview: ' + pos);

        if (pos <= 0) {
            pos = this.slides.length;
        } else {
            //pos = pos-1;
        }

        this.activeSlideId = pos;
        this.goTo(pos);
    };
    JSCarousel.prototype.changeOpacityAndVisibility = function (index) {
        if (index === this.activeSlideId) {
            this.slides[index].setAttribute('data-active', true);
            if (this.navButtons) {
                //Active anchor button
                this.anchorButtons[this.activeSlideId].className += ' active';
            }
        } else {
            this.slides[index].setAttribute('data-active', false);
            if (this.navButtons) {
                //Disactive anchor button
                this.anchorButtons[index].setAttribute('class', 'anchor');
            }
        }
    };

    /*
     *	a => Elem;
     *  b => Context
     */
    function addGoToEventListener(a, b) {
        if (window.addEventListener) {
            a.addEventListener('click', function () {
                b.goTo(parseInt(this.getAttribute('data-index')));
            });
        } else if (window.attachEvent) {
            a.attachEvent('onclick', function () {
                b.goTo(parseInt(this.getAttribute('data-index')));
            });
        } else {
            a.onclick = function () {
                b.goTo(parseInt(this.getAttribute('data-index')));
            };
        }
    }
    function addGoToNextEventListener(a, b) {
        if (window.addEventListener) {
            a.addEventListener('click', function () {
                b.goToNext();
            });
        } else if (window.attachEvent) {
            a.attachEvent('onclick', function () {
                b.goToNext();
            });
        } else {
            a.onclick = function () {
                b.goToNext();
            };
        }
    }
    function addGoToPreviewEventListener(a, b) {
        if (window.addEventListener) {
            a.addEventListener('click', function () {
                b.goToPreview();
            });
        } else if (window.attachEvent) {
            a.attachEvent('onclick', function () {
                b.goToPreview();
            });
        } else {
            a.onclick = function () {
                b.goToPreview();
            };
        }
    }

    window.JSCarousel = JSCarousel || {};
})();
