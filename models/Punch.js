const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// const slug = require('slugs');

const punchSchema = new mongoose.Schema({
  date: String,
  punchin: String,
  lunchin: String,
  lunchout: String,
  punchout: String
});

// punchSchema.pre('save', function(next){
//   if (!this.isModified('date')){
//     next(); // skip it
//     return; // stop function from running
//   }
//   this.slug = slug(this.name);
//   next();
//   // Make more resilient so slugs are unique
// });

module.exports = mongoose.model('Punch', punchSchema);
