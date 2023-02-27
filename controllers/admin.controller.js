const AdminService = require('../services/admin.service');
const userService = require('../services/user.service');



class AdminController {

    async renderAdminDashboard(){
        // fetching user data
        const users = await userService.findAll({})


    }

}


module.exports = new AdminController
