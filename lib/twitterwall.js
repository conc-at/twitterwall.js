'use strict'

var urljoin = require('url-join')
var request = require('request')

function Twitterwall(username, password){
  if(!(this instanceof Twitterwall)) return new Twitterwall(username, password)
  if(!username || !password) throw new Error('no usernameor password set')
  this.auth = {username: username, password: password}
}

Twitterwall.prototype.sendRequest = function(url, data, callback){

}

module.exports = Twitterwall
