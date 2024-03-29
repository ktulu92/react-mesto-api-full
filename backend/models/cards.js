const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  link: {
    type: String,
    required: true,
    validate: {
      validator() {
        return /^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)/g;
      },
    },
    message: 'Невалидная ссылка',
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  likes: [{ type: mongoose.Schema.Types.ObjectId, default: [] }],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', CardSchema);
