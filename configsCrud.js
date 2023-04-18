import {MongoClient, ObjectId} from "mongodb";

let collection

export async function connectToMongo(uri) {


    try {
        const mongoClient = new MongoClient(uri)
        console.log("Connecting to Mongodb ...")
        await mongoClient.connect()
        console.log("Successfully connected to Mongodb")
        const db = mongoClient.db("VPN")
        collection = db.collection("v2ray")
    } catch (error) {
        console.log("Connecting to database failed", error)
        process.exit()
    }
}

export async function createConfigs(configs) {
    await collection.insertMany(configs)
}


export function getAllConfigs() {
    return collection.find().toArray()
}

export async function updateConfig(config) {
    let {_id, configISPs} = config

    const theConfig = await collection.findOne({_id: new ObjectId(_id)})
    const currentISPs = theConfig.configISPs

    configISPs = configISPs.map(ISP => {
        return {
            name: ISP.name,
            date: new Date().getTime() / 1000,
            apps: []
        }
    })

    const ISPs = getMixedISPs(configISPs, currentISPs)
    await collection.findOneAndUpdate({_id: new ObjectId(_id)},
        {$set: {configISPs: ISPs}}, {returnDocument: "after"})
    return configISPs
}

export async function updateConfigDeleteISP(config){
    let {_id, configISPs} = config
    await collection.findOneAndUpdate({_id: new ObjectId(_id)}, {$set:{configISPs}})
    return configISPs
}

export async function deleteAll() {
    await collection.deleteMany({})
}

function getMixedISPs(selectedISPs, currentISPs){
    const selectedISPsNames = selectedISPs.map(isp => {
            return isp.name
        })

    currentISPs = currentISPs.filter(isp => {
        return !selectedISPsNames.includes(isp.name)
    })
    return [...currentISPs, ...selectedISPs]
}