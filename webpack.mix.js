const mix = require('laravel-mix');


/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
    .js('resources/js/app.js', 'public/js')
    .js('resources/js/map.js', 'public/js')
    .js('resources/js/map-edit.js', 'public/js')
    .js('resources/js/d3.legend.js', 'public/js')
    .js('resources/js/components/leaflet-elevation.js', 'public/js')

.copy('resources/images/*.*', 'public/img')

.sass('resources/sass/leaflet.elevation-0.0.4.scss', 'public/css')
    .sass('resources/sass/style.scss', 'public/css')
    .sass('resources/sass/app.scss', 'public/css')
    .version()

;