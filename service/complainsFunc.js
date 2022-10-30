const { ObjectId } = require("mongodb");
const { complainsCollection, votesCollection } = require("../model/Users");
const { citizensCollection } = require("../model/Users");

const findComplainByProperty = async (key, value) => {
  if (key === "_id") {
    return await citizensCollection.findOne({ [key]: ObjectId(value) });
  }

  return await citizensCollection.findOne({ [key]: value });
};

const getComplains = () => {
  return complainsCollection.find({}).toArray();
};

const updateComplainsReactions = async (data) => {
  const filter = { _id: ObjectId(data.complain_id) };

  if (data.total_upvotes < 0) {
    data.total_upvotes = 0;
  }
  if (data.total_downvotes < 0) {
    data.total_downvotes = 0;
  }

  const update = {
    $set: { ...data },
  };

  return await complainsCollection.updateOne(filter, update);
};

const createNewComplain = async ({
  citizen_id,
  address,
  ward,
  description,
  attachment,
  complainType,
}) => {
  return await complainsCollection.insertOne({
    citizen_id,
    address,
    ward,
    description,
    attachment,
    category: "",
    complainType,
    status: "pending approval",
    total_comments: 0,
    total_upvotes: 0,
    total_downvotes: 0,
    submission_date: new Date(),
  });
};

module.exports = {
  createNewComplain,
  findComplainByProperty,
  getComplains,
  updateComplainsReactions,
};
