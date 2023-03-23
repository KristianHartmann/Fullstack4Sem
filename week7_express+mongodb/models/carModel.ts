import mongoose from 'mongoose';
import Mechanic from './mechanicModel';

const carSchema = new mongoose.Schema(
  {
    model: {
      type: String,
      required: [true, 'A car must have a model'],
      trim: true,
      maxlength: [40, 'A car model must have less or equal than 40 characters'],
      minlength: [2, 'A car model must have more or equal than 2 characters'],
    },
    year: {
      type: Number,
      required: [true, 'A car must have a year'],
    },
    price: {
      type: Number,
      required: [true, 'A car must have a price'],
      min: [0, 'A car price must be greater than 0'],
    },
    mechanics: Array,
    color: {
      type: String,
      required: [true, 'A car must have a color'],
      trim: true,
      enum: {
        values: ['red', 'blue', 'green', 'black', 'yellow', 'white'],
        message: 'Color is either: red, blue, green, black, yellow, white',
      },
      maxlength: [40, 'A car color must have less or equal than 40 characters'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  { toJson: { virtuals: true }, toObject: { virtuals: true } },
);



carSchema.virtual('discount').get(function () {
  console.log('this.price: ', this.price);

  return this.price * 0.5;
});

carSchema.pre('save', async function (next) {
  const mechanicPromies = this.mechanics.map((id) => Mechanic.findById(id));
  this.mechanics = await Promise.all(mechanicPromies);
  next();
});

carSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'mechanics',
    select: '-__v',
  });
  next();
});

const Car = mongoose.model('Car', carSchema);
export default Car;
