const mongoose = require('mongoose');

const contentIdeaSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  topic: String,
  niche: String,
  reelIdea: String,
  caption: String,
  hashtags: [String],
  hook: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ContentIdea', contentIdeaSchema);