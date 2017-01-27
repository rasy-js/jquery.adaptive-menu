/*
 * jQuery adaptive menu
 * https://github.com/GREYMedia-LLC/jquery.adaptive-menu
 * version: 0.0.2
 *
 * Author: Aliaksandr Radzevich
 * Email: developer201.js@gmail.com
 * Website:
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

;(function ($, window, document) {

  $.fn.adaptiveMenu = function (options) {

    var settings = $.extend({
      query : 768,
      append: 'body',
      callback: function() {}
    },options||{});

    var widget = this;

    return this.each(function () {

      function init() {

        widget.before('<a href="#" id="open_menu" class="adaptive-menu__open adaptive-menu__open--is-hidden"><span><b>open</b></span></a>');
        widget.prepend('<a href="#" id="close_menu" class="adaptive-menu__close adaptive-menu__close--is-hidden"><span>close</span></a>');
        $(settings.append).append('<div id="adaptive_bg" class="adaptive-menu__bg"></div>');

        var $btn_open = $('#open_menu'),
            $btn_close = $('#close_menu'),
            $bg = $('#adaptive_bg');

        $(window).on('click', function (e) {

          if (e.target.getAttribute('id') == 'open_menu') {
            $btn_open.toggleClass('adaptive-menu__open--is-hidden');
            widget.toggleClass('adaptive-menu--is-visible');
            $btn_close.toggleClass('adaptive-menu__close--is-hidden');
            $bg.toggleClass('adaptive-menu__bg--is-visible');

            if ($.isFunction(settings.callback)) {
              settings.callback();
            }

            return false;
          }
          else if (e.target.getAttribute('id') == 'close_menu' || e.target.getAttribute('id') == 'adaptive_bg') {
            widget.toggleClass('adaptive-menu--is-visible');
            $btn_close.toggleClass('adaptive-menu__close--is-hidden');
            $btn_open.toggleClass('adaptive-menu__open--is-hidden');
            $bg.toggleClass('adaptive-menu__bg--is-visible');

            if ($.isFunction(settings.callback)) {
              settings.callback();
            }

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
          if (queryValue() && !widget.hasClass('adaptive-menu')) {
            if (!widget.hasClass('adaptive-menu--is-visible')) {
              widget.addClass('adaptive-menu');
              $btn_open.toggleClass('adaptive-menu__open--is-hidden');
            }
            else {
              widget.toggleClass('adaptive-menu--is-visible');
              widget.toggleClass('adaptive-menu');
              $btn_open.toggleClass('adaptive-menu__open--is-hidden');
            }
          }
          else if (!queryValue() && widget.hasClass('adaptive-menu')) {
              widget.removeClass('adaptive-menu');
              $btn_open.addClass('adaptive-menu__open--is-hidden');
              $btn_close.addClass('adaptive-menu__close--is-hidden');
              $bg.removeClass('adaptive-menu__bg--is-visible');
          }
        }

        showHideElements();

        $(window).resize(function () {
          showHideElements();
        });

      }
      init();

    });
  };

})(jQuery, window, document);