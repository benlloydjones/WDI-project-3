const rp = require('request-promise');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { secret } =require('../config/environment');

function meetup(req, res, next) {
  let accessToken = null;
  rp({
    method: 'POST',
    url: 'https://secure.meetup.com/oauth2/access',
    qs: {
      client_id: process.env.MEETUP_OAUTH_KEY,
      client_secret: process.env.MEETUP_OAUTH_SECRET,
      grant_type: 'authorization_code',
      redirect_uri: req.body.redirectUri,
      code: req.body.code
    },
    json: true
  })
    .then((response) => {
      accessToken = response.access_token;
      return rp({
        method: 'GET',
        url: 'https://api.meetup.com/2/member/self/',
        qs: {
          access_token: accessToken
        },
        json: true
      });
    })
    .then((profile) => {
      return User.findOne({ meetUpId: profile.id })
        .then((user) => {
          if(!user) {
            user = new User({
              meetUpId: profile.id,
              accessToken: accessToken,
              name: profile.name
            });
          }
          user.accessToken = accessToken;
          user.name = profile.name;
          if(profile.photo && profile.photo.photo_link) user.picture = profile.photo.photo_link;
          return user.save();
        });
    })
    .then((user) => {
      const payload = { userId: user.id, access_token: user.access_token };
      const token = jwt.sign(payload, secret, { expiresIn: '1hr'});
      res.json({ token, message: `Welcome ${user.name}`});
    })
    .catch(next);
}

module.exports = {
  meetup
};
