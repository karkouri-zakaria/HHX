const DMs = require('../Models/DMs')

exports.getDMs = async (req, res) => {
  const { page = 1, limit = 4 } = req.query;
  try {
    const DMList = await DMs.find()
      .sort({ _id: 'desc' })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    const count = await DMs.count();
    res.status(200).json({
      success: true,
      count: Math.ceil(count / limit),
      DMs: DMList,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getDM = async (req, res) => {
  const DM = await DMs.findOne({
    _id: req.params.id,
  })
  res.status(200).json({
    success: true,
    DM,
  })
}

exports.addDM = async (req, res) => {
  const DM = new DMs(req.body)
  await DM.save()
  res.status(200).json({
    success: true,
    DM,
  })
}

exports.updateDM = async (req, res) => {
  const DMUpdated = await DMs.updateOne(
    { _id: req.params.idDM },
    { $set: req.body }
  )
  res.status(200).json({
    success: true,
    DMUpdated,
  })
}

exports.deleteDM = async (req, res) => {
  const deletedDM = await DMs.deleteOne({ _id: req.params.idDM })
  res.status(200).json({
    success: true,
    deletedDM,
  })
}
