'use strict'

$(document).ready ->
  particlesJS "particles-js",
    particles:
      color: "#666"
      shape: "circle"
      opacity: 1
      size: 3
      size_random: true
      nb: 100
      line_linked:
        enable_auto: true
        distance: 300
        color: "#FF3300"
        opacity: 1
        width: 0.2
        condensed_mode:
          enable: false
          rotateX: 600
          rotateY: 600
      anim:
        enable: true
        speed: 7
    interactivity:
      enable: true
      mouse:
        distance: 300
      mode: "grab"
    retina_detect: true

h = $(window).height()
canvas = $("#particles-js")
canvas.css("height", h)

c = document.querySelector("canvas")
$('div#particles-js canvas').css("height", h)
return