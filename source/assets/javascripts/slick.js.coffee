$(document).ready ->
  $('.responsive').slick
    infinite: true
    speed: 300
    autoplay: true
    centerMode: true
    centerPadding: 60
    cssEase: 'ease'
    dots: true
    pauseOnHover: true
    slidesToShow: 4
    slidesToScroll: 1
    autoplaySpeed: 1000
    responsive: [
      {
        breakpoint: 1024
        settings:
          slidesToShow: 6
          slidesToScroll: 1
      }
      {
        breakpoint: 800
        settings:
          slidesToShow: 3
          slidesToScroll: 2
          dots: true
          infinite: true
      }
      {
        breakpoint: 600
        settings:
          slidesToShow: 2
          slidesToScroll: 2
          dots: true
          infinite: true
      }
      {
        breakpoint: 480
        settings:
          slidesToShow: 1
          slidesToScroll: 1
          dots: true
          infinite: true
          autoplay: true
          autoplaySpeed: 1000
          swipeToSlide: true
      }
    ]
  return

