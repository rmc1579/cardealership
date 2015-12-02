angular.module("autoApp")
.directive("headerSection", function(){
    
    return {
        restrict: 'E',
        templateUrl: '../modules/header.html'
    };

})//end of headerSection directive

.directive("footerSection" , function(){
    return{
        restrict: 'E',
        templateUrl:'../modules/footer.html'
    }
    
})//end of footerSection directive

.directive("messages", function(){
    return{
        restrict: 'E',
        templateUrl: '../admin/messages.html'
    }
})//end of footerSection directive

.directive("carresults", function(){
    return{
        restrict: 'E',
        templateUrl: '../pages/search_results.html'
    }
});//end carrresults