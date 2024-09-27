const Users = require('../model/users')

const userlist = async (req, res, next) => {
    try {

        const users = await Users.findAll({
            attributes: { exclude: ['password'] }
        });
        if (users.length === 0) {
            return res.status(200).json({
                message: 'No users found',
                data: []
            })
        }
        return res.status(200).json({
            message: 'No users found',
            data:users
        })

    } catch (__) {
        return res.status(500).json({
            message: `failed to fetch list`
        });
    }
 }

const userdetail = async (req, res, next) => { }



module.exports = {userdetail, userlist}