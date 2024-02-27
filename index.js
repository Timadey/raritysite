const express = require('express');
const session = require('express-session');
const { port } = require('./config.json');
const { isAuthenticated, handleDefaultError, handleMissingView } = require('./utils');

const app = express();

app.set('view engine', 'ejs');

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
	return res.sendFile('index.html', { root: '.' });
});
app.use('/auth/discord', require('./auth/discord'));

app.get('/:view', (req, res) => {
    view = req.params.view
    user_ = req.session.user
    if (user_){

      user_.avatarSrc = `https://cdn.discordapp.com/avatars/${user_.id}/${user_.avatar}.webp`
    }
	return res.render(`${view}`, { user: user_ });
});



app.listen(port, () => console.log(`App listening at http://localhost:${port}`));