const User = require("../models/User");

const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");

const jwtSecret = process.env.JWT_SECRET

// Generate user token

const generateToken = (id) =>{
    return jwt.sign({id}, jwtSecret, {
        expiresIn: "7d"
    })
}

// Register user and signIn
const register = async (req,res) => {
   const {name, email, password} = req.body

//    Check if user Exist
const user = await User.findOne({email})

if(user) {
    res.status(422).json({erros: ["Por favor, utilize outro e-mail"]})
    return
}

// Generate password hash
const salt = await bycrypt.genSalt()
const paasswordHash = await bycrypt.hash(password, salt)

// create user
const newUser = await User.create({
    name, email, password: paasswordHash
})

// If user was created success, return token

if(!newUser) {
    res.status(422).json({errors: ["Houve um erro, porfavor tente mais tarde."]})
    return
}

res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id)
})
}

// SingIN User

const login = async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    // Check if user exist
    if(!user){
        res.status(404).json({errors: ["Usuário não encontrado."]})
        return 
    }

    // check password
    if(!(await bycrypt.compare(password, user.password))) {
        res.status(422).json({errors: ["Senha inválida"]})
        return
    }

    // Return user token
    res.status(201).json({
        _id: user._id,
        profileImage: user.profileImage,
        token: generateToken(user._id)
    })
}

// Get current logged in user
const getCurrentUser = async (req, res) => {
    const user = req.user;

    res.status(200).json(user);
}

const update = async (req, res) => {
    const {name, password, bio} = req.body

    let profileImage = null

    if(req.file) {
        profileImage = req.file.filename
    }

    reqUser = req.user;

    const user = await User.findById(new mongoose.Types.ObjectId(reqUser._id)).select("-password")

    if(name) {
        user.name = name
    }

    if(password) {
        const salt = await bycrypt.genSalt()
        const paasswordHash = await bycrypt.hash(password, salt)

        user.password = paasswordHash
    }

    if(profileImage){
        user.profileImage = profileImage
    }

    if(bio) {
        user.bio = bio
    }

    await user.save();

    res.status(200).json(user)
}

const getUserById = async(req,res) => {

    const { id } = req.params

    try{
        const user = await User.findById(new mongoose.Types.ObjectId(id)).select("-password")
        if(!user){
            res.status(404).json({errors: ["Usuário não encontrado 3."]})
            return
        }
        res.status(200).json(user);
    }catch (err){
        res.status(404).json({errors: ["Usuário não encontrado."]})
        return
    }


    res.status(200).json(user)

}

module.exports = {
    register,
    login,
    getCurrentUser,
    update,
    getUserById
}