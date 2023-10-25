var express = require('express');
var router = express.Router();
var authenticate = require('../model/authen');
var displayStore = require('../model/display_table');
var showReport = require('../model/show_report');
var crud = require('../model/db_crud');
const session = require('express-session');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users');
});
//logout
router.get('/logout', function(req, res, next){
  req.session.destroy();
  res.redirect('/users/login');
});
//login
router.get('/login', function(req, res, next){
  res.render('login');
});
router.post('/login', async function(req, res, next){
  let user_name = req.body.username;
  let pass_word = req.body.password;
  req.session.user_name = user_name;
  auth_result = await authenticate(user_name, pass_word);
if (auth_result.auth){
  req.session.store = auth_result.store;
  if(auth_result.role == 1)
  {
    res.redirect('/users/profile');
  }
  else{
    res.redirect('/users/director');
  }
}
else{
  res.redirect('/users/login');
}
});
//profile
router.get("/profile", async function(req, res){
  let check_login = req.session.user_name;
  let display_store = req.session.store;
  if(check_login){
    let data = await displayStore(display_store);
    res.render('profile', {data: data, shop: req.session.store});
  }
  else{
    res.redirect('/users/login');
  }
});
//director
router.get("/director", async function(req, res){
  let check_login = req.session.user_name;
  if(check_login){
    let id = 0;
    let data = await showReport();
    res.render('director', {data: data});
  }
  else{
    res.redirect('/users/login');
  }
})
router.post("/director", async function(req, res){
  let id = req.body.store_code;
  let data = await showEachShop(id);
  res.render('director', {data: data});
})
/* POST CRUD */
router.post('/crud', async function(req, res, next) {
  let body = req.body;
  await crud(body, req.session.store);
  res.redirect('/users/profile');
});

module.exports = router;
