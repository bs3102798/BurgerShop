// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient, ServerApiVersion } from "mongodb"

if (!process.env.MONGO_URL) {
    throw new Error('Invalid/Missing environment variable: "MONGO_URL"')
}

const uri = process.env.MONGO_URL
const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
}

let client

if (process.env.NODE_ENV === "development") {
 
    if (!global._mongoClient) {
        client = new MongoClient(uri, options)
        global._mongoClient = client.connect()
    }
    client = global._mongoClient

}



// Export a module-scoped MongoClient. By doing this in a
// separate module, the client can be shared across functions.
export default client