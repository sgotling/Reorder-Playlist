// 
// Ta bort set list
// Ta bort låt helt
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
  	$scope.selectedComponents = $rootScope.setListCtrlGlobal.selectedSetList.songs; //Song in the selected set list.
    $rootScope.setListCtrlGlobal.updateCopyable() //This must be set in this callback function. Otherwise the view wont find the list
  });

  $scope.setListCtrlGlobal.hej=function (argument) {
    alert()
  }

  $scope.addSong = function (newSong) {
  	$scope.songLists.allSongs.push({title:newSong})
    $rootScope.setListCtrlGlobal.updateCopyable() //Updates the view
  }

  $scope.switchSelectedSetList = function (setList) {
    if(setList.songs == undefined){
      //Firebase will remove propety songs if it is empty.
        setList.songs = []  
      }
    $rootScope.setListCtrlGlobal.selectedSetList = setList;
    $scope.selectedComponents = setList.songs
  }

  $scope.createNewSetList = function (newSetList) {
    $scope.songLists.setLists.push({title:newSetList})
  }

  $scope.remove = function (list, index) { // används nog inte just nu...
    list.splice(index, 1)
  }
  $scope.setListCtrlGlobal.removeSetList = function (index) {
    $scope.songLists.setLists.splice(index, 1)
  }
  $scope.setListCtrlGlobal.removeSongFromAllSongs = function (index) {
    // alert(index)
    $scope.songLists.allSongs.splice(index, 1)
    $rootScope.setListCtrlGlobal.updateCopyable()
  }

  $scope.setListCtrlGlobal.updateCopyable = function () { //Detta suger att man måste göra... Listan kommer nu inte att uppdatera direkt vid ändringar i FB
    var originalcopyable = $scope.songLists.allSongs 
    $rootScope.setListCtrlGlobal.copyable = originalcopyable.map(function(x){ //Every copyable object needs to be in a unique list for the drop event handler
      return [x];
      });
    return this.copyable
  }
});









