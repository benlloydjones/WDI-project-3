const User = require('../models/user');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
mongoose.connect(dbURI, { useMongoClient: true });

User.collection.drop();

User
  .create([
    {
      meetUpId: 100001,
      friends: [],
      accessToken: 100001,
      name: 'Chloe Costas',
      picture: 'http://www.eversheds-sutherland.com/images/Websites/Banners/People/c/Costas-Chloe.jpg'
    },
    {
      meetUpId: 100002,
      friends: [],
      accessToken: 100002,
      name: 'Abhinav Bajpai',
      picture: 'https://www.marmelodigital.com/img/abhinav-img.png'
    },
    {
      meetUpId: 100003,
      friends: [],
      accessToken: 100003,
      name: 'Luke Alexander',
      picture: 'https://www.marmelodigital.com/img/luke-img.png'
    },
    {
      meetUpId: 237613045,
      friends: [],
      name: 'Ben Lloyd Jones',
      picture: 'https://secure.meetupstatic.com/photos/member/2/9/b/1/member_271090673.jpeg'
    }
  ])
  .then(entries => {
    console.log(`${entries.length} users created`);
    User
      .create([
        {
          meetUpId: 237613045,
          friends: [entries[0], entries[1], entries[2]],
          accessToken: 'cc006740cd25ef3561abc4d07143fb26',
          name: 'Ben Lloyd Jones',
          picture: 'https://secure.meetupstatic.com/photos/member/2/9/b/1/member_271090673.jpeg'
        }
      ])
      .then(entries => console.log(`${entries.length} additional user created`))
      .catch(err => console.log(err))
      .finally(() => mongoose.connection.close());
  });
