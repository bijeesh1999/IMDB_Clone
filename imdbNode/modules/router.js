const express=require('express')

const {postWatchData , getWatchData , deleteWatchData,getDatabyId} = require('./controller')


const router=express.Router();

router.route('/').get( getWatchData).post(postWatchData); 

module.exports=router


router.route('/:id').get(getDatabyId).delete(deleteWatchData)