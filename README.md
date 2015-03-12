# bing_count

counts the number of bing search results for the given query

## Install

    npm install bing_count

## Using

```javascript
var bing_count = require('bing_count')
bing_count('food', function(count) {
  console.log(count) // will output
})
```

## Bing authentication

Please place your credentials in a yaml file .bing_keys.yaml with the format

    account_key: your_app_secret_here

Or set bing_count.account_key to the app secret

## Caching

You need to run a mongodb instance on localhost so that results can be cached.

The mongosrv command allows you to do this easily:

    npm install -g mongosrv
    mongosrv

To specify a different mongo url, modify bing_count.keyval.mongourl

## Credits

Author: [Geza Kovacs](http://github.com/gkovacs)

## License

MIT
