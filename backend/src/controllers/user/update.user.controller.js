const ErrorUserInput = require("../../utils/helper/erorr.helper");
const {
  usersOkResponse,
  usersErrorResponse,
} = require("../../utils/helper/response.helper");
const UserModel = require("../../model/user.models.js");
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const body = req.body;

    const userModel = new UserModel();
    const updatedUser = await userModel.update(userId, body);

    if (!updatedUser) {
      throw new ErrorUserInput("User not found");
    }

    return res
      .status(200)
      .send(usersOkResponse("User updated successfully", updatedUser));
  } catch (e) {
    return res.status(e.code || 500).json(usersErrorResponse(e.message));
  }
};
module.exports = updateUser;
