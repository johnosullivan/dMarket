var up = require('uport-connect');

const uport = new up.Connect('dMarket', {
      clientId: '2ouAjchR4wKPxxiLqE6AEhYPRF1sADw2uE5',
      network: 'rinkeby',
      signer: up.SimpleSigner('4704ff3ba69c877aed124c15866d47177e1613efd1061c9bfb938384c9e810e4')
});


uport.requestCredentials({
  requested: ['name', 'avatar', 'phone', 'country'],
  notifcations: true },
  (uri) => {

    console.log(uri);


  }).then((userProfile) => {

    console.log(userProfile);
    // Do something after they have disclosed credentials
})
