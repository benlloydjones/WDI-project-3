const rp = require('request-promise');
// const jwt = require('jsonwebtoken');
// const User = require('../models/user');
// const { secret } =require('./environment');

function meetup(req, res) {
  rp({
    method: 'POST',
    url: 'https://secure.meetup.com/oauth2/access',
    qs: {
      client_id: process.env.MEETUP_OAUTH_KEY,
      client_secret: process.env.MEETUP_OAUTH_SECRET,
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost:7000',
      code: req.body.code
    }
  })
    // .then(token => {
    //   const thisToken = JSON.parse(token);
    //   console.log(thisToken.access_token);
    // });
    .then((response) => {
      const token = JSON.parse(response);
      return rp({
        method: 'GET',
        url: 'https://api.meetup.com/2/member/self/',
        qs: {
          access_token: token.access_token
        },
        json: true
      });
    })
    .then((profile) => {
      console.log(profile);
    });
}

module.exports = {
  meetup
};
