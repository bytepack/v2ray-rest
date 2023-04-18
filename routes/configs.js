import express from "express"
import {createConfigs, deleteAll, getAllConfigs, updateConfig, updateConfigDeleteISP} from "../configsCrud.js";
const router = express.Router()

// Getting all
router.get("/", async (req,res)=>{
    try {
        const configs = await getAllConfigs()
        res.status(200).json(configs)
    }
    catch (error){
        res.status(500).json({message:error.message})
    }
})


//Creating many
router.post("/", async (req,res)=>{
    const configs = req.body
    try {
        await createConfigs(configs)
        console.log("configs inserted")
        res.status(201).json(configs)
    }
    catch (error){
        res.status(400).json({message:error.message})
    }

})

// Updating one
router.put("/", async (req,res)=>{
    let config = req.body
    try{
        const ISPs = await updateConfig(config)
        console.log(ISPs)
        console.log("Updated")
        res.status(200).json(ISPs)
    }
    catch(error){
        res.status(400).json({message:error.message})
    }
})

router.put("/delete-isp", async (req , res)=>{
    let config = req.body
    try{
        const ISP = await updateConfigDeleteISP(config)
        console.log("One ISP Deleted")
        console.log("These are the rest ...")
        console.log(ISP)
        res.status(200).json(ISP)
    }
    catch (error){
        res.status(400).json({message: error.message})
    }
})

// Deleting all
router.delete("/", async (req,res)=>{
    try{
        await deleteAll()
        console.log("Deleted")
        res.status(200).json({message:"Successfully deleted"})
    }
    catch (error){
        res.status(500).json({message:error.message})
    }
})

export default router
