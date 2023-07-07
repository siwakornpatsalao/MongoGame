const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const New = require('../models/News.js');

//get all
router.get('/', async (req, res) => {
    try {
      const News = await New.find({});
      res.json(News);
    } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    }
  });

// get by id
router.get('/:id', async (req, res, next) => {
    try {
      const get2 = await New.findById(req.params.id);
      res.json(get2);
    } catch (err) {
      return next(err);
    }
  });
  
  // post data
  router.post('/', async (req, res, next) => {
    try {
      const post = await New.create(req.body);
      res.json(post);
    } catch (err) {
      return next(err);
    }
  });
  
  // update data
  router.put('/:id', async (req, res, next) => {
    try {
      const put = await New.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(put);
    } catch (err) {
      return next(err);
    }
  });
  
  // delete data
  router.delete('/:id', async (req, res, next) => {
    try {
      const del = await New.findByIdAndDelete(req.params.id);
      res.json(del);
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;