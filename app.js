const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000
const movieList = require('./movies.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index',{movieList: movieList.results})
})

app.get('/movies/:movie_id',function(req,res){
  const matchMovie = movieList.results.find(function(movie){
    return movie.id == req.params.movie_id
  })
  res.render('show',{movie: matchMovie})
})

app.get('/search',function(req,res){
  const keyword = req.query.keyword
  const matchMovie = movieList.results.filter(function(movie){
    return movie.title.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index',{movieList: matchMovie , keyword})
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})