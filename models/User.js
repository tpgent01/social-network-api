const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
    {
        userName: {
            type: String,
            required: 'You need to provide a username!',
            trim: true
        },
        email: {
            type: String,
            required: 'You need to provide an email!',
            trim: true
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
    }
);

UserSchema.virtual('friendCount').get(function() { 
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User; 