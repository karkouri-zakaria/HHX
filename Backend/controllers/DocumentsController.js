const Documents = require('../Models/Documents')

exports.getDocuments = async (req, res) => {
  const { page = 1, limit = 4 } = req.query
  const documentList = await Documents.find()
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({ _id: 'desc' })
    .exec()
  const count = await Documents.count().exec()
  res.status(200).json({
    success: true,
    count: Math.ceil(count / limit),
    documents: documentList,
  })
}

exports.getDocument = async (req, res) => {
  const document = await Documents.findOne({
    _id: req.params.id,
  })
  res.status(200).json({
    success: true,
    document,
  })
}

exports.addDocument = async (req, res) => {
  const document = new Documents(req.body)
  await document.save()
  res.status(200).json({
    success: true,
    document,
  })
}

exports.updateDocument = async (req, res) => {
  const documentUpdated = await Documents.updateOne(
    { _id: req.params.idDocument },
    { $set: req.body }
  )
  res.status(200).json({
    success: true,
    documentUpdated,
  })
}

exports.deleteDocument = async (req, res) => {
  const deletedDocument = await Documents.deleteOne({ _id: req.params.idDocument })
  res.status(200).json({
    success: true,
    deletedDocument,
  })
}
