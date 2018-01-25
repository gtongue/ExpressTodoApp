import {Schema, model} from 'mongoose';

let userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true
  }
})

export default model('User', userSchema);