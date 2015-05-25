reorderPlaylistApp.controller('sortableCtrl', function ($scope, $rootScope) {
  //Selected set list
  $scope.dragging = false; //Hides the drop to remove area
  $scope.dropzoneFields = [];

  
  $scope.sortableOptions = {
    connectWith: ".dropzone",
        start: function (e, ui) {
            $scope.$apply(function() {
              $scope.dragging = true //Shows the drop to remove area
            });
            $('.dropzone').sortable('refresh');
            $( ".allSongs" ).hide();
            $( ".selectedSetList" ).addClass("top-margin");
        },
        update: function (e, ui) {
            if ($rootScope.copyableCtrlGlobal.draggingObjectIsFromAllSongs === true){
            //To prevent the object from being removed from the original list.
            ui.item.sortable.cancel();
            }
            $rootScope.copyableCtrlGlobal.draggingObjectIsFromAllSongs = false;
            $( ".allSongs" ).show();
            $( ".selectedSetList" ).removeClass("top-margin");
            
        },
        stop: function (e, ui) {
          $( ".allSongs" ).show();
            $( ".selectedSetList" ).removeClass("top-margin");
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
});









