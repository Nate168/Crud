<%@ Page ContentType="application/javascript" Language="C#" AutoEventWireup="true" CodeBehind="dataAccess.js.aspx.cs" Inherits="AI.Internal.Web.app.services.dataAccess_js" %>

(function () {
    'use strict';

    /**
     * Created by nzapata on 12/7/2015.
     * This make the call to the Web Api.
     */

    angular.module('IntranetApp').factory('answer', ['$http','$q',

      //calling the web api.
      function ($http,$q) {

          return {
                
              currentUser: function() {return "<%: AI.Internal.Web.DotNetHelper.CurrentUser(Context)  %>";},

              currentVersion: function() {return "<%: AI.Internal.Web.DotNetHelper.Version()  %>";},

              currentMode: function() {return "<%: AI.Internal.Web.DotNetHelper.Mode()  %>";},

              get: function (main) {

                  return $http.get('<%: AI.Internal.Web.DotNetHelper.AIMasterRestApi()  %>/' + main)


              },

              Add: function (mainCreate, create) {
                  return $http.post('<%: AI.Internal.Web.DotNetHelper.AIMasterRestApi()  %>/' + mainCreate, create);
              },


              Edit: function (mainEdit, ID) {
          

                  return $http.get('<%: AI.Internal.Web.DotNetHelper.AIMasterRestApi()  %>/' + mainEdit + ID)
              },


              Update: function (mainUpdate, id, result) {
  

                  return $http.post('<%: AI.Internal.Web.DotNetHelper.AIMasterRestApi()  %>/' + mainUpdate + id, result)
              },




              Remove: function (mainDelete, id) {
                  return $http.delete('<%: AI.Internal.Web.DotNetHelper.AIMasterRestApi()  %>/' + mainDelete + id)

              },

          createAll : function() {
          var allconfig = $http.get('<%: AI.Internal.Web.DotNetHelper.AIMasterRestApi()  %>/' + 'Config'),
           allmode = $http.get('<%: AI.Internal.Web.DotNetHelper.AIMasterRestApi()  %>/' + 'Mode');
         
           return $q.all([allconfig, allmode])
      

},

       EditAll: function(fId,sId){
       
           var config = $http.get('<%: AI.Internal.Web.DotNetHelper.AIMasterRestApi()  %>/'+ 'Config/' + fId),
                       mode = $http.get('<%: AI.Internal.Web.DotNetHelper.AIMasterRestApi()  %>/' + 'Mode/' + sId),
                  Allconfig = $http.get('<%: AI.Internal.Web.DotNetHelper.AIMasterRestApi()  %>/' + 'Config'),
                  Allmode = $http.get('<%: AI.Internal.Web.DotNetHelper.AIMasterRestApi()  %>/' + 'Mode');
               return $q.all([config, mode, Allconfig,Allmode])
},


          }


      }]);
}());
