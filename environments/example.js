'use strict';

module.exports = {
  port: 3000,
  hostname: '127.0.0.1',
  baseUrl: 'http://localhost:8080',
  mongodb: {
    uri: 'mongodb://chandan:123@ds257077.mlab.com:57077/authdb'
  },
  app: {
    name: 'Express API server'
  },
  serveStatic: true,
  session: {
    type: 'mongo',                          // store type, default `memory`
    secret: 'ilovechandan', // session secret
    resave: true,
    saveUninitialized: true               // saved new sessions
  },
  proxy: {
    trust: true
  },
  swig: {
    cache: false
  },
};