import Express from "express"
import cors from 'cors'

const app = Express()

app.use(cors())

const delay = (ms) => new Promise((resolve, reject) => {
  setTimeout(resolve, ms)
})

app.get("/", async (req, res) => {
    await delay(5000)
    res.send(req.query)
})


app.listen(3000, () => {
  console.log("Example app listening on port 3000!")
})