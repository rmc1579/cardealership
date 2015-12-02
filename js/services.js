angular.module("autoApp")
.service("contactUsService", function($firebaseArray, $q, $window, $http){
    
    this.addContact = function(newContact){
        
        console.log(newContact);
        var ref = new Firebase("https://brunellautosales.firebaseio.com/contacts");
        var fb = $firebaseArray(ref);
        
        fb.$add(newContact)
        .then(function(response) {
            console.log(response);
        }, function(error) {
            console.log("Error Creating Contact:", error);
        });
            
        
    };//end addContact
    
    
    this.readContact = function(){
        var deferred = $q.defer();
        var ref = new Firebase("https://brunellautosales.firebaseio.com/contacts/");
        ref.on("value", function(response){
            deferred.resolve(response.val());      
        }),function (erroObject){
            console.log("The read failed: " + errorObject.code);
        }
        return deferred.promise;
    };//end readContact
    
    
    this.auth = function(authObj){
        var deferred = $q.defer();
        var ref = new Firebase("https://brunellautosales.firebaseio.com");

        ref.authWithPassword(authObj, function(error, authData) {
          if (error) {
            switch (error.code) {
              case "INVALID_EMAIL":
                console.log("The specified user account email is invalid.");
                break;
              case "INVALID_PASSWORD":
                console.log("The specified user account password is incorrect.");
                break;
              case "INVALID_USER":
                console.log("The specified user account does not exist.");
                break;
              default:
                console.log("Error logging user in:", error);
            }
          } else {
                userInfo = {
                    accessToken: authData.token,
                    userId: authData.uid
                }
                $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
                deferred.resolve(userInfo);  
          }
        
        });
        
        return deferred.promise;
        
    };//end auth
    
    this.getCars = function(id){
        var deferred = $q.defer();
        var urlApi = '';
        if (id === "trucks"){
            urlApi = "https://api.edmunds.com/api/vehicle/v2/toyota?state=used&year=2014&view=full&fmt=json&api_key=xhcxku224w5x4qex8c88g64t";
            $http({
              method: 'GET',
              url: urlApi
            })
            .then(function successCallback(response) {
                console.log(response);
                deferred.resolve(response.data.model);
            }, function errorCallback(response) {
                console.log("Error Getting Data: ", response);
            });
        }
        
        return deferred.promise;
    };//end getCars
    
    this.getModels = function(make){
        var deffered = $q.defer();
        var modelsArray = [];
        var numberofObjects = 0;
        var urlApi = 'https://api.edmunds.com/api/vehicle/v2/'+make+'?state=used&year=2014&view=full&fmt=json&api_key=xhcxku224w5x4qex8c88g64t';
        $http({
            method: 'GET',
            url: urlApi
        }).then(function(response){
            //console.log(response);
            
            modelsArray = { models: [{id: 0, name: ''}], };
            for (var i = 0; i<response.data.models.length; i++){
                modelsArray.models.push({
                    id: response.data.models[i].years[0].id,
                    name: response.data.models[i].name
                }); 
            }
            modelsArray.models.shift();
            deffered.resolve(modelsArray);
                
            }, function(response){
            console.log("Error Getting Make", response);
            
        });
        return deffered.promise;
    };//end getModels
    
    this.searchCarsAPI = function(query){
        var deffered = $q.defer();
        var results = {};
        var photos = '';
        var urlApi = //'https://api.edmunds.com/api/vehicle/v2/'+query.make+'/'+query.model+'/'+query.year+'/styles?state=used&category='+query.category+'&view=full&fmt=json&api_key=xhcxku224w5x4qex8c88g64t';
        'https://api.edmunds.com/api/vehicle/v2/'+query.make+'/'+query.model+'/'+query.year+'/styles?state=used&view=full&fmt=json&api_key=xhcxku224w5x4qex8c88g64t';
        
        var urlPhotos = 'https://api.edmunds.com/api/media/v2/'+query.make+'/'+query.model+'/'+query.year+'/photos?api_key=xhcxku224w5x4qex8c88g64t'

        $http({
            method: 'GET',
            url: urlApi
        }).then(function(response){
            //console.log(response);
            console.log(response.data.styles.length);
            if (response.data.styles.length > 0){
                
                results = response;
                //console.log(results);
            }
            else{
                results = 0;
            }
            deffered.resolve(results);
            
            }, function(response){
            console.log("Error Getting Car Data: ", response);
        });
        
        //Media Query = Photos
        /*$http({
            method: 'GET',
            url: urlPhotos
            }).then(function(response){
                photos = response;
            
            },function(response){
                console.log("Error Getting Car Photos: ", response);
        });*/
        //deffered.resolve(results);
        return deffered.promise;
    };//end searchCarsAPI
    
    
});//end service contactUsService