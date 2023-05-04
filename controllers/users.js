const User = require('../models/user');

const getUsers = (req, res)=>{
  User.find({})
  .then((users)=>res.send(users))
  .catch((err)=>{
    res.status(500).send({
      "message": "Произошла ошибка"
    })
  })
}

const getUserById = (req, res)=> {
  User.findById(req.params.userId)
  .then((user) =>res.send(user))
  .catch((err) =>{
    if(err.name==='CastError') {
      return res.status(404).send({
        "message": `Пользователь с ID ${req.params.userId} не найден`
      })
    }
    res.status(500).send({
      "message": "Произошла ошибка"
    })
  })
}

const createUser = (req, res)=> {
  const { name,about,avatar } = req.body;
  User.create({ name,about,avatar })
  .then((user)=>res.send(user))
  .catch((err)=>{
    if(err.name==='ValidationError') {
      return res.status(400).send({
        "message": "Переданы некорректные данные при создании пользователя"
      })
    }
    res.status(500).send({
      "message": "Произошла ошибка"
    })
  })
}

const updateUser = (req,res)=> {
  User.findByIdAndUpdate(req.user._id, req.body)
  .then((user)=>res.send(user))
  .catch((err)=>{
    if(err.name==='CastError') {
      return res.status(404).send({
        "message": `Пользователь с ID ${req.user._id} не найден`
      })
    }
    if(err.name==='ValidationError') {
      return res.status(400).send({
        "message": "Переданы некорректные данные при обновлении данных пользователя"
      })
    }
    res.status(500).send({
      "message": "Произошла ошибка"
    })
  })
}

const updateAvatar = (req, res)=> {
  User.findByIdAndUpdate( req.user._id,{ avatar:req.body.avatar })
  .then((user)=>res.send(user))
  .catch((err)=>{
    if(err.name==='CastError') {
      return res.status(404).send({
        "message": `Пользователь с ID ${req.user._id} не найден`
      })
    }
    if(err.name==='ValidationError') {
      return res.status(400).send({
        "message": "Переданы некорректные данные при обновлении данных пользователя"
      })
    }
    res.status(500).send({
      "message": "Произошла ошибка"
    })
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar
}