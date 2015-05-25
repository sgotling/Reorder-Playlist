// 
// OBS removeSetList tar inte bort något i FB!!!!
// Lös Problemet i allSongs
// 
reorderPlaylistApp.controller('setListCtrl', function ($scope, $rootScope, $firebaseObject) {
//setListCtrl

  //Variables accessible from other controllers
  $rootScope.setListCtrlGlobal = {
  selectedSetList:"" 
  }


  //Collects and binds data from firebase
  var ref = new Firebase('https://reorder-playlist.firebaseio.com/');
  var songListsObject = $firebaseObject(ref);
  $scope.songLists;
  songListsObject.$bindTo($scope, "songLists").then(function () {
  	$scope.selectedComponents = $rootScope.setListCtrlGlobal.selectedSetList.songs; //Songs in the selected set list.
    if ($scope.songLists.allSongs == undefined) {
        $scope.songLists.allSongs = []
    };
    if ($scope.songLists.setLists == undefined) {
        $scope.songLists.setLists = []
    };
      $rootScope.setListCtrlGlobal.updateCopyable() //This must be set in this callback function. Otherwise the view wont find the list
  });


  $scope.hej=function (argument) {
    alert()
  }

  $scope.addSongToAllSongs = function (newSong) {

    if (newSong == undefined || newSong == "") {}
    else{
      $scope.songLists.allSongs.push({title:newSong})
      $scope.songLists.allSongs.sort(compare)
      $rootScope.setListCtrlGlobal.updateCopyable() //Updates the view

    }
  	
  }

  $scope.addSongToSelectedPlayList = function (newSong) {
    if ($rootScope.setListCtrlGlobal.selectedSetList.songs == undefined) {
      $rootScope.setListCtrlGlobal.selectedSetList.songs = []
    };
    if ($scope.setListCtrlGlobal.editSelectedSetList == true) {
      console.log($rootScope.setListCtrlGlobal.selectedSetList.songs)
      $rootScope.setListCtrlGlobal.selectedSetList.songs.push(newSong);
    };
    
  }


  function compare(a,b) {
    if (a.title < b.title)
      return -1;
    if (a.title > b.title)
      return 1;
    return 0;
  }

  $scope.createNewSetList = function (newSetList) {
    console.log($scope.songLists)

    if ($scope.songLists.setLists == undefined) {
      $scope.songLists.setLists = []
    };
    if (newSetList == undefined || newSetList == "") {
    }
    else{
      $scope.songLists.setLists.push({title:newSetList})
    }
  }

  $scope.remove = function (list, index) { // används nog inte just nu...
    list.splice(index, 1)
  }

  $scope.removeSetList = function (index) {
    // console.log($scope.setLists)

    var a = confirm("Are you sure that you want to remove this set list?")
    if (a == true) {
    var list = $scope.songLists.setLists.splice(index, 1)
    console.log(list)
      if (list[0] == $rootScope.setListCtrlGlobal.selectedSetList) {
        $rootScope.setListCtrlGlobal.selectedSetList = undefined;
      };
    };
    $scope.setListCtrlGlobal.editSelectedSetList = false
    // console.log($scope.setLists)
  }
  $scope.removeSongFromAllSongs = function (index) {
    var a = confirm("Are you sure that you want to remove this song?")
    if (a == true) {
      $scope.songLists.allSongs.splice(index, 1)
      $rootScope.setListCtrlGlobal.updateCopyable()
    };
  }
  $scope.switchSelectedSetList = function (setList, index) {
    if(setList.songs == undefined){
      //Firebase will remove propety songs if it is empty.
        setList.songs = []  
      }
    $rootScope.setListCtrlGlobal.selectedSetList = setList;
    $scope.selectedComponents = setList.songs
    $rootScope.setListCtrlGlobal.selectedSetList.index = index;
    $rootScope.setListCtrlGlobal.editSelectedSetList = false;
    $rootScope.setListCtrlGlobal.hideSet = true;
  }

  $scope.testIfUntitled = function (input, type) {
    if (input == "") {
      input = "Untitled " + type;
      $rootScope.setListCtrlGlobal.selectedSetList.title = input;
      
    };
  }
  $scope.setListCtrlGlobal.updateCopyable = function () { //Detta suger att man måste göra... Listan kommer nu inte att uppdatera direkt vid ändringar i FB
    var originalcopyable = $scope.songLists.allSongs 
    $rootScope.setListCtrlGlobal.copyable = originalcopyable.map(function(x){ //Every copyable object needs to be in a unique list for the drop event handler
      return [x];
      });
    return this.copyable
  }
});









