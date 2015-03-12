// Generated by LiveScript 1.3.1
(function(){
  var jsYaml, fs, request, get_account_key, bing_count;
  jsYaml = require('js-yaml');
  fs = require('fs');
  request = require('request');
  get_account_key = function(){
    var account_key;
    if (bing_count.account_key != null) {
      return bing_count.account_key;
    }
    account_key = jsYaml.safeLoad(fs.readFileSync('.bing_keys.yaml', 'utf-8')).account_key;
    bing_count.account_key = account_key;
    return account_key;
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
          password: get_account_key(),
          sendImmediately: true
        }
      }, function(err, response, body){
        var result;
        result = JSON.parse(body).d.results[0].WebTotal;
        return set(query, result, function(){
          return callback(result);
        });
      });
    });
  };
  bing_count.keyval = require('mongo_keyval');
  if ((typeof module != 'undefined' && module !== null) && module.exports != null) {
    module.exports = bing_count;
  }
}).call(this);