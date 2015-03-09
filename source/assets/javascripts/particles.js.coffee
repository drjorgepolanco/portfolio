'use strict'

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