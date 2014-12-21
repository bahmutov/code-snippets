// runs application digest cycle starting from root scope
/* global angular */
angular.element(document).injector().get('$rootScope').$apply();
