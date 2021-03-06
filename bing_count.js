// Generated by LiveScript 1.3.1
(function(){
  var jsYaml, fs, request, getsecret, get_account_key, bing_count;
  jsYaml = require('js-yaml');
  fs = require('fs');
  request = require('request');
  getsecret = require('getsecret');
  get_account_key = function(){
    if (bing_count.account_key != null) {
      return bing_count.account_key;
    }
    bing_count.account_key = getsecret('bing_account_key');
    if (bing_count.account_key == null) {
      throw 'need to specify bing_account_key in .getsecret.yaml or as an environment variable';
    }
    return bing_count.account_key;
  };
  bing_count = function(query, callback){
    var ref$, get, set;
    ref$ = bing_count.keyval, get = ref$.get, set = ref$.set;
    return get(query, function(cached_result){
      var url;
      if (cached_result != null) {
        callback(cached_result);
        return;
      }
      console.log('fetching bing_count for ' + query);
      url = 'https://api.datamarket.azure.com/Data.ashx/Bing/SearchWeb/v1/Composite?Query=' + escape("'" + query + "'") + '&$top=1&$format=JSON';
      return request({
        url: url,
        auth: {
          username: '',
          password: get_account_key('bing_account_key'),
          sendImmediately: true
        }
      }, function(err, response, body){
        var result;
        result = parseInt(JSON.parse(body).d.results[0].WebTotal);
        return set(query, result, function(){
          return callback(result);
        });
      });
    });
  };
  bing_count.keyval = require('mongo_keyval');
  bing_count.keyval.collection = 'bingcount';
  if ((typeof module != 'undefined' && module !== null) && module.exports != null) {
    module.exports = bing_count;
  }
}).call(this);
