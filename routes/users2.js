const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const user = require('../models/User.js');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

//get all
router.get('/', async (req, res) => {
    try {
      const users = await user.find({});
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    }
  });

// get by id
router.get('/:id', async (req, res, next) => {
    try {
      const get2 = await user.findById(req.params.id);
      res.json(get2);
    } catch (err) {
      return next(err);
    }
  });

/* router.get('/:username', async (req, res, next) => {
    try {
      const get2 = await user.findByUsername(req.params.username);
      res.json(get2);
    } catch (err) {
      return next(err);
    }
}); */

  router.post('/',[
    body('username').not().isEmpty().withMessage('กรุณาใส่ชื่อผู้ใช้'),
    body('gmail').not().isEmpty().withMessage('กรุณาใส่ Gmail'),
    body('password').not().isEmpty().withMessage('กรุณาใส่รหัสผ่าน'),
    body('name').not().isEmpty().withMessage('กรุณาใส่ชื่อจริง'),
    body('surname').not().isEmpty().withMessage('กรุณาใส่นามสกุล'),
    body('city').not().isEmpty().withMessage('กรุณาใส่ที่อยู่'),
    body('ageCal').not().isEmpty().withMessage('กรุณาใส่อายุ'),
  ],async(req,res,next)=>{
    try{
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
      }
      const post = await user.create(req.body);
      res.json(post);
    }catch(err){
      return next(err)
    }
  })

  router.post('/login',[
    body('username').not().isEmpty().withMessage('กรุณาใส่ชื่อผู้ใช้'),
    body('password').not().isEmpty().withMessage('กรุณาใส่รหัสผ่าน')
  ], async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username,password } = req.body;
  
      const userData = await user.findOne({ username });
      if (!userData) {
        const error = new Error('ไม่พบชื่อผู้ใช้งาน');
        return res.status(401).json({ errors: [{ msg: error.message }] });
      }

      const passwordCheck = await userData.checkPassword(password);
      if(!passwordCheck){
        const error = new Error('รหัสผ่านไม่ถูกต้อง')
        return res.status(402).json({ errors: [{ msg: error.message }] });
      }

      return res.json({ success: true, username: userData.username });
    } catch (err) {
      return next(err);
    }
  });
  
  // update data
  router.put('/:id', async (req, res, next) => {
    try {
      const put = await user.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(put);
    } catch (err) {
      return next(err);
    }
  });
  
  // delete data
  router.delete('/:id', async (req, res, next) => {
    try {
      const del = await user.findByIdAndDelete(req.params.id);
      res.json(del);
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;