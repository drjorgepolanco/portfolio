'use strict'

$(document).ready ->
  filterPath = (string) ->
    string.replace(/^\//, '').replace(/(index|default).[a-zA-Z]{3,4}$/, '').replace(/\/$/, '')
  
  scrollableElement = (els) ->
    i = 0
    argLength = arguments.length
    while i < argLength
      el = arguments[i]
      $scrollElement = $(el)
      if $scrollElement.scrollTop() > 0
        return el
      else
        $scrollElement.scrollTop(1)
        isScrollable = $scrollElement.scrollTop() > 0
        $scrollElement.scrollTop(0)
        if (isScrollable)
          return el
      i++
    []

  locationPath = filterPath(location.pathname)
  scrollElem = scrollableElement('html', 'body')

  $('a[href*=#]').each ->
    thisPath = filterPath(@pathname) or locationPath
    if (locationPath == thisPath and (location.hostname == @hostname or !@hostname) and @hash.replace(/#/, ''))
      $target = $(@hash)
      target = @hash
      if target
        targetOffset = $target.offset().top
        $(@).click (event) ->
          event.preventDefault()
          $(scrollElem).animate {scrollTop: targetOffset}, 700, ->
            location.hash = target