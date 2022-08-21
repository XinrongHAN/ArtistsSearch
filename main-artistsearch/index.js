const express = require('express')
const bodyParser = require('body-parser')
const axios = require("axios")
const cors = require('cors')
// const router = express.Router();
const app = express()
app.use(cors())

app.use(bodyParser.json())
app.use(express.static("hw8app"));


const Auth = async () => {
    const data = { client_id: '2b27313c6713ecfcb654', client_secret: 'fd57d0c1332ba67b900277b75ebf0f4e' }
    const res = await axios.post('https://api.artsy.net/api/tokens/xapp_token', data)
    token = await res.data.token
    console.log(res.data.token)
    return token;
}

let token = Auth();
token.then(() => {
    console.log(token)

    //need to figure out how to get the token from Auth async function
    // token = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsInN1YmplY3RfYXBwbGljYXRpb24iOiI2MjhmYmYyMzZmYjMwZTAwMGVlZmYyZGUiLCJleHAiOjE2NTUxMzU2MzQsImlhdCI6MTY1NDUzMDgzNCwiYXVkIjoiNjI4ZmJmMjM2ZmIzMGUwMDBlZWZmMmRlIiwiaXNzIjoiR3Jhdml0eSIsImp0aSI6IjYyOWUyMzEyZWVjNGRjMDAwYzBlYmIxNiJ9.Pwr7-7OcfNCiuxp09X8yU2JyuJt98UxzWGDj-2Leimc'

    // app.get('/', (req, res) => {
    //     res.send('Welcome to the home page!')
    // })

    app.get('/', (req, res) => {
        res.sendFile(process.cwd() + "/hw8main/hw8app/index.html")
    });

    app.get("/artists", async (req, res) => {
        try {
            let name = req.query.q;
            const config = {
                headers: { "X-XAPP-Token": token }
            }
            const response = await axios.get(`https://api.artsy.net/api/search?q=${name}&size=10&type=artist`, config);
            res.json(response.data)
        } catch (e) {
            console.log("ERROR", e);
        }
    })

    app.get("/info", async (req, res) => {
        try {
            let idLink = req.query.id;
            const config = {
                headers: { "X-XAPP-Token": token }
            }
            const response = await axios.get(idLink, config);
            res.json(response.data)
        } catch (e) {
            console.log("ERROR", e);
        }
    })

    app.get("/artwork", async (req, res) => {
        try {
            let idartwork = req.query.id;
            const config = {
                headers: { "X-XAPP-Token": token }
            }
            const response = await axios.get(`https://api.artsy.net/api/artworks?artist_id=${idartwork}&size=10`, config);
            res.json(response.data)
        } catch (e) {
            console.log("ERROR", e);
        }
    })

    app.get("/genes", async (req, res) => {
        try {
            let genesid = req.query.artwork_id;
            const config = {
                headers: { "X-XAPP-Token": token }
            }
            const response = await axios.get(`https://api.artsy.net/api/genes?artwork_id=${genesid}`, config);
            res.json(response.data)
        } catch (e) {
            console.log("ERROR", e)
        }
    })

    app.listen(8080, () => {
        console.log("Server started!")
    })
})






