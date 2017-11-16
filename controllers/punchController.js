const mongoose = require('mongoose');
const Punch = mongoose.model('Punch');

exports.homePage = (req, res) =>{
  res.render('index',{title: 'punchCard'});
};
exports.createPunch = async (req, res) => {
    const punch = new Punch(req.body);
    await punch.save();
    res.redirect('/punch-archive');
};

exports.getPunches = async (req, res) => {
  const punches = await Punch.find();
  console.log(punches);
  res.render('puncharchive', {title: 'Punches', punches: punches});
}
