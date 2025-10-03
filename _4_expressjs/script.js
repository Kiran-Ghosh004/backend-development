import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World')
})
app.get('/profile', (req, res) => {
  res.send('Hello World kiran ghosh how are you')
})

app.listen(3000)