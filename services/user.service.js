const User = require('../models/user.model');

class UserService {

    // general Crud Operations

    // create 
    async create(userData) {
        return await User.create(userData)
    }

    // update
    async update(filter, updateData) {
        return await User.findOneAndUpdate(filter, updateData);
    }

    // read 
    async findOne(filter){
        return await User.findOne(filter).populate('referrals referredBy')
    }

    

}

module.exports = new UserService()