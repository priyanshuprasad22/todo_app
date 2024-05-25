const express = require('express');
const router = express.Router();

const {gettask,getAlltask,addtask,updatetask,deletetask} = require('../controllers/job.js')

const validateTask = require('../middleware/validate.js');

router.route('/tasks').get(getAlltask);
router.route('/tasks/:id').get(gettask);
router.route('/tasks').post(validateTask,addtask);
router.route('/tasks/:id').put(updatetask);
router.route('/tasks/:id').delete(deletetask);


module.exports = router;
