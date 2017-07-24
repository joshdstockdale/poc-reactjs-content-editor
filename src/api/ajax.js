// A-> $http function is implemented in order to follow the standard Adapter pattern
export default function $http(url, headers){

  // A small example of object
  const core = {

    // Method that performs the ajax request
    ajax: function (method, url, args) {

      // Creating a promise
      const promise = new Promise( function (resolve, reject) {

        // Instantiates the XMLHttpRequest
        const client = new XMLHttpRequest();
        let uri = url;

        if (args && (method === 'POST' || method === 'PUT')) {
          uri += '?';
          let argcount = 0;
          for (let key in args) {
            if (args.hasOwnProperty(key)) {
              if (argcount++) {
                uri += '&';
              }
              uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
            }
          }
        }

        client.open(method, uri);
        if(typeof headers === 'object'){
          if(headers.length > 0){
            headers.map(function(h){
              //console.log("name:"+h.name+" value:"+h.value);
              client.setRequestHeader(h.name, h.value);
            });
          }
        }
        client.send();

        client.onload = function () {
          if (this.status >= 200 && this.status < 300) {
            // Performs the function "resolve" when this.status is equal to 2xx
            resolve(this.response);
          } else {
            // Performs the function "reject" when this.status is different than 2xx
            reject(this.statusText);
          }
        };
        client.onerror = function () {
          reject(this.statusText);
        };
      });

      // Return the promise
      return promise;
    }
  };

  // Adapter pattern
  return {
    'get': function(args) {
      return core.ajax('GET', url, args, headers);
    },
    'post': function(args) {
      return core.ajax('POST', url, args, headers);
    },
    'put': function(args) {
      return core.ajax('PUT', url, args, headers);
    },
    'delete': function(args) {
      return core.ajax('DELETE', url, args, headers);
    }
  };
}
