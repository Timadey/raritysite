require('dotenv').config()
const express = require('express');
// const fetch = require('node-fetch');
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { request } = require('undici');
const btoa = require('btoa');
const { catchAsync } = require('../utils');
const router = express.Router();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const { PORT } = require('../config.json');


const redirect = encodeURIComponent('http://localhost:53134/auth/discord/callback');

router.get('/login', (req, res) => {
  res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify&response_type=code&redirect_uri=${redirect}`);
});

// router.get('/callback', catchAsync(async (req, res) => {
//     if (!req.query.code) throw new Error('NoCodeProvided');
//     const code = req.query.code;
//     console.log(req.query)

//     const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
//     console.log(creds)
//     const response = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`,
//       {
//         method: 'POST',
//         headers: {
//           Authorization: `Basic ${creds}`,
//         },
//       });
//     const json = await response.json();
//     console.log(json);
//     res.redirect(`/?token=${json.access_token}`);
//   }))

router.get('/callback', catchAsync(async (req, res) => {
    if (!req.query.code) throw new Error('NoCodeProvided');
	const code = req.query.code;
	console.log(code);


	if (code) {
		try {
			const tokenResponseData = await request('https://discord.com/api/oauth2/token', {
				method: 'POST',
				body: new URLSearchParams({
					client_id: CLIENT_ID,
					client_secret: CLIENT_SECRET,
					code,
					grant_type: 'authorization_code',
					redirect_uri: `http://localhost:53134/auth/discord/callback`,
					scope: 'identify',
				}).toString(),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			});

			const oauthData = await tokenResponseData.body.json();
			console.log(oauthData);
            const userResult = await request('https://discord.com/api/users/@me', {
                headers: {
                    authorization: `${oauthData.token_type} ${oauthData.access_token}`,
                },
            });
			console.log(await userResult.body.json());
            
		} catch (error) {
			// NOTE: An unauthorized token will not throw an error
			// tokenResponseData.statusCode will be 401
			console.error(error);
		}
	}

	res.redirect('/');
}));
module.exports = router;