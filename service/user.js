const { ObjectId } = require("mongodb");
const { citizensCollection } = require("../model/Users");

const findUserByProperty = async (key, value) => {
  if (key === "_id") {
    return await citizensCollection.findOne({ [key]: ObjectId(value) });
  }

  return await citizensCollection.findOne({ [key]: value });
};

const createNewUser = ({ name, email, phone, ward, address }) => {
  return citizensCollection.insertOne({
    name,
    email,
    phone,
    ward,
    address,
    total_complaints: 0,
    status: "active",
    createdAt: new Date(),
  });
};

module.exports = {
  findUserByProperty,
  createNewUser,
};
