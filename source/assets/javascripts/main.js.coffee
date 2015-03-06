# ======
# CONFIG
# ======

$root = $('html')
$nav_header = $('.banner')
$navicon = $('[data-navicon="button"]')
header_height = $('.banner').height()
hero_height = $('.hero').height()
offset_val = hero_height - header_height - 3
eventType = if document.ontouchstart != null then 'click' else 'touchstart'


# =========
# FUNCTIONS
# =========

navSlide = ->
  scroll_top = $(window).scrollTop()

  if (scroll_top >= offset_val)
    $nav_header.addClass('is-sticky')
  else
    $nav_header.removeClass('is-sticky')
  return

menuToggle = ->
  if ($nav_header.hasClass('is-open'))
    $root.removeClass('pinned')
    $nav_header.removeClass('is-open')
    $navicon.removeClass('is--closed')
  else
    $root.addClass('pinned')
    $nav_header.addClass('is-open')
    $navicon.addClass('is--closed')
  return

openNav = ->
  if ($nav_header.hasClass('is-open'))
    $nav_header.removeClass('is-open')
    $root.removeClass('pinned')
    $navicon.removeClass('is--closed')
  return

anchorScroll = (event) ->
  id = $(@).attr('href')
  offset = header_height
  target = $(id).offset().top - offset

  $('body').animate({ scrollTop: target }, 700)
  event.preventDefault() 
  return


# ========
# HANDLERS
# ========

$('.scrollto').on eventType, ->
  anchorScroll.call(@, event)

$navicon.on(eventType, menuToggle)

$('.banner a').on(eventType, openNav)

$(window).scroll(navSlide)


# ================
# NAV ACTIVE STATE
# ================

sections = $('section')
nav = $('nav')
nav_height = nav.outerHeight()
$(window).on 'scroll', ->
  cur_pos = $(@).scrollTop()
  sections.each ->
    top = $(@).offset().top - nav_height
    bottom = top + $(@).outerHeight()

    if cur_pos >= top and cur_pos <= bottom
      nav.find('a').removeClass 'active'
      sections.removeClass 'active'
      $(@).addClass 'active'
      nav.find('a[href="#' + $(@).attr('id') + '"]').addClass 'active'
    return
  return

$('#particles-js').on 'mouseenter', ->
  nav.find('a').removeClass 'active'
  sections.removeClass 'active'

