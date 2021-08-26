const express = require('express')
const { check, validationResult } = require('express-validator')

const db = require('../db/models')

const { csrfProtection, asyncHandler } = require('./utils')

const { requireAuth } = require('../auth')

const router = express.Router()

const listValidators = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a name for your List")
    .isLength({ max: 255 })
    .withMessage("Name must not exceed 255 characters")
    .custom((value) => {
      return db.List.findOne({ where: { name: value } })
        .then((list) => {
          if (list) {
            return Promise.reject('A List already exists with this name')
          }
        })
    })
]

//NEW LIST'S GET AND POST
router.get('/new', requireAuth, csrfProtection, asyncHandler(async (req, res, next) => {
  const newList = db.List.build()
  res.render('list-new', {
    title: 'Create List',
    newList,
    csrfToken: req.csrfToken()
  })
}))

router.post('/new', requireAuth, csrfProtection, listValidators, asyncHandler(async (req, res, next) => {
  if (req.session.auth) {

    const { userId } = req.session.auth

    const {
      name
    } = req.body

    const newList = db.List.build({
      name,
      userId: userId
    })

    const validatorErrors = validationResult(req)

    if (validatorErrors.isEmpty()) {
      await newList.save()

      res.redirect(`/home`)
    }
    else {
      const errors = validatorErrors.array().map((error) => error.msg)
      res.render('list-new', {
        title: 'Create List',
        newList,
        errors,
        csrfToken: req.csrfToken()
      })
    }
  }
}))

//GET ALL OF A LISTS TASKS
router.get('/:id', requireAuth, csrfProtection, asyncHandler(async (req, res, next) => {

  const id = req.params.id

  const ListsTasks = await db.Task.findAll({
    where: {
      listId: id
    }
  })

  const list = await db.List.findByPk(id)

  // console.log(ListsTasks)
  //
  // console.log(id)
  res.render('list', {
    title: 'Render List',
    ListsTasks,
    list,
    csrfToken: req.csrfToken()
  })
}))

// GET AND POST EDIT LIST
router.get('/:id/edit', requireAuth, csrfProtection, asyncHandler(async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const list = await db.List.findByPk(id);
  console.log(list)
  res.render('list-edit', {
    title: 'Edit List',
    list,
    csrfToken: req.csrfToken()
  })
}))

router.post('/:id(\\d+)/edit', requireAuth, csrfProtection, listValidators, asyncHandler(async (req, res, next) => {

  const id = parseInt(req.params.id, 10);

  const list = await db.List.findByPk(id);

  if (list) {

    const { name } = req.body;

    const validatorErrors = validationResult(req)

    if (validatorErrors.isEmpty()) {
      await list.update({ name });
      res.redirect(`/lists/${list.id}`)
    } else {
      const errors = validatorErrors.array().map((error) => error.msg)
      res.render('list-edit', {
        title: 'Edit List',
        list,
        errors,
        csrfToken: req.csrfToken()
      })
    }

  }

}))


// GET AND POST DELETE LIST
router.get('/:id(\\d+)/delete', requireAuth, csrfProtection, asyncHandler(async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const list = await db.List.findByPk(id);
  res.render('list-delete', {
    title: 'Delete List',
    list,
    csrfToken: req.csrfToken()
  })
}))

router.post('/:id(\\d+)/delete', asyncHandler(async (req, res, next) => {
  const id = parseInt(req.params.id);
  const list = await db.List.findByPk(id);
  await list.destroy();
  res.redirect(`/home`)
}))

module.exports = router;
