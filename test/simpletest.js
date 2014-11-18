'use strict'

var twitterwall = require('../')({username: 'admin', password: '123456', server: 'http://localhost:5000'})

function testBlocking(){
  twitterwall.block('Test', function(err, data){
    if(err) return console.log(err)
    console.log(data)
    twitterwall.block('test2', function(err, data){
      if(err) return console.log(err)
      console.log(data)
      twitterwall.clearBlock('test', function(err, data){
        if(err) return console.log(err)
        console.log(data)
      })
    })
  })
}

function tweeting(){
  twitterwall.tweet('christophwitzko', '#lol', function(err){
    if(err) return console.log(err)
    console.log('ok')
  })
}

function flashing(){
  twitterwall.flashTimeout({}, 500, function(err){
    if(err) return console.log(err)
    console.log('ok')
  })
}

testBlocking()
