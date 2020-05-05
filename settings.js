require('dotenv').config({ silent: true});

module.exports = {
   port: process.env.PORT || 3000,
   env: process.env.ENV || 'development',

   // Environment-dependent settings
   development: {
      db: {
         dialect: 'sqlite',
	      storage: ':memory:',
	      operatorsAliases: '0'
      }
   },
   production: {
      db: {
         dialect: 'sqlite',
	      storage: 'db/database.sqlite',
	      operatorsAliases: '0'
      }
   }
};
