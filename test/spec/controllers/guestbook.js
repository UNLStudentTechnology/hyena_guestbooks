'use strict';

describe('Controller: GuestbookCtrl', function () {

  // load the controller's module
  beforeEach(module('hyenaGuestbooksApp'));

  var GuestbookCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GuestbookCtrl = $controller('GuestbookCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
