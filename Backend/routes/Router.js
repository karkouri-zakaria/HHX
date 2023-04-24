const express = require('express')
const router = express.Router()
const { getDocuments, getDocument, addDocument, updateDocument, deleteDocument } = require('../controllers/DocumentsController')
const {register, login, getUsers, getUser, addUser, updateUser, deleteUser} = require('../controllers/UserController.js')
const { getDMs, getDM, addDM, updateDM, deleteDM } = require('../controllers/DMsController')

const verifyToken = require('./verifyToken.js')
const { getArchives, getArchive, addArchive, updateArchive, deleteArchive, getArchiveFrom, getArchiveTo } = require('../controllers/ArchivesController')

router.route('/Documents').get(getDocuments)
router.route('/Document/:id').get(getDocument)
router.route('/addDocument').post( addDocument)
router.route('/updateDoc/:idDocument').patch(verifyToken, updateDocument)
router.route('/deleteDoc/:idDocument').delete(verifyToken, deleteDocument)

router.route('/DMs').get(getDMs)
router.route('/DM/:id').get(getDM)
router.route('/addDM').post( addDM)
router.route('/updateDm/:idDM').patch(updateDM)
router.route('/deleteDm/:idDM').delete(deleteDM)

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/Users').get(getUsers)
router.route('/User/:id').get(getUser)
router.route('/updateUser/:idUser').patch(updateUser)
router.route('/deleteUser/:idUser').delete(deleteUser)

router.route('/Archives').get(getArchives)
router.route('/Archive/:id').get(getArchive)
router.route('/ArchivesFrom/:id').get(getArchiveFrom)
router.route('/ArchivesTo/:id').get(getArchiveTo)
router.route('/addArchive').post( addArchive)
router.route('/updateArchive/:idArchive').patch(updateArchive)
router.route('/deleteArchive/:idArchive').delete(deleteArchive)

module.exports = router