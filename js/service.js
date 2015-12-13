Application.factory('$utilService', function() {
        return {
            randomRange: function(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
        };
    });