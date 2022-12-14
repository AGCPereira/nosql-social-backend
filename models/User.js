const { Schema, model} = require('mongoose');

//validators
function validateEmail(email) {
    const regex = new RegExp("/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/");
    return regex.test(email);

}

//schemas
const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: [validateEmail, 'Provide a valid email address'],
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);


UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

UserSchema.virtual('thoughtCount').get(function() {
    return this.thoughts.length;
});


const User = model('User', UserSchema);

module.exports = User;