const Archives = require('../Models/Archives')

exports.getArchives = async (req, res) => {
  const { page = 1, limit = 4 } = req.query
  const ArchiveList = await Archives.find()
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({ _id: 'desc' })
    .exec()
  const count = await Archives.count().exec()
  res.status(200).json({
    success: true,
    count: Math.ceil(count / limit),
    Archives: ArchiveList,
  })
}

exports.getArchive = async (req, res) => {
  const Archive = await Archives.findOne({
    _id: req.params.id,
  })
  res.status(200).json({
    success: true,
    Archive,
  })
}

exports.getArchiveFrom = async (req, res) => {
  const { page = 1, limit = 4 } = req.query
  const Archive = await Archives.find({
    id_from: req.params.id,
  }).limit(limit)
  .skip((page - 1) * limit)
  .sort({ Date: 'desc' })
  .exec()
  const count = await Archives.count().exec()
  res.status(200).json({
    success: true,
    count: Math.ceil(count / limit),
    Archive,
  })
}

exports.getArchiveTo = async (req, res) => {
  const { page = 1, limit = 4 } = req.query
  const Archive = await Archives.find({
    id_to: req.params.id,
  }).limit(limit)
  .skip((page - 1) * limit)
  .sort({ Date: 'desc' })
  .exec()
  const count = await Archives.count().exec()
  res.status(200).json({
    success: true,
    count: Math.ceil(count / limit),
    Archive,
  })
}

exports.addArchive = async (req, res) => {
  const Archive = new Archives(req.body)
  await Archive.save()
  res.status(200).json({
    success: true,
    Archive,
  })
}

exports.updateArchive = async (req, res) => {
  const ArchiveUpdated = await Archives.updateOne(
    { _id: req.params.idArchive },
    { $set: req.body }
  )
  res.status(200).json({
    success: true,
    ArchiveUpdated,
  })
}

exports.deleteArchive = async (req, res) => {
  const deletedArchive = await Archives.deleteOne({ _id: req.params.idArchive })
  res.status(200).json({
    success: true,
    deletedArchive,
  })
}
