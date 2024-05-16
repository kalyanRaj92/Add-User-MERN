const bcrypt = require('bcrypt');
const User = require('../models/userModel');

// Route for Create a new user
const createUser = async(req, res)=>{
    try {
        const {email, password } = req.body;

        // Check if email already exists
        const existingUser = await User.findOne({email});

        if (existingUser) {
            return res.status(400).json({message: "Email already exists"});
        }

        // Generate salt
        const salt = await bcrypt.genSalt(10);

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, salt);

        // Replace the plain password with the hashed password
        req.body.password = hashedPassword;

        const userData = await new User(req.body);
    
        const savedData = await userData.save();

        const responseObject = {
            savedData: savedData,
            message: "User created successfully..",
          };
        res.status(200).json(responseObject);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// Route for Get all users
const getAllUsers = async(req, res)=>{
    try {
        const userData = await User.find();
        if(!userData){
            return res.status(404).json({message: "User data not found"})
        }
        res.status(200).json(userData);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// Route for Get a single user
const getOneUser = async(req, res)=>{
    try {
        const {id} = req.params;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({message: "User not found"})
        }
        res.status(200).json(userExist);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// Route for Update a user
const updateUser = async(req, res)=>{
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(401).json({message: "User not found"})
        }
        const updatedData = await User.findByIdAndUpdate(id, req.body, {new:true});
        const responseObject = {
            updatedData:updatedData,
            message: "User updated successfully.",
          };
        res.status(200).json(responseObject);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// Route for Delete a user
const deleteUser = async(req, res)=>{
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({message: "User not found"})
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({message: "User deleted successfully"});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = { createUser, getAllUsers, getOneUser, updateUser, deleteUser };