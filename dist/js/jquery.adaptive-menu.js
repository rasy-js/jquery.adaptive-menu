/*
 * jQuery adaptive menu
 * https://github.com/GREYMedia-LLC/jquery.adaptive-menu
 * version: 0.0.1
 *
 * Author: Aliaksandr Radzevich
 * Email: developer201.js@gmail.com
 * Website:
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

;(function ($) {

  $.fn.adaptiveMenu = function (options) {

    var settings = $.extend({
      query : 768,
      append: 'body'
    },options||{});

    return this.each(function () {

      $(this).before('<a href="#" id="open_menu" class="adaptive-menu__open adaptive-menu__open--is-hidden"><span><b>open</b></span></a>');
      $(this).prepend('<a href="#" id="close_menu" class="adaptive-menu__close adaptive-menu__close--is-hidden"><span>close</span></a>');
      $(settings.append).append('<div id="adaptive_bg" class="adaptive-menu__bg"></div>');

      var $btn_open = $('#open_menu'),
          $btn_close = $('#close_menu'),
          $bg = $('#adaptive_bg'),
          $thisMenu = $(this);


      $(window).on('click', function (e) {

        if (e.target.getAttribute('id') == 'open_menu') {
          $btn_open.toggleClass('adaptive-menu__open--is-hidden');
          $thisMenu.toggleClass('adaptive-menu--is-visible');
          $btn_close.toggleClass('adaptive-menu__close--is-hidden');
          $bg.toggleClass('adaptive-menu__bg--is-visible');

          return false;
        }
        else if (e.target.getAttribute('id') == 'close_menu' || e.target.getAttribute('id') == 'adaptive_bg') {
          $thisMenu.toggleClass('adaptive-menu--is-visible');
          $btn_close.toggleClass('adaptive-menu__close--is-hidden');
          $btn_open.toggleClass('adaptive-menu__open--is-hidden');
          $bg.toggleClass('adaptive-menu__bg--is-visible');

          return false;
        }

      });

      function getWindowWidth() {
        return window.innerWidth || document.body.clientWidth;
      }

      function queryValue() {
        if (getWindowWidth() < settings.query) {
         return true;
        }
      }

      function showHideElements() {
        if (queryValue() && !$thisMenu.hasClass('adaptive-menu')) {
          if (!$thisMenu.hasClass('adaptive-menu--is-visible')) {
            $thisMenu.addClass('adaptive-menu');
            $btn_open.toggleClass('adaptive-menu__open--is-hidden');
          }
          else {
            $thisMenu.toggleClass('adaptive-menu--is-visible');
            $thisMenu.toggleClass('adaptive-menu');
            $btn_open.toggleClass('adaptive-menu__open--is-hidden');
          }
        }
        else if (!queryValue() && $thisMenu.hasClass('adaptive-menu')) {
            $thisMenu.removeClass('adaptive-menu');
            $btn_open.addClass('adaptive-menu__open--is-hidden');
            $btn_close.addClass('adaptive-menu__close--is-hidden');
            $bg.removeClass('adaptive-menu__bg--is-visible');
        }
      }

      showHideElements();

      $(window).resize(function () {
        showHideElements();
      });

    });
  }

})(jQuery);