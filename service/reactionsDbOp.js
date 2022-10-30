const { ObjectId } = require("mongodb");
const {
  votesCollection,
  complainsCollection,
  commentsCollection,
  citizensCollection,
} = require("../model/Users");

const putVotes = async (data) => {
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

const postComment = async (comment) => {
  return await commentsCollection.insertOne(comment);
};

// const getCommentDetails = async (id) => {
//   const commentDetails = [];
//   const comments = await commentsCollection
//     .find({ complain_id: id })
//     .toArray();

//   comments.forEach(async (comment) => {
//     const user = await usersCollection.findOne({
//       _id: ObjectId(comment.user_id),
//     });

//     commentDetails.push({
//       _id: comment._id,
//       complainId: comment.complain_id,
//       userId: comment.user_id,
//       comment: comment.comment,
//       name: user?.name,
//       ward: user?.ward,
//       date: comment.createdAt,
//     });
//   });

//   return commentDetails;// it returns []
// };

const getCommentsByComplainId = async (complainId) => {
  // const commentDetails = [];

  const comments = await commentsCollection
    .find({ complain_id: complainId })
    .toArray();

  // for (const comment of comments) {
  //   const citizen = await citizensCollection.findOne({
  //     _id: ObjectId(comment.citizen_id),
  //   });

  //   commentDetails.push({
  //     _id: comment._id,
  //     complainId: comment.complain_id,
  //     citizenId: comment.citizen_id,
  //     comment: comment.comment,
  //     name: citizen.name,
  //     ward: citizen.ward,
  //     date: comment.createdAt,
  //   });
  // }
  const commentDetails = await Promise.all(
    comments.map(async (comment) => {
      const citizen = await citizensCollection.findOne({
        _id: ObjectId(comment.citizen_id),
      });

      return {
        _id: comment._id,
        complainId: comment.complain_id,
        citizenId: comment.citizen_id,
        comment: comment.comment,
        name: citizen.name,
        ward: citizen.ward,
        date: comment.createdAt,
      };
    })
  );
  return commentDetails;
};

module.exports = {
  putVotes,
  getVotesByUserId,
  postComment,
  getCommentsByComplainId,
};
