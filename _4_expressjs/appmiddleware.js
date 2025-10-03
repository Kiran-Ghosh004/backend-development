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
  res.send('<h1>Hello World</h1>')
  
})
app.get('/about', (req, res) => {
  res.send('Hello World am about page')
})
app.get('/profile', (req, res, next) => {
    // Simulate an error    
    return next(new Error('Something went wrong!'))
})

app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})