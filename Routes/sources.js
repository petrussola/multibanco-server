// dependencies
const express = require('express');
const Stripe = require('stripe');
require('dotenv').config();

// initialise dependencies
const router = express.Router();
const stripe = Stripe(process.env.STRIPE_KEY);

// create source multibanco
router.get('/multibanco/create-source', async (req, res) => {
	try {
		const data = await stripe.sources.create({
			type: 'multibanco',
			amount: 1099,
			currency: 'eur',
			owner: {
				name: 'Pere Sola',
				email: 'pere.solaclaver@gmail.com',
			},
			redirect: {
				return_url: 'https://shop.example.com/crtA6B28E1',
			},
		});
		res.status(200).json({ source_id: data.id });
	} catch (error) {
		console.log(error);
	}
});

// charge source multibanco. Expects source id recived in previous route to be passed as query string
router.get('/multibanco/charge-source', async (req, res) => {
	try {
		const { id } = req.query;
		const charge = await stripe.charges.create({
			amount: 1099,
			currency: 'eur',
			source: id,
		});
		res.status(200).json({ charge });
	} catch (error) {
		const errorData = error.raw;
		res.status(400).json({
			error: {
				code: errorData.code,
				doc_url: errorData['doc_url'],
				message: errorData.message,
				type: errorData.type,
			},
		});
	}
});

module.exports = router;
