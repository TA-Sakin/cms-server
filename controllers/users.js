const { findUserByProperty, patchUser } = require("../service/user");

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await findUserByProperty("_id", id);
    res.status(200).json(result);
  } catch (error) {}
};

const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  try {
    if (data.name) {
      const result = await patchUser(id, data);
      res.status(201).json(result);
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = { getUserById, updateUser };
