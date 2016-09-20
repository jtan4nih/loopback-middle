var app = module.exports = {

    // getWebHost: function() {
    //     return 'localhost'; //TODO just for test
    //     // return '50.28.56.122'; //TODO just for test
    //     // return process.env.webhost || 'web.stem.dev'; //c.f. mapping see bit.do/6tNS?s=stemdd
    // },
    getUserMgmtHost: function() {
        // return process.env.usershost || 'https://users.stem.dev' //c.f. mapping see bit.do/6tNS?s=stemdd
        // return process.env.usershost || 'http://df-stem2.enterprise.dreamfactory.com'; //TODO just for test
        return process.env.usershost || 'http://ec2-54-193-69-129.us-west-1.compute.amazonaws.com';
        // return process.env.usershost || 'users.stem.dev';  //e.g. https://df-[your app id].enterprise.dreamfactory.com or local hosted df server
    }
  
};
