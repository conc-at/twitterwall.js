'use strict'

var urljoin = require('url-join')
var request = require('request')

function Twitterwall(options){
  if(!(this instanceof Twitterwall)) return new Twitterwall(options)
  if(!options.server || !options.username || !options.password) throw new Error('no server, username or password set')
  this.config = {server: options.server, username: options.username, password: options.password}
}

Twitterwall.prototype.sendRequest = function(url, data, callback){
  request({
    method: 'POST',
    url: urljoin(this.config.server, url),
    json: true,
    body: data,
    auth: this.config
  }, function (error, response, body){
    if(!error && response.statusCode === 200) callback(null, body)
    else if(!error && response.statusCode === 401) callback(new Error('not authorized'))
    else callback(error)
  })
}

module.exports = Twitterwall
