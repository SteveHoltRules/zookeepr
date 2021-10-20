const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

//parse incoming string or array data - Is this what is required for the middle ware?
//Middleware
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
app.use(express.json());
//static files - this has to be listed above the /api and / routes or else the html won't be picked up
app.use(express.static('public'));
//These two routes will point to two different files that are specified at the top of the file
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

