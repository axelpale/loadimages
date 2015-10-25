# loadimages

A JS microlibrary to ensure that an image is loaded before use. Give the function `loadimages` one or multiple image URLs and a callback function. The callback will be called after all the images are loaded and ready. If any of the images fail to load, an error is given to the callback.



## Install

    npm install loadimages

or

    <script src="loadimages.js"></script>



## Usage

    var loadimages = require('loadimages'); // if you use browserify

    // Load single image
    loadimages('img/lego.png', function (err, image) {
      // Loading errors might occur, e.g. if the image was not found (404).
      if (err) { throw err; }
      // do stuff with your freshly loaded HTMLImageElement
      image.style.margin = '1.618em';
      document.body.appendChild(image);
    })

    // Load multiple images in parallel
    var srcs = ['img/lego.png', 'http://i.imgur.com/Hbtar04.jpg'];
    loadimages(srcs, function (err, images) {
      // Non-null error is given if any of the images failed to load.
      if (err) { throw err; }
      // Now you have an array of images to do stuff with:
      var lego = images[0];
      var stephen = images[1];
      ...
    })



## For developers

Run lint & build browserify bundle & run unit tests:

    $ npm run build



## Versioning

[Semantic Versioning 2.0.0](http://semver.org/)



## License

[MIT License](../blob/master/LICENSE)
