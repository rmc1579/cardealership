var app = angular.module("autoApp", ['firebase', 'ui.router']);

app.run(["$rootScope", "$state", function($rootScope, $state) {
    $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
          // We can catch the error thrown when the $requireAuth promise is rejected
          // and redirect the user back to the home page
          if (error === "AUTH_REQUIRED") {
              console.log("AUTH_REQUIRED", error);
            $state.go("admin");
          }
    });
}]);

app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("Here you need firebase database link");
    return $firebaseAuth(ref);
  }
]);


app.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
    .state('home' ,{
        url: '/home',
        templateUrl:'/home.html'
    })
    .state('contact', {
        url: '/contact-us',
        templateUrl: 'contact-us/index.html'

    })
    .state('admin',{
        url: '/admin',
        templateUrl: 'admin/index.html'
    })
    .state('messages',{
        url: '/admin/messages',
        controller: 'MainCtrl',
        templateUrl: '/admin/messages.html',
        resolve: {
            "currentAuth": ["Auth", function(Auth) {
                // $requireAuth returns a promise so the resolve waits for it to complete
                // If the promise is rejected, it will throw a $stateChangeError (see above)
                return Auth.$requireAuth();
              }]
            
            /*authUser: ["$q", "contactUsService", function($q, contactUsService){
                var userInfo = contactUsService.auth();

                if (userInfo) {
                    return $q.when(userInfo);
                } 
                else {
                    return $q.reject({ authenticated: false });
                }
            }]*/
        }
    })
    .state ('company', {
        url: '/company',
        templateUrl: 'pages/company.html'
    })
    .state('privacy',{
        url: '/privacy',
        templateUrl: 'pages/privacy.html'
    })
    .state ('carsearch', {
        url:'/carsearch',
        templateUrl: 'pages/car_widget.html'
    })
    .state ('carresults', {
        url: '/carresults',
        templateUrl: 'pages/search_results.html'
    });
        
        
    
    
});




