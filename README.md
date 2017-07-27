# Vuesiwyg

> A simple wysiwyg rich text html editor built with Vue.js

## Installation

### With HTML Tags

1) Download
2) Extract the contents of **dist** folder to your public assets directory. Structure should look like this:

```
public
│
│
├───css
│   ├─ vuesiwyg.min.css
│   └─ ...
│
├───js
│   ├─ vuesiwyg.stand-alone.min.js
│   └─ ...
│
├─── ...
```

3) Add css and script tags:

```html
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">

            <title>My App</title>

            <!-- Styles -->
            <link href="path_to_css/vuesiwyg.min.css" rel="stylesheet">
        </head>

        <body>
            <!-- Your HTML stuff -->

            <!-- Your Scripts -->

            <!-- Vuesiwyg Script -->
            <script src="path_to_js/vuesiwyg.stand-alone.min.js"></script>
        </body>
    </html>
```

### Laravel
There are basically two ways to install Vuesiwyg in Laravel

Method 1 (stand-alone):

1) download
2) extract to your resources directory
3) add to/modify your *webpack.mix.js*, according to your project requirements:

```javascript
    // this is just a basic sample. you should decide what's best for your project.
    mix.js('resources/assets/js/app.js', 'public/js')
       .sass('resources/assets/sass/app.sass', 'public/css')
       .styles(['public/css/app.css', 'resources/assets/css/vuesiwyg.min.css'], 'public/css/all.css')
       .scripts([public/js/app.js', resources/assets/js/vuesiwyg.stand-alone.min.js'], 'public/js/all.js');
```
4) add to your template
```html
    @extends('layouts.app')

    @section('content')
        <div id="app" class="container">
            <div class="row">
                <div class="col-md-10 col-md-offset-1">
                    <div class="panel panel-default">
                        <div class="panel-heading">Vuesiwyg</div>

                        <div class="panel-body">
                            <vue-siwyg id="body"
                                       text="Lorem ipsum dolor sit amet, consectetur adipisicing elit.">
                            </vue-siwyg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    @endsection

```
Method 2 (Vue):

1) install with npm
```bash
npm install vuesiwyg --save
```

2) make sure you have Vuex in your *package.json* dependencies. if you don't:
```bash
npm install vuex --save
```

2) add to resources/assets/js/app.js
```javascript
    /**
     * First we will load all of this project's JavaScript dependencies which
     * includes Vue and other libraries. It is a great starting point when
     * building robust, powerful web applications using Vue and Laravel.
     */

    require('./bootstrap');

    window.Vue = require('vue');

    /**
    * Vuesiwyg
    */
    import Vuex from 'vuex'
    import Component from 'vuesiwyg'
    import config from 'vuesiwyg/vuesiwyg-config'
    import store from 'vuesiwyg/vuex/store'
    Vue.use(Vuex)

    let vStore = store(config)
    let vStoreData = {
      config,
      components: [
        'toolbar',
        'editable',
        'markup'
      ]
    }

    const vuesiwyg = Vue.component('vuesiwyg', Object.assign({}, Component, {
      store: new Vuex.Store(vStore),
      data: function () {
        return vStoreData
      }
    }))

    /**
     * Next, we will create a fresh Vue application instance and attach it to
     * the page. Then, you may begin adding components to this application
     * or customize the JavaScript scaffolding to fit your unique needs.
     */

    Vue.component('example', require('./components/Example.vue'));

    const app = new Vue({
      el: '#app'
    })

```

### Vue
1) install
```bash
npm install vuesiwyg --save
```

2) make sure you have Vuex in your *package.json* dependencies. if you don't:
```bash
npm install vuex --save
```

3) add to your index.js/main.js
```javascript
    /**
    * Vuesiwyg
    */
    import Vuex from 'vuex'
    import Component from 'vuesiwyg'
    import config from 'vuesiwyg/vuesiwyg-config'
    import store from 'vuesiwyg/vuex/store'
    Vue.use(Vuex)

    let vStore = store(config)
    let vStoreData = {
      config,
      components: [
        'toolbar',
        'editable',
        'markup'
      ]
    }

    const vuesiwyg = Vue.component('vuesiwyg', Object.assign({}, Component, {
      store: new Vuex.Store(vStore),
      data: function () {
        return vStoreData
      }
    }))
```
## Usage
Component will always be mounted on an #app root tag:
```html
    <div id="app">
        <form>
            <input type="text" id="subject" name="subject">

            <vuesiwyg id="body" text=""></vuesiwyg>
        </form>
    </div>
```

Define the **id** property, in order to POST the rendered HTML to a server.
The **id** property will set both the **id** and **name** attributes.

Both **id** and **text** properties should ALWAYS be strings.

### Default
```html
    <vuesiwyg id="body" text=""></vuesiwyg>
```

### Passing a text
```html
    <vuesiwyg id="body" text="Lorem ipsum dolor sit amet"></vuesiwyg>
```

### Setting a class
Should you like to override some styling, you can also set a class:

```html
    <vuesiwyg id="body" text="" class="My-class"></vuesiwyg>
```

### Passing images
This property will populate the 'Insert Image' tool. This property value MUST BE a valid JSON string.

Example in Laravel:

```php
    @php
        // This is just an example, for the sake of brevity.
        // Obviously, you should generate your JSON encoded file list in your controller and pass it to the view.

        $u = url('img'); // <- generates http://yourdomain.tld/public/img
        $image_array = [$u . '/image1.jpg', $u . '/image2.jpg', $u . '/image33.jpg', $u . '/image44.jpg', $u . '/image5.jpg'];
        $images = json_encode($image_array);
    @endphp

    <vuesiwyg id="body" text="" images="{{ $images }}"></vuesiwyg>
```
Example with stand-alone
```html

<script>
    var images = '["img/img1.jpg", "img/img2.jpg", "img/img3.jpg", "img/img4.jpg", "img/img5.jpg", "img/img6.jpg"]';
</script>

<vuesiwyg id="body" text="" images="{{ $images }}"></vuesiwyg>
```

## Credits
Icons are from [Font Awesome](http://fontawesome.io) optimised with [SVGOMG](https://jakearchibald.github.io/svgomg/) and
encoded with [sass-svg-uri](https://github.com/waldemarfm/sass-svg-uri).

Images kindly provided by [tiagossaurus_rex](https://www.instagram.com/tiagossaurus_rex/)

### Contribution
Is always welcome, in all forms: Suggestions, Bug reports, Security issues, Pull requests,
Translations, Documentation, Tests...

## TODO
- Markdown support
- Image upload support
- Full screen support
- Syntax highlight support
- Prettify HTML view
- Translations support

## License
Open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)
