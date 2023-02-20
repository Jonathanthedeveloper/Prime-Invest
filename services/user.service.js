const User = require('../models/user.model');

class UserService {

    // general Crud Operations

    // create 
    async create(userData) {
        return await User.create(userData);
    }

    // update
    async update(filter, updateData) {
        return await User.findOneAndUpdate(filter, updateData);
    }

    // read 
    async find(filter){
        return await User.findOne(filter);
    }

    

}

module.exports = new UserService()