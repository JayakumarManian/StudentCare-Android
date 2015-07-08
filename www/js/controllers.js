angular.module('starter.controllers', ['ionic', 'ngCordova'])
.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http,$ionicLoading) {
 
$scope.show = function() {
    $ionicLoading.show({
      template: '<p><ion-spinner class="spinner-balanced" icon="lines"></ion-spinner>Loading...</p>'
      
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide();
  };
  getTask();
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

   function getTask(){ 	 
	$scope.show(); 
	$http.post("http://smartplough.com/MobileService/getTask.php").success(function(data){
	$scope.hide();
    $scope.tasks = data;	 
       });
  };
  
   $scope.addTask = function (task) {
  
    $http.post("http://smartplough.com/MobileService/addTask.php?task="+task).success(function(data){
        getTask();
        $scope.taskInput = "";
      });
  };
   $scope.upadeStatus = function(rollNo) {
   // console.log('MJK_01',rollNo);
		var roll=rollNo.split(",");
		var mjk=roll[0];
      $http.post("http://smartplough.com/MobileService/updateTask.php?rollNo="+mjk).success(function(data){
	 // console.log('MJK_01',roll[0]);
	
        getTask();
		
      });
  };
  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})
.controller("Barcode", function($scope, $cordovaBarcodeScanner) {
 
    $scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            alert(imageData.text);
			$scope.scannedData=imageData.text;
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
        }, function(error) {
            console.log("An error happened -> " + error);
        });
    };
 
})


.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Jayakumar', id: 1 },
    { title: 'Aravind', id: 2 },
    { title: 'Sree', id: 3 },
    { title: 'Selva', id: 4 },
    { title: 'Ramesh', id: 5 },
    { title: 'Robert', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});


