reorderPlaylistApp.controller('testCtrl', function ($scope, $firebaseObject) {

  $scope.availableFields = [{country: "France"}, {country: "Spain"}, {country: "Italy"}, {country: "Germany"}, {country: "Belgium"}, {country: "Netherlands"}];
  
  $scope.dropzoneFields = [];
  
  $scope.dragging = false;
  
  $scope.draggable = {
        connectWith: ".dropzone",
        start: function (e, ui) {
            $scope.$apply(function() {
              $scope.dragging = true
            });
            $('.dropzone').sortable('refresh');
        },
        update: function (e, ui) {
            if (ui.item.sortable.droptarget[0].classList[0] !== "dropzone")
                ui.item.sortable.cancel();
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

});