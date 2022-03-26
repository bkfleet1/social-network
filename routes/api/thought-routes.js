const router = require('express').Router();
const {
    getAllThought,
    getThoughtById,
    addThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts
router
  .route('/')
  .get(getAllThought)
  .post(addThought);

// /api/thoughts/<id>
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);
  



// /api/thought/:thoughtId/reactions
router
  .route('/:thoughtId/reactions')
  .post(addReaction)
  .delete(removeReaction);

// /api/thoughts/:thoughtId/reactionId
// router
//   .route('/:thoughtId/reactions/:reactionId')


module.exports = router;