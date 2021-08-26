var express = require('express')
const { check, validationResult } = require('express-validator')
var router = express.Router()
const { csrfProtection, asyncHandler } = require('./utils')
const db = require('../db/models')
const { requireAuth } = require('../auth')

const taskValidators = [
  check("content")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a task.")
    .isLength({ max: 255 })
    .withMessage("Must not exceed 255 characters"),
  // check("list_Id")
  //   .exists({ checkFalsy: true })
  //   .withMessage("Please provide associate a list with a task. If you don't have any, go make one!")
] //! ADD MORE VALIDATORS

router.get('/new', requireAuth, csrfProtection, asyncHandler(async (req, res, next) => {
  const newTask = db.Task.build()
  const id = req.session.auth.userId
  const lists = await db.List.findAll({
    where : {
      'user_Id' : id
    }
  })
  res.render('task-new', {
    title: 'Tasks',
    newTask,
    lists,
    csrfToken: req.csrfToken()
  })
}))


router.post('/new', requireAuth,csrfProtection, taskValidators, asyncHandler(async (req, res, next) => {
  if (req.session.auth) {
    const { userId } = req.session.auth

    const lists = await db.List.findAll({
      where : {
        'user_Id' : userId
      }
    })

    const {
      content,
      dueDate,
      priority,
      complete,
      listId
    } = req.body

    console.log(content)
    console.log(dueDate)
    console.log(priority)
    console.log(listId)

    let workaround = false

    const newTask = db.Task.build({
      content,
      list_Id: listId,
      user_Id: userId,
      dueDate,
      priority,
      complete: complete === "off",
      // complete: false
    })

    const validatorErrors = validationResult(req)

    if (validatorErrors.isEmpty()) {
      await newTask.save();
      res.redirect(`/home`)
    } else {
      const errors = validatorErrors.array().map((error) => error.msg)
      res.render('task-new', {
        title: 'Tasks',
        newTask,
        lists,
        errors,
        csrfToken: req.csrfToken()
      })
    }
  }
}))





// edit list
router.put('/:id(\\d+)', taskValidators, asyncHandler(async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const task = await db.Task.findByPk(id);
  if (task) {
    const { content } = req.body; //listid?
    await task.update({ content,  });
    res.json({ task })
  } else {
    next(taskValidators(id));
  }

}))


// delete task
router.delete('/delete/:id(\\d+)', asyncHandler(async (req, res, next) => {
  console.log('~~~~~~~~~~IS ANYONE THERE???')
  const id = parseInt(req.params.id, 10);
  const task = await db.Task.findByPk(id);
  if (task) {
    await task.destroy();
    res.status(204).end();
    // console.log('attempt?')
    res.redirect('/home')
  } else {
    next(taskValidators(id));
    console.log(req.params)
  }
}))



module.exports = router;
