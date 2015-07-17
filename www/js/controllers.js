angular.module('starter.controllers', ['ionic', 'ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $http,$ionicPopup,$ionicLoading,$state, Auth) {


 

$scope.show = function() {
    $ionicLoading.show({
      template: '<p><ion-spinner class="spinner-balanced" icon="bubbles"></ion-spinner>Loading...</p>'
      
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide();
  };
  getTask();
  getAttendance();
  getAuth();
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  // Form data for the login modal
 
   function getTask(){ 	 
	$scope.show(); 
	$http.post("http://smartplough.com/MobileService/getitem.php").success(function(data){
	$scope.hide();
    $scope.tasks = data;	
	/* $http.post("http://smartplough.com/MobileService/getAttendance.php").success(function(data){
    $scope.attendance = data;	 
       }); */	
       });
  };
  
    function getAttendance(){ 	 
	$scope.show(); 
	$http.post("http://smartplough.com/MobileService/getAttendance.php").success(function(data){
	 
	$scope.hide();
    $scope.attendance = data;	 
       });
  };
    function getAuth(){ 	 
	$http.post("http://smartplough.com/MobileService/getAuth.php").success(function(data){
    $scope.auth = data;	 
	console.log('test',auth.username);
       });
  };
  
   $scope.addTask = function (task) {
    $http.post("http://smartplough.com/MobileService/additem.php?task="+task).success(function(data){
        getTask();
        $scope.taskInput = "";
      });
  };
   $scope.checkin = function(rollNo) {
   console.log('MJK_01',rollNo);
		var roll=rollNo.split(",");
		var mjk=roll[0];
      $http.post("http://smartplough.com/MobileService/checkin.php?rollNo="+mjk).success(function(data){
	   $ionicPopup.alert({
              title: 'Success',
             /*  content: 'Sucessfully updated' */
            })
	  console.log('MJK_01',roll[0]);
        getTask();
      });
  };
    $scope.checkout = function(rollNo) {
   console.log('MJK_01',rollNo);
		var roll=rollNo.split(",");
		var mjk=roll[0];
      $http.post("http://smartplough.com/MobileService/checkout.php?rollNo="+mjk).success(function(data){
	  $ionicPopup.alert({
              title: 'Success',
             /*  content: 'Sucessfully updated' */
            })
	  console.log('MJK_01',roll[0]);
        getTask();
      });
  };
  // Perform the login action when the user submits the login form
   $scope.loginData = {};  

  $scope.logout = function() {
    Auth.logout();
    $state.go("login");
  };

  $scope.showAlert = function() {
            $ionicPopup.alert({
              title: 'Success',
              content: 'Hello World!!!'
            }).then(function(res) {
              console.log('Test Alert Box');
            });
          };

   // Perform the login action when the user submits the login form
  $scope.doLogin = function() {

    if(!angular.isDefined($scope.loginData.username) || !angular.isDefined($scope.loginData.password) || $scope.loginData.username.trim() == "" || $scope.loginData.password.trim() == ""){
       alert("Enter both user name and password");
       return;
    }  

    Auth.setUser({
      username: $scope.loginData.username
	 
    });
/* if($scope.loginData.username==$scope.auth.username){ */
    $state.go("app.playlists");
	
      };

})

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
/*     $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
}) */
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



 

.controller('PlaylistsCtrl',function($scope) {
 $scope.shouldShowDelete = false;
 $scope.shouldShowReorder = false;
 $scope.listCanSwipe = true
})


 
.controller('PlaylistCtrl', function($scope, $stateParams) {
});


