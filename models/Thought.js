const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionText: {
      type: String,
      required: true,
      trim: true
    },
    writtenBy: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const ThoughtSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },
    thoughtText: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    reactions: [ReactionSchema]
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    }
  }
);

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought; 