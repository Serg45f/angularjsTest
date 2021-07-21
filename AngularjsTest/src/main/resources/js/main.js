var app = angular.module("UserManagement", []);
 
// Controller Part
app.controller("UserController", function($scope, $http) {
 
 
    $scope.users = [];
    $scope.user = {
        id: 1,
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    };
    $scope.authenticationRequestDto = {
            username: "",
            password: ""
        };
 
    // Now load the data from server
    refreshUsersData();

 // HTTP POST/PUT methods for add/edit user
     // Call: http://localhost:8075/api/v1/users
     $scope.loginUser = function() {

         var method = "";
         var url = "";

         method = "POST";
         url = '/api/v1/auth/login';

         $http({
             method: method,
             url: url,
             data: angular.toJson($scope.authenticationRequestDto),
             headers: {
                 'Content-Type': 'application/json'
             }
         }).then(success, error);
     };

    // HTTP POST/PUT methods for add/edit user
    // Call: http://localhost:8075/api/v1/users
    $scope.submitUser = function() {
 
        var method = "";
        var url = "";
 
        if ($scope.user.id == -1) {
            method = "POST";
            url = 'http://localhost:8075/api/v1/users/add';
        } else {
            method = "PUT";
            url = 'http://localhost:8075/api/v1/users/edit';
        }
 
        $http({
            method: method,
            url: url,
            data: angular.toJson($scope.user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(success, error);
    };
 
    $scope.createUser = function() {
        clearFormData();
    }
 
    // HTTP DELETE- delete user by Id
    // Call: http://localhost:8075/api/v1/users/{empId}
    $scope.deleteUser = function(user) {
        $http({
            method: 'DELETE',
            url: 'http://localhost:8075/api/v1/users/' + user.id
        }).then(success, error);
    };
 
    // In case of edit
    $scope.editUser = function(user) {
        $scope.user.id = user.id;
        $scope.user.firstName = user.firstName;
        $scope.user.lastName = user.lastName;
        $scope.user.email = user.email;
    };
 
    // Private Method  
    // HTTP GET- get all users collection
    // Call: http://localhost:8075/api/v1/users
    function refreshUsersData() {
        $http({
            method: 'GET',
            url: 'http://localhost:8075/api/v1/users'
        }).then(
            function(res) { // success
                $scope.users = res.data;
            },
            function(res) { // error
                console.log("Error: " + res.status + " : " + res.data);
            }
        );
    }
 
    function success(res) {
        refreshUserData();
        clearFormData();
    }
 
    function error(res) {
        var data = res.data;
        var status = res.status;
        var header = res.header;
        var config = res.config;
        alert("Error: " + status + ":" + data);
    }
 
    // Clear the form
    function clearFormData() {
        $scope.userForm.id = -1;
        $scope.userForm.firstName = "";
        $scope.userForm.lastName = "";
        $scope.userForm.email = ""
    };
});