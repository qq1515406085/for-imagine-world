/**
 * Created by tuanlhd on 11/19/14.
 */
HeaderController.inheritsFrom(BaseController);
function HeaderController($scope,$http){
    BaseController.call(this,$scope);
    $scope.email=""
    $scope.password=""

    this.login = function(){
        var self =this;
        $http.post(IW_HOST_CONTEXT_AUTHORIZE,
            "email=%s&password=%s".format($scope.email,$scope.password)
            ,
            {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        ).success(function(){
                self.requestUserInfo();
            }).error(function(){
                $scope.alertLoginFail="Please try login again !!!"
            });
    }

    this.requestUserInfo = function(){
        $http.get(IW_HOST_CONTEXT_USER_INFO).success(function(userInfo){
                globalApp.userInfo = userInfo
                $scope.alertLoginFail = null;
            });
    }

    this.requestUserInfo();

    this.validateEmail = function(){
        $scope.alertLoginFail = null;
    }

    $scope.$watch('email',this.validateEmail);
    $scope.$watch('password',this.validateEmail);

}