/*
 * JSCarousel
 * version: 1.0.0
 * Author: Rachid HARAKAT
 * Author mail: rachidonline<at>gmail<dot>com
 */

 (function() {
  
 	window.JSCarousel = function(args) {
 		if(!args) return;
		
 		this.carousel	= document.querySelector(args.carousel) || null;
 		this.slides		= this.carousel.querySelectorAll(args.slide) || null;
 		this.navButtons = document.querySelector(args.navButtons) || null;
    
 		if(this.navButtons){
			this.btnIndex	= this.navButtons.querySelector(args.btnIndex)|| null;
			this.btnNext	= this.navButtons.querySelector(args.btnNext) || null;
			this.btnPrev	= this.navButtons.querySelector(args.btnPrev) || null;
 		}

 		this.carouselWidth = 0;
 		this.activeSlideId = 0;
 		this.anchorButtons = [];

 		this.init();
 	}

 	JSCarousel.prototype.init = function() {
 		/*
 		* First our slider is linear and horizontal
 		* Make slider container fite to slides global with			
 		**/
 		_ = this; 
 		this.setContainerWidth();

 		/*
 		* Add buttons indexs
 		**/
 		if (_.navButtons) {_.setAnchorsButton();}	
 	}

 	JSCarousel.prototype.setContainerWidth = function (){ 	
 		var i = 0;	 		
 		for (i; i <_.slides.length; i++) {
			var style = _.slides[i].currentStyle || window.getComputedStyle(_.slides[i]),
			width = _.slides[i].offsetWidth, // or use style.width
			margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight),
			padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight),
			border = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
			var realwidth = width + (margin - padding) + border;
 			_.carouselWidth += parseInt(realwidth);
 		}
 		_.carousel.style.width = _.carouselWidth +'px';
 	}

 	JSCarousel.prototype.setAnchorsButton = function(){
 		/*
		* Geven container as a ul
		* creating li>button (<button data-index="7" type="button"></button>)
 		**/
		for (var i = 1; i <= _.slides.length; i++) {
 			var mLi = document.createElement('li');
			var mBut = document.createElement('button');
			mBut.innerHTML = i;
			mBut.setAttribute("data-index",i);
			mBut.setAttribute("type",'button');
			mBut.setAttribute('class','anchor');			

			if (i===1) {
				mLi.setAttribute('class','first');							
			};

			addGoToEventListener(mBut, _);

			mLi.appendChild(mBut);
			_.btnIndex.appendChild(mLi);
			_.anchorButtons.push(mBut);	
		}
    
 		addGoToNextEventListener(_.btnNext, _);
 		addGoToPreviewEventListener(_.btnPrev, _);
	}

	JSCarousel.prototype.goTo = function(pos){
		var pos = parseInt(pos);
    
		_.activeSlideId = pos-1;

		if(pos===1){
			_.carousel.style.left = '0px';
		}else{
			_.carousel.style.left = parseFloat(((_.carouselWidth/_.slides.length)*(pos-1))*-1)+'px';
		}

    //change visibility
		for (var i = 0; i <_.slides.length; i++) {
			changeOpacityAndVisibility(i);
		}		
	}
  
	JSCarousel.prototype.goToNext = function(){
		var pos = _.activeSlideId+1;
		if(_.activeSlideId >= _.slides.length-1){
			pos = 1;
		}else{
			pos = pos+1;
		}
		_.activeSlideId = pos;
		_.goTo(pos);	
	}
	JSCarousel.prototype.goToPreview = function(){
		var pos = _.activeSlideId;

		if(pos <=0){
			pos = _.slides.length;
		}else{
			//pos = pos-1;
		}
		_.activeSlideId = pos;
		_.goTo(pos);	
	}
	/*
	*	  a =>  Elem;
	*   b =>  Context
	*/
    function addGoToEventListener(a, b) {
      if (window.addEventListener) {
        a.addEventListener('click', function() {
          b.goTo(parseInt(this.getAttribute('data-index')));
        });
      } else if (window.attachEvent) {
        a.attachEvent('onclick', function() {
          b.goTo(parseInt(this.getAttribute('data-index')));
        });
      } else {
        a.onclick = function() {
          b.goTo(parseInt(this.getAttribute('data-index')));
        };
      }
    }
    function addGoToNextEventListener(a, b) {
      if (window.addEventListener) {
        a.addEventListener('click', function() {
          b.goToNext();
        });
      } else if (window.attachEvent) {
        a.attachEvent('onclick', function() {
          b.goToNext();
        });
      } else {
        a.onclick = function() {
          b.goToNext();
        };
      }
    }
    function addGoToPreviewEventListener(a, b) {
      if (window.addEventListener) {
        a.addEventListener('click', function() {
          b.goToPreview();
        });
      } else if (window.attachEvent) {
        a.attachEvent('onclick', function() {
          b.goToPreview();
        });
      } else {
        a.onclick = function() {
          b.goToPreview();
        };
      }
    }    
    function changeOpacityAndVisibility(index){
		if(index === _.activeSlideId){
			_.slides[index].setAttribute('data-active',true);			
			if (_.navButtons) {
				//Active anchor butt
				_.anchorButtons[_.activeSlideId].className += ' active';
			}

		}else{
			_.slides[index].setAttribute('data-active',false);			
			if (_.navButtons) {
				//Disactive anchor butt
				_.anchorButtons[index].setAttribute('class','anchor');
			}
		}
	}
 })();
