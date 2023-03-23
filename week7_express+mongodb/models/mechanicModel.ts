import mongoose from 'mongoose';
import slugify from 'slugify';

const mechanicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A mechanic must have a name'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'A mechanic must have a password'],
    minlength: [
      8,
      'A mechanic password must have more or equal than 8 characters',
    ],
    select: false,
    trim: true,
  },
  role: {
    type: String,
    enum: {
      values: ['mechanic', 'admin', 'mechanic-intern', 'mechanic-lead'],
      message: 'Role is either: mechanic, admin',
    },
    default: 'mechanic',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  email: {
    type: String,
    required: [true, 'A mechanic must have an email'],
    unique: true,
    trim: true,
    validate: {
      validator: function (val: string) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val);
      },
    },
  },

  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: [true, 'A mechanic must have a car'],
  },
  slug: String,
});

mechanicSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

mechanicSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'car',
    select: '-__v',
  });
  next();
});


mechanicSchema.post('save', function (doc, next) {
  console.log(doc);
  next();
});

const mechanicModel = mongoose.model('Mechanic', mechanicSchema);
export default mechanicModel;
