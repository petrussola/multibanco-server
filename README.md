# My server for Stripe tests

This servers contains 2 endpoints, one to create a Multibanco payment method source and another one to charge it. As explained in Stripe's docs, in test mode the source becomes chargeable within 3 seconds [0]:

  1. `GET` endpoint to create source > `/sources/multibanco/create-source`. It returns the `source` id.
  2. `GET` endpoint to charge source > `/sources/multibanco/charge-source`. It expect the `source id` from the previous endpoint as query param: `?id={{SOURCE_ID}}`. It returns the `charge` object or details about the `error`.

[0] https://stripe.com/docs/sources/multibanco#testing-the-redirect-and-payment

### USAGE ###

1. Type `npm i` to install dependencies
2. Create `.env` file and add Stripe test API key in `.env` file as follows:

  - `STRIPE_KEY={{YOUR API KEY HERE}}`
 
3. Server listens in port 5000
