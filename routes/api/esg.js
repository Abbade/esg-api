const router = require('express').Router()
const esg = require('../../repository/esg')
const passport = require('../../config/passport')
const {MISSING_DATA} = require('../../config/responses')



router.get('/', async function (req, res){
  try {
    let response = await esg.getEsgType();
    return res.status(200).json(response) ;
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }


})

router.get('/subjects', async function (req, res){
  try {
    let response = await esg.getEsgSubjects(req.query.esg);
    return res.status(200).json(response) ;
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }


})

router.post('/feedback', async function (req, res){
  try {
    let response = await esg.create(req.body);
    return  res.status(200).json(response) ;
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }


})

router.get('/feedback', async function (req, res){
  try {
    let response = await esg.getFeedback();
    return  res.status(200).json(response) ;
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }


})



module.exports = router;