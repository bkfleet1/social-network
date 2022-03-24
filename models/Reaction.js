const { Schema, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 280,
    },
    username: [
        {
            type: String,
            required: true,
            trim: true,
            default: UserSchema.path('username'),
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal),
    }
});

// const Reaction = model("Reaction", ReactionSchema);

module.exports = ReactionSchema;