const { ObjectId } = require("mongodb");
const { votesCollection } = require("../model/Users");

const putUpvotes = async (data) => {
  const { complain_id, citizen_id, upvote, downvote, createdAt } = data;

  const filter = { $and: [{ complain_id }, { citizen_id }] };
  const update = {
    $set: { complain_id, citizen_id, upvote, downvote, createdAt },
  };
  return await votesCollection.updateOne(filter, update, { upsert: true });
};
const getVotesByUserId = async (id) => {
  return await votesCollection.find({ citizen_id: id }).toArray();
};
module.exports = { putUpvotes, getVotesByUserId };
