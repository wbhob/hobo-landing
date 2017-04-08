import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;
declare var Granim: any;
declare var smoothScroll: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(router: Router) {
    router.events.subscribe(val => {
      rerender();
    });
  }
  scrollTop() {
    smoothScroll.animateScroll(
      document.querySelector('#start'), // Node to scroll to. ex. document.querySelector( '#bazinga' )
    );
  }
}

export function rerender() {
  if ($('.datepicker').length) {
    $('.datepicker').pickadate({
      format: 'mmmm d, yyyy',
      formatSubmit: 'yyyy-mm-dd'
    });
  }
  smoothScroll.animateScroll(
    document.querySelector('#start'), // Node to scroll to. ex. document.querySelector( '#bazinga' )
  );
  $('.background-image-holder').each(function () {
    var imgSrc = $(this).children('img').attr('src');
    $(this).css('background', 'url("' + imgSrc + '")').css('background-position', 'initial').css('opacity', '1');
  });

  $('[data-gradient-bg]').each(function (index, element) {
    var granimParent = $(this),
      granimID = 'granim-' + index + '',
      colours = granimParent.attr('data-gradient-bg'),
      pairs = [],
      tempPair = [],
      count,
      passes,
      i;

    // Canvas element forms the gradient background
    granimParent.prepend('<canvas id="' + granimID + '"></canvas>');

    // Regular expression to match comma separated list of hex colour values
    passes = /^(#[0-9|a-f|A-F]{6}){1}([ ]*,[ ]*#[0-9|a-f|A-F]{6})*$/.test(colours);

    if (passes === true) {
      colours = colours.replace(' ', '');
      colours = colours.split(',');
      count = colours.length;
      // If number of colours is odd - duplicate last colour to make even array
      if (count % 2 !== 0) {
        colours.push(colours[count - 1]);
      }
      for (i = 0; i < (count / 2); i++) {
        tempPair = [];
        tempPair.push(colours.shift());
        tempPair.push(colours.shift());
        pairs.push(tempPair);
      }
    }

    var granimElement = $(this);
    var granimInstance = new Granim({
      element: '#' + granimID,
      name: 'basic-gradient',
      direction: 'left-right',
      opacity: [1, 1],
      isPausedWhenNotInView: true,
      states: {
        "default-state": {
          gradients: pairs
        }
      }
    });
  });
}
