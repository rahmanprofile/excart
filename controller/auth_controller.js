require('dotenv').config();
const users = require('../model/users')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const register = async (req, res, next) => { 
    const { name, email, phone, password } = req.body;
    const fields = { name, email, phone, password };
    const emptyFields = Object.entries(fields).filter(([key, value]) => !value).map(([key]) => key);
    if (emptyFields.length > 0) {
        return res.status(400).json({ message: `Please enter a value for: ${emptyFields.join(', ')}` });
    }
    try {
        const validate = await users.findOne({ where: { email: email } });
        if (validate) {
            return res.status(400).json({
                success: false,
                message: `Users already exist.`
            });            
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await users.create({ name: name, email: email, phone: phone, password: hashPassword, gender: "", imageUrl: '' });
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({
            success: true,
            message: 'account created successfully.',
            token: token,
            user: user
        });
    } catch (__) {
        return res.status(500).json({
            message: `failed to register due to ${__.message}`
        });
    }
}

const login = async (req, res, next) => { 
    const { email, password } = req.body;
    const fields = { email, password };
    const emptyFields = Object.entries(fields).filter(([key, value]) => !value).map(([key]) => key);
    if (emptyFields.length > 0) {
        return res.status(400).json({ message: `Please enter a value for: ${emptyFields.join(', ')}` });
    }
    try {
        const user = await users.findOne({ where: { email: email } });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User does not exist',
            });
        }
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(400).json({
                success: false,
                message: 'Invalid password'
            });
        }
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({
            success: true,
            message: 'user login successfully',
            token: token,
        });
        
    } catch (__) {
        return res.status(500).json({ 
            message: `failed to login due to ${__.message}`
        });
    }
}

const sendCodeEmail = async (req, res, next) => { }

const verifyCode = async (req, res, next) => { }

const generatePassword = async (req, res, next) => { }

const forgotPassword = async (req, res, next) => { }


module.exports = {register, login, sendCodeEmail, verifyCode, generatePassword, forgotPassword};