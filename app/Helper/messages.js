module.exports = [
  {
    _id: Math.round(Math.random() * 1000000),
    text: `Hey! Yeah It's fun I love the Directions.`,
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    user: {
      _id: 1,
      name: 'Jane',
      avatar: 'https://avatarfiles.alphacoders.com/843/84323.png'
    },
    // location: {
    //   latitude: 48.864601,
    //   longitude: 2.398704
    // },
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: 'Me too! It was Great',
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    user: {
      _id: 2,
      name: 'John',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIbtYShJYGSHeYUfLK7CWNkBEInSJULkcwUCoEgG25Tmnqo6oh',
    },
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: 'Yeah thats cool!',
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    user: {
      _id: 3,
      name: 'Shane',
      avatar: 'https://avatarfiles.alphacoders.com/826/82656.png',
    },
  },
];
