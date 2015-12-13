var Application = angular.module('Application', ['ngRoute']);

Application.config(function ($routeProvider) {
	$routeProvider
	.when("/home", {
		templateUrl: "html/home.html"
	})
	.when("/xo", {
		templateUrl: "html/xo.html",
		controller: "XOCtrl"
	})
	.when("/minesweeper", {
		templateUrl: "html/minesweeper.html",
		controller: "MinesweeperCtrl"
	})
	.otherwise ({
		redirectTo : "/home"
	});
	
});

Application.directive('ngRightClick', function($parse) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                fn(scope, {$event:event});
            });
        });
    };
});