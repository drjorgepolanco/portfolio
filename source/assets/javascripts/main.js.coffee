'use strict'

# ==============================================================================
# RESPONSIVE NAV
# ==============

$root = $('html')
$nav_header = $('.banner')
$navicon = $('[data-navicon="button"]')
header_height = $('.banner').height()
hero_height = $('.hero').height()
offset_val = hero_height - header_height
eventType = if document.ontouchstart != null then 'click' else 'touchstart'

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

$navicon.on(eventType, menuToggle)
$('.banner a').on(eventType, openNav)
$(window).scroll(navSlide)


# ==============================================================================
# WINDOW HEIGHT
# =============

$(".contentContainer").css('min-height', $(window).height())