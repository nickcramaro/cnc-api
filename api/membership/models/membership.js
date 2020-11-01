'use strict';
const luhn = require('luhn-generator');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async beforeCreate(data) {
      let membership;
      let result;

      while (result !== null) {
        membership = luhn.random(12);

        result = await strapi
          .query('membership')
          .model.query(qb => {
            qb.where('number', membership);
          })
          .fetch();
      }

      data.number = membership;
    },
  },
};


