var path = require( 'path' );

var express = require( 'express' );
var nib = require( 'nib' );
var stylus = require( 'stylus' );

var app = express();
app.all( /\.css$/, function( req, res, next ) {
  req.url = req.url;
    // .replace(/^\/static/, ''); // strip the /static prefix
    // .replace( /\.styl$/, '.css' );
  console.log( req.url );
  next();
}, stylus.middleware({
  src: __dirname,
  dest: __dirname + '/dist',
  compile: function(str, path){
    return stylus( str )
      .use( nib() )
      .set('filename', path );
  }
}), express['static'](
  path.normalize( __dirname + '/dist' )
));
app.get( '/', function( req, res, next ) {
  req.url = '/index.html';
  next();
}, express['static']( __dirname ));
app.use( express['static']( __dirname ));
app.listen( process.argv[2] );
