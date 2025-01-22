const { Admin } = require("../Model")

const Create_Admin = (data) => {
    return Admin.create(data)
}

const Get_Admin = async () => {
    const admins = await Admin.find();
    const updatedAdmins = admins.map(admin => {
        const { _id, ...rest } = admin.toObject();
        return {
            admin_id: _id,
            ...rest
        };
    });

    return updatedAdmins;
}

module.exports = {
    Create_Admin,
    Get_Admin
}