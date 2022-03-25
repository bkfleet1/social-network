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

// /api/thoughts/<id>
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);
  
// /api/thoughts/<userId>
router
    .route('/:userId')
    .post(addThought);

// /api/thought/:thoughtId/reactions
router
  .route('/:thoughtId/reactions')
  .post(addReaction);

// /api/thoughts/:thoughtId/reactionId
router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);

module.exports = router;