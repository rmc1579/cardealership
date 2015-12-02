var app = angular.module("autoApp")
app.controller("MainCtrl", ['$scope', '$firebase', '$location', 'contactUsService', function($scope, $firebase, $location, contactUsService){
    /*console.log(currentAuth);
    if(!currentAuth){
        $state.go('/admin');
    }*/
    
    
    $scope.date = new Date();
    $scope.firstName = "First Name";
    $scope.lastName = "Last Name";
    var email = "Email";
    var password = "Password";
    $scope.email = email
    $scope.emailauth = email;
    $scope.phoneNumber = "Phone Number";
    $scope.password = password;
    $scope.passwordauth = password;
    $scope.newContact = {};
    $scope.authObj = {};
    $scope.loggedout = false;
    $scope.loggedin =false;
    $scope.generalView = true;
    $scope.messageView = false;
    $scope.showcarsection = false;
    $scope.showseemore = true;
    $scope.cartype = '';
    
    $scope.searchFormItem = {};
    
    $scope.carMakes = {
        makes: [
            
            {id:'acura', make: 'Acura'},
            {id:'alfa-romeo', make: 'Alfa Romeo'},
            {id:'aston-martin', make: 'Aston Martin'},
            {id:'audi', make: 'Audi'},
            {id:'Bentley', make: 'Bentley'},
            {id:'bmw', make: 'BMW'},
            {id:'buick', make: 'Buick'},
            {id:'cadillac', make: 'Cadillac'},
            {id:'chevrolet', make: 'Chevrolet'},
            {id:'chrysler', make: 'Chrysler'},
            {id:'dodge', make: 'Dodge'},
            {id:'ferrari', make: 'Ferrari'},
            {id:'fiat', make: 'FIAT'},
            {id:'ford', make: 'Ford'},
            {id:'gmc', make: 'GMC'},
            {id:'honda', make: 'Honda'},
            {id:'hyundai', make: 'Hyundai'},
            {id:'infiniti', make: 'Infiniti'},
            {id:'jaguar', make: 'Jaguar'},
            {id:'jeep', make: 'Jeep'},
            {id:'kia', make: 'Kia'},
            {id:'lamborghini', make: 'Lamborghini'},
            {id:'land-rover', make: 'Land Rover'},
            {id:'lexus', make: 'Lexus'},
            {id:'lincoln', make: 'Lincoln'},
            {id:'lotus', make: 'Lotus'},
            {id:'maserati', make: 'Maserati'},
            {id:'mazda', make: 'Mazda'},
            {id:'mclaren', make: 'McLaren'},
            {id:'mercedes-benz', make: 'Mercedes-Benz'},
            {id:'mini', make: 'Mini'},
            {id:'mitsubishi', make: 'Mitsubishi'},
            {id:'Nissan', make: 'Nissan'},
            {id:'Porsche', make: 'Porsche'},
            {id:'ram', make: 'Ram'},
            {id:'rolls-royce', make: 'Rolls-Royce'},
            {id:'scion', make: 'Scion'},
            {id:'smart', make: 'Smart'},
            {id:'subaru', make: 'Subaru'},
            {id:'tesla', make: 'Tesla'},
            {id:'toyota', make: 'Toyota'},
            {id:'volkswagen', make: 'Volkswagen'},
            {id:'volvo', make: 'Volvo'}
       ],
    };
    
    var carModelsId = [];
    var carModelesName = [];
    
    $scope.carModel = [];
    
    
    
    $scope.carYear = [
      '2015','2014','2013','2012','2011','2010',
        '2009','2008','2007','2006','2005',
        '2004','2003', '2002','2001','2000'
    ];
    
    
    $scope.notItemMessage = "No Items Found, Please Select a Different Model";
    
    //$scope.notFoundItem = false;
    
    $scope.searchResults = '';
    $scope.searccarresults = false;
    
    $scope.setContact = function(){
        var result = contactUsService.addContact($scope.newContact);
    };
    
    
    $scope.getContact = function(){
        
        contactUsService.readContact()
        .then(function(result){
//            for (var key in result){
//                console.log(key);
//                console.log(result[key]);
//            }

            $scope.messages = result;
            console.log($scope.messages);
        });
    };
    
    
    
    $scope.getAuth = function(){
        
        contactUsService.auth($scope.authObj)
            .then(function(result){
                console.log("result = ", result);
                $scope.getContact();
                $location.path('/admin/messages');
        });
    };
    
    $scope.UserLogOut = function(){
        
        sessionStorage.userInfo = null;
        //localStorage.userInfo = null;
        delete sessionStorage.userInfo;
        localStorage.clear();
        $scope.messages = null;
        
        $location.path('/admin');
        
    };
    
    $scope.changeColor = function(){
        $scope.personColour = {background: '#eaeaea'};
    };
    
    $scope.changeColorBack = function(){
        $scope.personColour = {background: '#bababa'};
    };
    
    $scope.init = function(id){
        if (id === 'read'){
            $scope.getContact();
        }
    };
    
    $scope.getCars = function(type){
        /*console.log(type);
        if (type === null || type === ''){
            type == $scope.cartype[0];    
        }
        else{
            $scope.cartype[0] = type;
        }*/
        
        $scope.cartype = type;
        
        $scope.searchFormItem.category = type;
        console.log($scope.searchFormItem);
        $location.path('/carsearch');
        
        //contactUsService.getCars(type).then(function(d){
            //console.log(d);
        //});
        
    };
    
    $scope.selectMake = function(){
        //console.log($scope.searchFormItem.makeSelected);
        $scope.carModel = [];
        console.log($scope.carModel);
        
        contactUsService.getModels($scope.searchFormItem.make)
            .then(function(data){
            
                for (key in data.models){
                    carModelsId[key] = data.models[key].id;
                    carModelesName[key] = data.models[key].name;
                } 

                for (var i = 0; i<carModelsId.length; i++){
                    //$scope.carModel.push(carModelsId[i] , carModelesName[i]);
                    $scope.carModel.push(carModelesName[i]);
                }
            
            //console.log(carModelsId, carModelesName);
            
            //console.log($scope.carModel);
            
        });
        
    };//end selectMake
    
    
    $scope.submitCarSearch = function(){
        //console.log($scope.searchFormItem)
        console.log($scope.searchFormItem);
        contactUsService.searchCarsAPI($scope.searchFormItem)
        .then(function(results){
            
            var getResultsSize = [];
            var getResultsMarket = [];
            if (results === 0){
                $("#notItemFound").modal({
                    show: true  
                })
            }
            else{
                console.log(results);
                $scope.searchcarresults = true;
                $scope.searchResults = results;
                
                /*for (var i=0; i<results.data.styles.length; i++){
                    getResultsSize[i] = results.data.styles[i].categories.vehicleSize;
                    getResultsMarket[i] = results.data.styles[i].categories.market;
                    getResultsInfo[i] = 
                    console.log(results.data.styles[i].model.id);
                }*/
            }
        });
        
    };//end submitCarSearch
    
    $scope.swapTabs = function(id){
        
    };//end swapTabs
    
        
}]);// end MainCtrl controller