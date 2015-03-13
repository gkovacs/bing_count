require! {
  'js-yaml'
  fs
  'request'
  getsecret
}

get_account_key = ->
  if bing_count.account_key?
    return bing_count.account_key
  bing_count.account_key = getsecret('bing_account_key')
  if not bing_count.account_key?
    throw 'need to specify bing_account_key in .getsecret.yaml or as an environment variable'
  return bing_count.account_key

bing_count = (query, callback) ->
  {get,set} = bing_count.keyval
  get query, (cached_result) ->
    if cached_result?
      callback cached_result
      return
    console.log 'fetching bing_count for ' + query
    url = 'https://api.datamarket.azure.com/Data.ashx/Bing/SearchWeb/v1/Composite?Query=' + escape("'" + query + "'") + '&$top=1&$format=JSON'
    request {url: url, auth: {username: '', password: get_account_key('bing_account_key'), sendImmediately: true}}, (err, response, body) ->
      #console.log err
      #console.log response
      #console.log body
      result = parseInt JSON.parse(body).d.results[0].WebTotal
      set query, result, ->
        callback result

bing_count.keyval = require 'mongo_keyval'
bing_count.keyval.collection = 'bingcount'

if module? and module.exports?
  module.exports = bing_count
