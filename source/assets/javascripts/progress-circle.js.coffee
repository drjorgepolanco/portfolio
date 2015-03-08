'use strict'

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

  progressCircle('.number-1', '.progress-circle-outer-1', 76)
  progressCircle('.number-2', '.progress-circle-outer-2', 82)
  progressCircle('.number-3', '.progress-circle-outer-3', 95)
  progressCircle('.number-4', '.progress-circle-outer-4', 90)