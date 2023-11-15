const express=require('express')
const fs=require('fs')

const watchlist='watchlist.json';



// ==========Read and writing data =================

 function readList(){
      const data=fs.readFileSync(watchlist,'utf-8')
        return JSON.parse(data);
}

function writeList(watchlistData){
    const data=JSON.stringify(watchlistData , null , 2)
    fs.writeFileSync(watchlist,data)
}


// ====================================================



const postWatchData=(req,res)=>{
    const watchlistData=readList();
    const {id,backdroppath,originaltitle,runtime,releasedate,status}=req.body;
      if(watchlistData.some(data=>data.id === id)){
       res.status(400).json('data already exist')
      }
      else{
        watchlistData.push({id , backdroppath , originaltitle , runtime , releasedate , status});
        console.log(req.body);
        writeList(watchlistData);
        
        res.status(201).json({message:"blog created successfully",watchlistData})
      }
    };





const getWatchData = async (req, res) => {
  try {
    const getWatchList = await readList();
    console.log(getWatchList);
    res.status(200).json(getWatchList);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const getDatabyId = async (req, res) => {
  const id = req.params.id;

  const watchlistdata =  readList()
  let found = false;
watchlistdata.forEach(element => {
  console.log(element.id)
  if(element.id === id){
  found = true;
  }
});
if(found){
  return res.status(400).json('id alreadyexist'); 
}else{
  return res.json(id); 
}

  // const singleList = watchlistdata.find(async (data) => data.id == id);
  // console.log();
  // if (singleList) {
  //   res.json({res:true}); 
  // } else {
  //   res.status(404).json({ res:false });
  // }
};



const deleteWatchData=async(req,res)=>{

    const singlelist = readList();
    let singledata = singlelist.findIndex((data) => data.id === req.params.id.trim);
    singledata = 0;
    // console.log(singledata)
  
    if (singledata < 0) {
      res.status(404).json({ error: "list not found" });
    } else {
       await singlelist.splice(singledata, 1);
        writeList(singlelist);
      res.json({ message: "list deleted successfully" });
    }
    
}



module.exports={postWatchData,getWatchData,deleteWatchData,getDatabyId}