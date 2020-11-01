'use strict';
const stripe = require("stripe")("sk_test_51HdmOhAv04GTIr8UN8Mdh0sFz4b5VCdB54lNblk9mcOko1fwev7NwqZuuTqoIwjoyqEOB40zrSBYDYUr0vDJRvyz008TckG6I0");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  create: async (ctx) => {
    const { token } = JSON.parse(
      ctx.request.body
    );
    const amount = 15;
    const stripeAmount = Math.floor(amount * 100);

    // charge on stripe
    const charge = await stripe.charges.create({
      // Transform cents to dollars.
      amount: stripeAmount,
      currency: "usd",
      description: `Membership created on ${new Date()} by ${ctx.state.user._id}`,
      source: token,
    });

    let membership;

    try {
      // Register the order in the database
      membership = await strapi.services.membership.create({
        user: ctx.state.user.id,
        charge_id: charge.id,
        amount: amount,
        number: 'placeholder'
      });

    } catch(e) {
      console.log(e);
    }
    
    return membership;
  }, 
};
