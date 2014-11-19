'use strict'

var urljoin = require('url-join')
var request = require('request')

function Twitterwall(options){
  if(!(this instanceof Twitterwall)) return new Twitterwall(options)
  if(!options.server || !options.username || !options.password) throw new Error('no server, username or password set')
  this.config = {server: options.server, username: options.username, password: options.password}
}

Twitterwall.prototype.sendRequest = function(url, data, callback){
  if(typeof callback !== 'function') throw new Error('callback not set')
  request({
    method: 'POST',
    url: urljoin(this.config.server, url),
    json: true,
    body: data,
    auth: this.config
  }, function (error, response, body){
    if(!error && response.statusCode === 200) callback(null, body)
    else if(!error && response.statusCode === 401) callback('not authorized')
    else callback(error)
  })
}

Twitterwall.prototype.block = function(keyword, callback){
  this.sendRequest('block', {block: keyword}, callback)
}

Twitterwall.prototype.unblock = function(keyword, callback){
  this.sendRequest('block', {unblock: keyword}, callback)
}

Twitterwall.prototype.listBlock = function(callback){
  this.sendRequest('block', {}, callback)
}

Twitterwall.prototype.clearBlock = function(callback){
  this.sendRequest('block', {clear: true}, callback)
}

Twitterwall.prototype.tweet = function(user, message, callback){
  this.sendRequest('tweet', {user: user, text: message}, function(err, data){
    if(!err && data && data.success) callback(null)
    else callback(err || (data && data.error) || 'could not send tweet')
  })
}

Twitterwall.prototype.flashTimeout = function(message, duration, markdown, callback){
  if(typeof markdown === 'function' && typeof callback === 'undefined') {
    callback = markdown
    markdown = undefined
  }
  this.sendRequest('flash', {message: message, duration: duration, markdown: !!markdown}, function(err, data){
    if(!err && data && data.success) callback(null)
    else callback(err || (data && data.error) || 'could not flash message')
  })
}

Twitterwall.prototype.flash = function(message, markdown, callback){
  this.flashTimeout(message, 0, markdown, callback)
}

Twitterwall.prototype.clearFlash = function(callback){
  this.flash('', callback)
}

module.exports = Twitterwall
