'use strict'

touch = Modernizr.touch
$('.img-holder').imageScroll
  imageAttribute: if touch == true then 'image-mobile' else 'image'
  touch: touch
  
# $('.img-holder').imageScroll