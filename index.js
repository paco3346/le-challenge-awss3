'use strict';

const AWS = require('aws-sdk');

module.exports.create = function (options) {
  var log = function() {
    if (options.debug) {
      var args = Array.prototype.slice.call(arguments);
      console.log.apply(console, args);
    }
  };
  const s3 = new AWS.S3({params: {Bucket: options.bucket}});
  return  {
    getOptions: function () {
      return options;
    },
    set: function (args, domain, token, secret, cb) {
      log('setting challenge for', domain, token, secret);
      s3.putObject({
          Key: `challenges/${token}`,
          Body: secret
      }, cb);
    },
    get: function (args, domain, token, cb) {
      // TODO keep in mind that, generally get args are just args.domains
      // and it is disconnected from the flow of setChallenge and removeChallenge
      cb(new Error("Get not implemented for AWS S3 challenge"));
    },
    remove: function (args, domain, token, cb) {
        log('removing challenge for', domain);
        s3.deleteObject({
            Key: `challenges/${token}`
        }, cb);
    }
  };
};
