angular
  .module('addressbook')
  .factory('Contact', Contact);

  function Contact($http) {
      return {
          getAll: function () {
              return $http.get('/api/contacts')
                  .then(function (response) {
                      return response;
                  });
          },

          create: function (contact) {
              return $http.post('/api/contacts/'+ contact)
                  .then(function(response){
                      return response.data;
              });
          },

          update: function (contact, id) {
              return $http.put('/api/contacts/' + id, contact)
                  .then(function (response) {
                      return response.data;
                  });
          },

          delete: function (contacts) {
              return $http.delete('/api/contacts/' + contacts)
                  .then(function (response) {
                      return response;
                  });
          }
      };

  }
