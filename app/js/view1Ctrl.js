reorderPlaylistApp.controller('view1Ctrl', function ($scope, $firebaseObject) {

  $scope.hello = function(){
    alert("Hello World!");
  }

  var ref = new Firebase('https://reorder-playlist.firebaseio.com/');
  var playlistsObject = $firebaseObject(ref);
  $scope.playlists;
  playlistsObject.$bindTo($scope, "playlists").then(function () {
  	$scope.addSong()
  	// $scope.playlists["grym låt"] = {title:"grym låt", order:0}
  	
  });

  $scope.addSong = function () {
  	// alert()
  	var songList1 = ["grym låt", "bästa låten", "superlåten", "värstaste låten"];
  	var songList2 = ["grym", "bästa", "super", "värstaste"];
    $scope.playlists.list1 = []
    $scope.playlists.list2 = []
  	for (var i = 0; i < songList1.length; i++) {
  		// iString = i.toString();
  		$scope.playlists.list1.push({title:songList1[i]})
  		// var arr = $.makeArray( $scope.playlists );
  		// console.log(arr)
  	};
      for (var i = 0; i < songList2.length; i++) {
      // iString = i.toString();
      $scope.playlists.list2.push({title:songList2[i]})
      // var arr = $.makeArray( $scope.playlists );
      // console.log(arr)
    };
  	// $scope.playlists.list1 = songList1
  	// $scope.playlists.list2 = songList2

  }









  var tmpList = [];
  
  for (var i = 1; i <= 6; i++){
    tmpList.push({
      text: 'Item ' + i,
      value: i
    });
  }
  
  $scope.list = tmpList;
  
  
  $scope.sortingLog = [];
  
  $scope.sortableOptions = {
  	'ui-floating': false,
    update: function(e, ui) {
    	// alert("update")
      var logEntry = tmpList.map(function(i){
        return i.value;
      }).join(', ');
      $scope.sortingLog.push('Update: ' + logEntry);
      // console.log(e)
      // console.log(ui)

      // ui.item.sortable.cancel()

    },
    stop: function(e, ui) {
    	// alert("stop")
      // this callback has the changed model
      var logEntry = tmpList.map(function(i){
        return i.value;
      }).join(', ');
      $scope.sortingLog.push('Stop: ' + logEntry);
    }

  };



});