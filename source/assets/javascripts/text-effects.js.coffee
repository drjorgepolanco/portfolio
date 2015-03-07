# =======
# Chaffle
# =======

# $(document).ready ->
#   $('.chaffle').chaffle {speed: 20, time: 1}



# =========
# CharCycle
# =========

$('.c').mouseenter ->
  if $(@).hasClass('cycling') == false
    $(@).charcycle {'target':'#text'}