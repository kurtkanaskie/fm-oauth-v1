/* jshint node:true */
'use strict';

var apickli = require('apickli');
var config = require('../../test-config.json');
var apps = require('../../devAppKeys.json');

console.log('apiconfig: [' + config.apiconfig.domain + ', ' + config.apiconfig.basepath + ']');

module.exports = function() {
    // cleanup before every scenario
    this.Before(function(scenario, callback) {
        this.apickli = new apickli.Apickli('https', config.apiconfig.domain + config.apiconfig.basepath);
        
        this.apickli.storeValueInScenarioScope("apiproxy", config.apiconfig.apiproxy);
        this.apickli.storeValueInScenarioScope("basepath", config.apiconfig.basepath);
        getCredsFromExport(config.apiconfig.app, config.apiconfig.product);
        console.log( "CREDS: " + config.apiconfig.app + " " + config.apiconfig.product + " " + keys.clientId + " " + keys.clientSecret);
        this.apickli.storeValueInScenarioScope("clientId", keys.clientId);
        this.apickli.storeValueInScenarioScope("clientSecret", keys.clientSecret);
        this.apickli.storeValueInScenarioScope("oauthDomain", config.apiconfig.oauthDomain );
        this.apickli.storeValueInScenarioScope("oauthBasepath", config.apiconfig.oauthBasepath);
        this.apickli.storeValueInScenarioScope("userUsername", config.apiconfig.userUsername);
        this.apickli.storeValueInScenarioScope("userPassword", config.apiconfig.userPassword);
        callback();
    });
};

var keys = {};

// Just take the first match
function getCredsFromExport(appName, productName){
  for(var app in apps){
    if(apps[app].name === appName){
      var credentials = apps[app].credentials;
      for(var credential in credentials){
        var products = credentials[credential].apiProducts;
        for(var product in products){
          if(products[product].apiproduct === productName){
            keys.clientId = credentials[credential].consumerKey;
            keys.clientSecret = credentials[credential].consumerSecret;
          }
          break;
        }
        break;
      }
      break;
    }
  }
}

