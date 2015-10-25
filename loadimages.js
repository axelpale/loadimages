(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.loadimages = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function loadimages(imgSrcs, then) {
  // Parameters
  //   imgSrcs
  //     array of image source paths OR single source path string.
  //   then(err, imgElements)
  //     Will be called after all the images are loaded. If string was given,
  //     imgElements is an Image instead of array of Images.

  var numberOfImages, stringGiven, thereWasSuccess, thereWasError, imgs;
  var onloadsCalled, onload, onerror;

  if (typeof then !== 'function') {
    throw new Error('callback should be a function: ' + then);
  }

  if (typeof imgSrcs === 'string') {
    numberOfImages = 1;
    stringGiven = true;
    imgSrcs = [imgSrcs]; // Normalize
  } else {
    // Array of images
    numberOfImages = imgSrcs.length;
    stringGiven = false;
  }
  thereWasSuccess = false;
  thereWasError = false;

  imgs = [];

  onloadsCalled = 0;
  onload = function () {
    // Note:
    //   this = Image
    if (!thereWasError) {
      onloadsCalled += 1;
      var isFinalImage = (onloadsCalled === numberOfImages);
      if (isFinalImage) {
        thereWasSuccess = true;
        if (stringGiven) {
          then(null, imgs[0]);
        } else {
          then(null, imgs);
        }
      }
    }
  };

  onerror = function (errMsg) {
    // Note:
    //   this = Image

    // No errors after success.
    if (!thereWasSuccess) {
      thereWasError = true;
      then(errMsg, null);
    }

    // Prevent firing the default event handler
    // https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers.onerror#Parameters
    return true;
  };

  for (i = 0; i < imgSrcs.length; i += 1) {
    imgs.push(new Image());
    imgs[i].onload = onload;
    imgs[i].onerror = onerror;
    imgs[i].src = imgSrcs[i];
  }
};

},{}]},{},[1])(1)
});