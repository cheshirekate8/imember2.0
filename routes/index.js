const express = require('express');
const db = require('../db/models');
const router = express.Router();

const { csrfProtection, asyncHandler } = require('./utils')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'a/A Express Skeleton Home' });
});

router.get(`/home`, csrfProtection, asyncHandler(async (req, res) => {
  const id = await req.session.auth.userId
  const tasks = await db.Task.findAll({
    where : {
      'userId' : id
    },
    include: db.List
  })
  const lists = await db.List.findAll({
    where : {
      'userId' : id,
    }
  })

  res.render('user-home', {
    title: 'Home',
    csrfToken: req.csrfToken(),
    tasks,
    lists,
  })
}))

module.exports = router;
