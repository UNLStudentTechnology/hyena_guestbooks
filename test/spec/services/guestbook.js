'use strict';

describe('Service: Guestbook', function () {

  // load the service's module
  beforeEach(module('hyenaGuestbooksApp'));

  // instantiate service
  var Guestbook;
  beforeEach(inject(function (_Guestbook_) {
    Guestbook = _Guestbook_;
  }));

  it('should do something', function () {
    expect(!!Guestbook).toBe(true);
  });

});
