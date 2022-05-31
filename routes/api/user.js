const router = require('express').Router()
const user = require('../../repository/user')
const passport = require('../../config/passport')
const {MISSING_DATA} = require('../../config/responses')

router.get('/minhasessao', passport.authenticate(), async function(req, res, next){
  try {
    var response = await user.recuperar(req.user.id, res);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error)
  }

});

router.post('/', async function (req, res){
  try {
    let response = await user.cadastrar(req.body);
    return response.success ? res.status(200).json(response) : res.status(400).json(response) ;
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }


})

router.post('/login', async function(req, res, next){
  try {

    if (!req.body.email || !req.body.passwordSystem) {
      return res.status(400).send(MISSING_DATA)
    }
    var response = await user.login(req.body.email, req.body.passwordSystem);
    return response.success ? res.status(200).json(response) : res.status(400).json(response);;
  } 
  catch (error) { 
    console.log(error) 
    return res.status(500).json(error)
  }
  
  
});

module.exports = router;