const express  =require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');      //partial is used for saving repetative template code
app.set('view engine','hbs');

// app.use(express.static(__dirname + '/maintain'));
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);

  fs.appendFile('server.log',log + '\n',(err) =>{
    if (err) {
      console.log('Unable to append to the server.log!');
    }
  });
  next();
});

// app.use((req, res,next) => {
//   res.render('maintainence.hbs');
//
// });

app.use(express.static(__dirname + '/public'));   //lets you use the middleware function, third party
hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});




app.get('/',(req,res) => {
  // res.send('<h1>Hey there beautiful!!</h1>');
  res.send({
    name: 'Radha',
    hobbies: ['reading','writing','coding']          //if you send json type data, express understands that
  });


});       //this is the handler of get http request, first param is the url/location
// the second parameter returns the response to be sent to the user

app.get('/about',(req,res) => {
      res.render('about.hbs');
});

app.get('/home',(req,res) => {
    res.render('home.hbs',{
      PageTitle: 'Home Page',
      welcomemsg: 'Welcome Welcome Welcome!',
      body: 'I am running out of things to type here people!',
      heads: 'This is just the head of shitty ideas'
    });
});

app.get('/bad',(req,res) => {

  res.send({
    error: 'This is a bad http request',
    body: 'Kidding! I just typed it in the body!'
  });

});


app.listen(port,() => {
  console.log(`server is up on port ${port}`);
});      //bind the application to this port on this machine
