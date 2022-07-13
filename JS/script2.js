$(function () {
    // save references to often used DOM elements
    const imageSlider = $('#property-image-slider');
    const map = $('#map');
    const street = $('#street');
  
    $('#image-view').on('click', () => {
      map.hide();
      street.hide();
      imageSlider.show();
    });
  
    $('#map-view').on('click', () => {
      imageSlider.hide();
      street.hide();
      map.show();
    });
  
    $('#street-view').on('click', () => {
      initStreetView();
      imageSlider.hide();
      map.hide();
      street.show();
    });
  
    $('#ask-a-question').on('click', () => {
      const contactDivPosition = document.getElementById('contact').offsetTop;
      window.scroll({
        top: contactDivPosition + 30,
        left: 0,
        behavior: 'smooth'
      });
    });
  
    $('#property-image-slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      variableWidth: true,
      infinite: true,
      prevArrow: '<a href="#" class="slick-arrow slick-prev"><span class="fa fa-chevron-left"></span></a>',
      nextArrow: '<a href="#" class="slick-arrow slick-next"><span class="fa fa-chevron-right"></span></a>'
    });
  
    $('#properties-slider').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      prevArrow: '<a href="#" class="slick-arrow slick-prev">previous</a>',
      nextArrow: '<a href="#" class="slick-arrow slick-next">next</a>',
      responsive: [
        {
          breakpoint: 1100,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 530,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true
          }
        }
      ]
    });
  
    const navMenu = $('#nav-menu');
  
    $('#nav-toggle').on('click', () => {
      navMenu.css('right', '0');
    });
  
    $('#close-flyout').on('click', () => {
      navMenu.css('right', '-100%');
    });
  
    $(document).on('click', e => {
      const target = $(e.target);
      if (!(target.closest('#nav-toggle').length > 0 || target.closest('#nav-menu').length > 0)) {
        navMenu.css('right', '-100%');
      }
    });
  });
  
  // Initialize and add street view map
  function initStreetView() {
    // The location to load the street view at
    const nuiThanh = {lat: 16.0332552, lng: 108.2228336};
    const streetDiv = document.getElementById('street');
    const panorama = new google.maps.StreetViewPanorama(
      streetDiv, {
        position: nuiThanh
      });
  }
  
  // Initialize and add the map
  function initMap() {
    // The location to load the map at
    const nuiThanh = {lat: 16.033197, lng: 108.2228336};
    // The map, centered at San Francisco
    const map = new google.maps.Map(
        document.getElementById('map'), {zoom: 16, center: nuiThanh});
    // The marker, positioned at San Francisco
    const marker = new google.maps.Marker({position: nuiThanh, map: map});
  }


    (function ($) {
        var list = [];
    
        /* function to be executed when product is selected for comparision*/
    
        $(document).on('click', '.addToCompare', function () {
            $(".comparePanle").show();
            $(this).toggleClass("rotateBtn");
            $(this).parents(".selectProduct").toggleClass("selected");
            var productID = $(this).parents('.selectProduct').attr('data-title');
    
            var inArray = $.inArray(productID, list);
            if (inArray < 0) {
                if (list.length > 2) {
                    $("#WarningModal").show();
                    $("#warningModalClose").click(function () {
                        $("#WarningModal").hide();
                    });
                    $(this).toggleClass("rotateBtn");
                    $(this).parents(".selectProduct").toggleClass("selected");
                    return;
                }
    
                if (list.length < 3) {
                    list.push(productID);
    
                    var displayTitle = $(this).parents('.selectProduct').attr('data-id');
    
                    var image = $(this).siblings(".productImg").attr('src');
    
                    $(".comparePan").append('<div id="' + productID + '" class="relPos titleMargin w3-margin-bottom   w3-col l3 m4 s4"><div class="w3-white titleMargin"><a class="selectedItemCloseBtn w3-closebtn cursor">&times</a><img src="' + image + '" alt="image" class="iMg" "/><p id="' + productID + '" class="titleMargin1">' + displayTitle + '</p></div></div>');
                }
            } else {
                list.splice($.inArray(productID, list), 1);
                var prod = productID.replace(" ", "");
                $('#' + prod).remove();
                hideComparePanel();
    
            }
            if (list.length > 1) {
    
                $(".cmprBtn").addClass("active");
                $(".cmprBtn").removeAttr('disabled');
            } else {
                $(".cmprBtn").removeClass("active");
                $(".cmprBtn").attr('disabled', '');
            }
    
        });
        /*function to be executed when compare button is clicked*/
        $(document).on('click', '.cmprBtn', function () {
            if ($(".cmprBtn").hasClass("active")) {
                /* this is to print the  features list statically*/
                $(".contentPop").append('<div class="w3-col s3 m3 l3 compareItemParent relPos">' + '<ul class="product">' + '<li class=" relPos compHeader"><p class="w3-display-middle">Ảnh</p></li>' + '<li>Mã Tin</li>' + '<li>Diện Tích</li>' + '<li>Gác Lửng</li>' + '<li class="cpu">Mô Tả</li>' + '<li class="cpu">Địa Chỉ</li>'+ '<li>Giá Thuê</li>' + '<li>Đánh Giá</li></ul>' + '</div>');
    
                for (var i = 0; i < list.length; i++) {
                    /* this is to add the items to popup which are selected for comparision */
                    product = $('.selectProduct[data-title="' + list[i] + '"]');
                    var image = $('[data-title=' + list[i] + ']').find(".productImg").attr('src');
                    var title = $('[data-title=' + list[i] + ']').attr('data-id');
                    /*appending to div*/
                    $(".contentPop").append('<div class="w3-col s3 m3 l3 compareItemParent relPos">' + '<ul class="product">' + '<li class="compHeader"><img src="' + image + '" class="compareThumb"></li>' + '<li>' + title + '</li>' + '<li>' + $(product).data('size') + '</li>' + '<li>' + $(product).data('weight') + '<li class="cpu">' + $(product).data('processor') + '</li>'+ '<li class="cpu">' + $(product).data('address') + '</li>'+ '<li>' + $(product).data('battery') + '<li>' + $(product).data('danhgia') + '</ul>' + '</div>');
                }
            }
            $(".modPos").show();
        });
    
        /* function to close the comparision popup */
        $(document).on('click', '.closeBtn', function () {
            $(".contentPop").empty();
            $(".comparePan").empty();
            $(".comparePanle").hide();
            $(".modPos").hide();
            $(".selectProduct").removeClass("selected");
            $(".cmprBtn").attr('disabled', '');
            list.length = 0;
            $(".rotateBtn").toggleClass("rotateBtn");
        });
    
        /*function to remove item from preview panel*/
        $(document).on('click', '.selectedItemCloseBtn', function () {
    
            var test = $(this).siblings("p").attr('id');
            $('[data-title=' + test + ']').find(".addToCompare").click();
            hideComparePanel();
        });
    
        function hideComparePanel() {
            if (!list.length) {
                $(".comparePan").empty();
                $(".comparePanle").hide();
            }
        }
    })(jQuery);


searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
  searchForm.classList.toggle('active');
}

let loginForm = document.querySelector('.login-form-container');

document.querySelector('#login-btn').onclick = () =>{
  loginForm.classList.toggle('active');
}

document.querySelector('#close-login-btn').onclick = () =>{
  loginForm.classList.remove('active');
}

window.onscroll = () =>{

  searchForm.classList.remove('active');

  if(window.scrollY > 80){
    document.querySelector('.header .header-2').classList.add('active');
  }else{
    document.querySelector('.header .header-2').classList.remove('active');
  }

}

window.onload = () =>{

  if(window.scrollY > 80){
    document.querySelector('.header .header-2').classList.add('active');
  }else{
    document.querySelector('.header .header-2').classList.remove('active');
  }

  fadeOut();

}

function loader(){
  document.querySelector('.loader-container').classList.add('active');
}

function fadeOut(){
  setTimeout(loader, 4000);
}

var swiper = new Swiper(".books-slider", {
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".featured-slider", {
  spaceBetween: 10,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    450: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});

var swiper = new Swiper(".arrivals-slider", {
  spaceBetween: 10,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".reviews-slider", {
  spaceBetween: 10,
  grabCursor:true,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".blogs-slider", {
  spaceBetween: 10,
  grabCursor:true,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});