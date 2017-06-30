let mix = require('laravel-mix')

mix.js('src/main.js', 'dist/js/vuesiwyg.min.js')
    .sass('src/assets/sass/vuesiwyg.sass', 'dist/css/vuesiwyg.min.css')

