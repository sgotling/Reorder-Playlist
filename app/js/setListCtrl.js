// LÄGG TILL NYA LÅTAR TILL TOMMA LISTOR
// Ta bort set list
// Ta bort låt helt
// 
// STÄDA - Dela upp i funtioner
// 
// 
// 


reorderPlaylistApp.controller('setListCtrl', function ($scope, $firebaseObject) {

  var ref = new Firebase('https://reorder-playlist.firebaseio.com/');
  var songListsObject = $firebaseObject(ref);
  $scope.songLists;
  songListsObject.$bindTo($scope, "songLists").then(function () {
  	$scope.updateDraggables()
  	


  	$scope.selectedComponents = $scope.setListCtrl.selectedSetList.songs;


    
  });


$scope.setListCtrl = {
	selectedSetList:""
}
$scope.hej = function () {
	alert()
}

$scope.addSong = function (newSong) {
	$scope.songLists.allSongs.push({title:newSong})
	$scope.updateDraggables()
}

$scope.updateDraggables = function () {	//Detta suger att man måste göra... Listan kommer nu inte att uppdatera direkt vid ändringar i FB
	var originalDraggables = $scope.songLists.allSongs
  	$scope.draggables = originalDraggables.map(function(x){
    	return [x];
  	});
}


$scope.createNewSetList = function (newSetList) {
	// $scope.songLists.setLists = [];
	$scope.songLists.setLists.push({title:newSetList})
}

$scope.changeSetList = function (setList) {
  if(setList.songs == undefined){
      setList.songs = []  
    }
	$scope.setListCtrl.selectedSetList = setList;
  // setList.songs = []
  // setList.songs.push({title:"lååt"})
	$scope.selectedComponents = setList.songs
	// console.log(setList.songs)
	// setList.songs = [{title:"LÅÅÅTEN"}]
	// var originalDraggables = setList.songs
	// $scope.draggables = originalDraggables.map(function(x){	//Detta suger att man måste göra... Listan kommer nu inte att uppdatera direkt vid ändringar i FB
 //    	return [x];
 //  	});
}
$scope.remove = function (list, index) {
	console.log(list)
	list.splice(index, 1)
	console.log(list)

}






  //All songs
  $scope.draggableOptions = {
    connectWith: ".connected-drop-target-sortable",
    // dropOnEmpty: "true",
    start: function (e, ui) {
      $scope.updateDraggables() //For some reason this is needed because the element will sometimes be removed from the draggables list.

      console.log("start")
      
      console.log($scope.draggables)
      console.log(ui.item.sortable.sourceModel)

      // $scope.dragging = true;
        
    },
    update: function (e, ui) {
      if($scope.setListCtrl.selectedSetList == "" || $scope.setListCtrl.selectedSetList == undefined){
        ui.item.sortable.cancel()
      }
      // console.log($scope.setListCtrl.selectedSetList)
      console.log("update")
      console.log($scope.draggables)
      // alert() //Efter detta blir det fel i firebase

      // $scope.dragging = true;
      // alert("dragg")
      // console.log(ui.item.sortable.droptarget[0].classList[0])
      // console.log(ui.item.sortable.source[0].classList[0])
      // alert("dragging " + $scope.dragging)
      $scope.dragFromAllSongs = true
      // ui.item.sortable.cancel()    //när denna är kommenterad funkar det att lägga till men inte byta ordning. Slänga går.
    },
    stop: function (e, ui) {
      console.log("stop")
      console.log($scope.draggables)
      // if the element is removed from the first container
      // if (ui.item.sortable.source.hasClass('draggable-element-container') &&
      //     ui.item.sortable.droptarget &&
      //     ui.item.sortable.droptarget != ui.item.sortable.source &&
      //     ui.item.sortable.droptarget.hasClass('connected-drop-target-sortable')) {
      //   // restore the removed item
      //   ui.item.sortable.sourceModel.push(ui.item.sortable.model);
      // }
    }
  };
  

  $scope.dropzoneFields = [];
  
  $scope.dragging = false;


  //Selected set list
  $scope.sortableOptions = {
    connectWith: ".dropzone",
    // dropOnEmpty: "true",
        start: function (e, ui) {
            $scope.$apply(function() {
              $scope.dragging = true
            });
            $('.dropzone').sortable('refresh');
        },
        update: function (e, ui) {
          // console.log(ui.item)
      // alert($scope.dragging)

            if ($scope.dragFromAllSongs === true){ 
            // if (ui.item.sortable.droptarget[0].classList[0] !== "dropzone"){ 
              // alert()

            ui.item.sortable.cancel(); //när denna är bortkommenterad funkar allt utom att låtarna försvinner från all songs
            // alert()                  // Man vill komma in hit här endast när man hämta från all songs.
            }
            $scope.dragFromAllSongs = false;
            
        },
        stop: function (e, ui) {
            if (ui.item.sortable.droptarget == undefined) {
                $scope.$apply($scope.dragging = false);
                return;
            }else if (ui.item.sortable.droptarget[0].classList[0] == "dropzone") {
                // run code when item is dropped in the dropzone
                $scope.$apply($scope.dragging = false);
            }else{
              $scope.$apply($scope.dragging = false);
            }
        }
  };
    $scope.draggable = {
        
    };

});









