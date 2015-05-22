reorderPlaylistApp.controller('copyableCtrl', function ($scope, $rootScope) {
  //All songs

  //Variables accessible from other controllers
  $rootScope.copyableCtrlGlobal = {}
  $scope.copyableCtrlLocal = {}

  $scope.draggableOptions = {
    connectWith: ".connected-drop-target-sortable",
    start: function (e, ui) {
      $rootScope.setListCtrlGlobal.updateCopyable() //For some reason this is needed because the element will sometimes be removed from the copyable list.  
    },
    update: function (e, ui) {
      if($rootScope.setListCtrlGlobal.selectedSetList == "" || $rootScope.setListCtrlGlobal.selectedSetList == undefined){ 
        //To prevent items to be put in the list area when no list is selected
        ui.item.sortable.cancel()
      }
      $rootScope.copyableCtrlGlobal.draggingObjectIsFromAllSongs = true //To prevent the object from being removed from the original list.
    },
    stop: function (e, ui) {
    }
  };

});









