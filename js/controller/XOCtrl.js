Application.controller('XOCtrl',  function ($scope){
	$scope.xotable = [];
	$scope.turns = ['X','O'];
	$scope.count = 0;
	$scope.turn = $scope.turns[$scope.count];

	var xorow;
	for(var i=0; i<3; i++){
		xorow = [];
		for(var j=0; j<3; j++){
			xorow.push({'row':i, 'col':j, 'value':''});
		}
		$scope.xotable.push(xorow);
	}

	$scope.doPlay = function(row, col){
		$scope.xotable[row][col].value = $scope.turn;

		$scope.count++;
		$scope.turn = $scope.turns[$scope.count%2];
		$scope.checkWinner();

	}

	$scope.checkWinner = function(){
		try{
			if($scope.xotable[row][col].value === $scope.xotable[row-1][col].value && $scope.xotable[row][col].value === $scope.xotable[row+1][col].value){
				alert($scope.turn+" win");
			}
		}catch(err){
			
		}

		try{
			if($scope.xotable[row][col].value === $scope.xotable[row][col-1].value && $scope.xotable[row][col].value === $scope.xotable[row][col+1].value){
				alert($scope.turn+" win");
			}
		}catch(err){
			
		}

		try{
			if($scope.xotable[row][col].value === $scope.xotable[row][col].value && $scope.xotable[row][col].value === $scope.xotable[row][col+1].value){
				alert($scope.turn+" win");
			}
		}catch(err){
			
		}
	}
	
});