let mix = require('laravel-mix')

mix.js('src/stand-alone.main.js', 'dist/js/vuesiwyg.stand-alone.min.js')
   .sass('src/assets/sass/vuesiwyg.sass', 'dist/css/vuesiwyg.min.css')
   .copy('src/assets/img', 'demo/img/')
   .copy('src/demo/index.html', 'demo/index.html')
