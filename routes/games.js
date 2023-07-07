const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Game = require('../models/Game.js');
const { body, validationResult } = require('express-validator');

//get all
router.get('/', async (req, res) => {
    try {
      const Games = await Game.find({});

      const genres = Games.map((game) => game.genre);
      const platforms = Games.map((game) => game.platform);
      res.json({Games,genres,platforms});
    } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    }
  });

// get by id
router.get('/:id', async (req, res, next) => {
    try {
      const get2 = await Game.findById(req.params.id);
      res.json(get2);
    } catch (err) {
      return next(err);
    }
  });
  
  // post data
  /* router.post('/', async (req, res, next) => {
    try {
      const post = await Game.create(req.body);
      res.json(post);
    } catch (err) {
      return next(err);
    }
  }); */

  router.post('/', [
    body('title').not().isEmpty().withMessage('กรุณาใส่ชื่อ Title'),
    body('thumbnail').not().isEmpty().withMessage('กรุณาใส่รูปภาพ'),
    body('release_date').not().isEmpty().withMessage('กรุณาใส่วันวางจำหน่าย'),
    body('genre').not().isEmpty().withMessage('กรุณาใส่ประเภท'),
    body('platform').not().isEmpty().withMessage('กรุณาใส่แพลทฟอร์ม'),
    body('publisher').not().isEmpty().withMessage('กรุณาใส่ผู้จัดจำหน่าย'),
    body('developer').not().isEmpty().withMessage('กรุณาใส่ผู้พัฒนา'),
    body('game_url').not().isEmpty().withMessage('กรุณาใส่ Website ของเกม'),
    body('short_description').not().isEmpty().withMessage('กรุณาใส่คำอธิบายย่อ'),
  ], async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const post = await Game.create(req.body);
      res.json(post);
    } catch (err) {
      return next(err);
    }
  });
  
  // update data
  router.put('/:id', async (req, res, next) => {
    try {
      const put = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(put);
    } catch (err) {
      return next(err);
    }
  });
  
  // delete data
  router.delete('/:id', async (req, res, next) => {
    try {
      const del = await Game.findByIdAndDelete(req.params.id);
      res.json(del);
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;