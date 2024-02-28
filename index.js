require('dotenv').config()
const express = require('express');
const session = require('express-session');
const { port } = require('./config.json');
const { isAuthenticated, handleDefaultError, handleMissingView } = require('./utils');
const CLIENT_ID = process.env.CLIENT_ID;
const HOST = process.env.HOST;
const redirect = encodeURIComponent(`${HOST}/auth/discord/callback`);



const app = express();

app.set('view engine', 'ejs');
app.use(express.static('static'))
app.use(session({
  secret: 'raritysite-secret-key', // Replace with your secret key
  resave: false,
  saveUninitialized: false
}));

// Errors
app.use(handleMissingView);
app.use(handleDefaultError);


// Routes
app.get('/', (req, res) => {
  user_ = req.session.user
    if (user_){

      user_.avatarSrc = `https://cdn.discordapp.com/avatars/${user_.id}/${user_.avatar}.webp`
    }
	return res.render('index', { user: user_ });
});

app.get('/login', (req, res) => {
	
	const currentPage = req.query.next
	console.log('next url', currentPage)
	if (currentPage) {
		req.session.nextUrl = currentPage 
	}else{
    req.session.nextUrl = '/' 
  }
	res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify&response_type=code&redirect_uri=${redirect}`);
});

app.use('/auth/discord', require('./auth/discord'));

app.get('/:view', (req, res) => {
  if (!req.session.user) {
    res.redirect('/login');
  }
    view = req.params.view
    user_ = req.session.user
    if (user_){

      user_.avatarSrc = `https://cdn.discordapp.com/avatars/${user_.id}/${user_.avatar}.webp`
    }
	return res.render(`${view}`, { user: user_ });
});



app.listen(port, () => console.log(`App listening at http://localhost:${port}`));