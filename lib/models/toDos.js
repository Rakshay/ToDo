import mongoose from 'mongoose';

var ToDosSchema = new mongoose.Schema({
  description: String,
  isComplete: Boolean,
  isActive: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('toDosSchema', ToDosSchema);