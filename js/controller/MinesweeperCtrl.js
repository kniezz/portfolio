Application.controller("MinesweeperCtrl", function($scope, $utilService){

	$scope.msconfig = {};
	$scope.msgame = {};
	$scope.mstable = [];
	$scope.bombCounter = 0;

	$scope.doStart = function(){
		angular.copy($scope.msconfig, $scope.msgame);
		$scope.bombCounter = $scope.msgame.bomb;
		$scope.mstable = [];
		var msrow;
		for(var row=0; row<$scope.msgame.width; row++){
			msrow = [];
			for(var col=0; col<$scope.msgame.height; col++){
				msrow.push({'row':row, 'col':col, 'isBomb':false, 'bombCount':'', 'display':'', 'isOpen':false});
			}
			$scope.mstable.push(msrow);
		}

		$scope.placeBomb();
	}

	$scope.placeBomb = function(){
		var count = $scope.msgame.bomb;
		var row, col;
		while(count > 0){
			row = $utilService.randomRange(0, $scope.msgame.width-1);
			col = $utilService.randomRange(0, $scope.msgame.height-1);
			if(!$scope.mstable[row][col].isBomb){
				$scope.mstable[row][col].isBomb = true;
				count--;
			}
		}
		$scope.countBomb();
	}

	$scope.countBomb = function(){
		var count = 0;
		for(var row=0; row<$scope.msgame.width; row++){
			for(var col=0; col<$scope.msgame.height; col++){
				count = 0;
				if(!$scope.mstable[row][col].isBomb){
					try{if($scope.mstable[row-1][col].isBomb){count++;}}catch(err){}
					try{if($scope.mstable[row+1][col].isBomb){count++;}}catch(err){}
					try{if($scope.mstable[row][col-1].isBomb){count++;}}catch(err){}
					try{if($scope.mstable[row][col+1].isBomb){count++;}}catch(err){}
					try{if($scope.mstable[row-1][col-1].isBomb){count++;}}catch(err){}
					try{if($scope.mstable[row-1][col+1].isBomb){count++;}}catch(err){}
					try{if($scope.mstable[row+1][col-1].isBomb){count++;}}catch(err){}
					try{if($scope.mstable[row+1][col+1].isBomb){count++;}}catch(err){}
					$scope.mstable[row][col].bombCount = count;
				}
			}
		}
	}

	$scope.doPlay = function(row, col){		
		try{
			if($scope.mstable[row][col].isOpen){
				return;
			}else{
				$scope.mstable[row][col].isOpen = true;
			}
			if($scope.mstable[row][col].isBomb){
				$scope.mstable[row][col].display = '*';
				alert("Fail");
				return;
			}else{
				
				if($scope.mstable[row][col].bombCount === 0){
					$scope.mstable[row][col].display = '';
					try{$scope.doPlay(row-1, col);}catch(err){}
					try{$scope.doPlay(row+1, col);}catch(err){}
					try{$scope.doPlay(row, col-1);}catch(err){}
					try{$scope.doPlay(row, col+1);}catch(err){}
					try{$scope.doPlay(row-1, col-1);}catch(err){}
					try{$scope.doPlay(row-1, col+1);}catch(err){}
					try{$scope.doPlay(row+1, col-1);}catch(err){}
					try{$scope.doPlay(row+1, col+1);}catch(err){}
				}else{
					$scope.mstable[row][col].display = $scope.mstable[row][col].bombCount;
					return;
				}
			}
		}catch(err){}
	}

	$scope.doRightClick = function(row, col){
		if($scope.mstable[row][col].display === "?"){
			$scope.mstable[row][col].display = "";
			$scope.bombCounter++;
		}else{
			$scope.mstable[row][col].display = "?";
			$scope.bombCounter--;
		}
	}

});