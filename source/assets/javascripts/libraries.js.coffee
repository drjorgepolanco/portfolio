'use strict'

# ==============================================================================
# PORTFOLIO
# =========

$(document).ready ->
  $('.project-button').on 'click', '.more', (event) ->
    event.preventDefault()
    $(@).parent().parent().find('.project-info').show()
    return
  $('.cancel').on 'click', (event) ->
    event.preventDefault()
    $(@).parent().hide()
    return
  return

# ==============================================================================
# EXPERIENCE
# ==========

$(document).ready ->
  wow = new WOW(
    boxClass: 'wow'
    animateClass: 'animated'
    offset: 0
    mobile: true
    live: true
    callback: (box) ->
      # the callback is fired every time an animation is started
      # the argument that is passed in is the DOM node being animated
      return
  )
  wow.init()
  

# ==============================================================================
# SLICK
# =====

$(document).ready ->
  $('.responsive').slick
    infinite: true
    speed: 600
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


# ==============================================================================
# PROGRESS-CIRCLE
# ===============

$(document).ready ->
  progressCircle = (number, circle, percentage) ->
    $num = $(number)
    times = 0
    i = 0
    while i <= percentage
      setTimeout (->
        $num.html times
        times += 1
        if times == percentage
          $(circle).removeClass('animate')
        return
      ), i * 100
      i += 1
    return

  progressCircle('.number-1', '.progress-circle-outer-1', 81)
  progressCircle('.number-2', '.progress-circle-outer-2', 86)
  progressCircle('.number-3', '.progress-circle-outer-3', 95)
  progressCircle('.number-4', '.progress-circle-outer-4', 92)


# ==============================================================================
# CharCycle
# =========

$(document).ready ->
  $('.c').mouseenter ->
    if $(@).hasClass('cycling') == false
      $(@).charcycle {'target':'.text'}


# ==============================================================================
# PARTICLES
# =========

$(document).ready ->
  particlesJS "particles-js",
    particles:
      color: "#666"
      shape: "circle"
      opacity: 0.8
      size: 2
      size_random: true
      nb: 100
      line_linked:
        enable_auto: true
        distance: 250
        color: "#FF3300"
        opacity: 0.8
        width: 0.1
        condensed_mode:
          enable: false
          rotateX: 600
          rotateY: 600
      anim:
        enable: true
        speed: 4
    interactivity:
      enable: true
      mouse:
        distance: 250
      mode: "grab"
    retina_detect: true

  h = $(window).height()
  canvas = $("#particles-js")
  canvas.css("height", h)

  c = document.querySelector("canvas")
  $('div#particles-js canvas').css("height", h)
  return
