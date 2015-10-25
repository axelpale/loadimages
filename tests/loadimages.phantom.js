/*jshint expr: true*/ // prevent error in ...be.a.Function

describe('loadimages', function () {

  var src = 'assets/img.png';

  it('should load single image', function () {
    loadimages(src, function (err, img) {
      img.src.should.equal(src);
    });
  });

  it('should load single array image', function () {
    loadimages([src], function (err, img) {
      should(img.length).equal(1);
      img[0].src.should.equal(src);
    });
  });
});
