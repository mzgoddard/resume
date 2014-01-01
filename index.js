$(function() {
  var setHash = function( hash ) {
    var $window = $( window );
    return function() {
      var scrollTop = $window.scrollTop();
      location.hash = hash;
      $window.scrollTop( scrollTop );
    };
  };

  var slideSection = function( event ) {
    if ( !$( event.currentTarget ).find( '> img, .title' ).is( event.target )) {
      return;
    }

    var $this = $( this );
    var id = $this.attr( 'id' );

    if ( location.hash === '#' + id ) {
      $this.find( '.more' ).slideUp( 300 );
      $this.find( '.title' ).css( 'display', '' );

      setTimeout( setHash( '' ), 300 );
    } else {
      $( ':not("#' + id + '") .more' ).slideUp( 300 );
      $( 'section:not(#' + id + ') .title' )
        .fadeOut( 300 )
        .queue(function( next ) {
          $( 'section:not(#' + id + ') .title' ).css( 'display', '' );
          next();
        });
      $this.find( '.more' ).slideDown( 300 );
      $this.find( '.title' ).css( 'display', 'inline-block' );

      setTimeout( setHash( id ), 300 );
    }

    event.stopPropagation();
    return false;
  };

  $( 'section' ).on( 'click touchend', slideSection );

  if ( location.hash.length > 1 ) {
    $( location.hash + ' .more' )
      .show();
    $( location.hash + ' .title' )
      .css( 'display', 'inline-block' );
  }
});
