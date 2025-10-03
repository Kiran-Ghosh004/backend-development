import express from 'express'

const app = express()
const port = 3000
app.use((req,res,next)=>{
    console.log("middleware called")
    next()
})
app.use((req,res,next)=>{
    console.log("middleware called")
    next()
})
app.use((req,res,next)=>{
    console.log("middleware called")
    next()
})

app.get('/', (req, res) => {
  res.send('Hello World')
})
app.get('/about', (req, res) => {
  res.send('Hello World am about page')
})


app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})