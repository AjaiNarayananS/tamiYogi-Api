const express = require('express')
const cors =require('cors')
const app = express()
const scraping = require('./default')
const base_Url = 'https://tamilyogi.red'
const { default: axios } = require("axios");

app.use(cors())
app.get('/tamil_new_movies', async (req, res) => {
  const page= req.query.page || 1;
  try {
    const result = await scraping(`${base_Url}/category/tamilyogi-full-movie-online/page/${page}/`);
    res.send(result);
  } catch (error) {
    console.error("Error in route /tamil_new_movies:", error.message);
    res.status(500).send("Internal Server Error");
  }
});


app.get('/tamil_hd_movies', async (req, res) => {
  const page= req.query.page || 1;
  try {
    const result = await scraping(`${base_Url}/category/tamil-hd-movies/page/${page}/`)
    res.send(result);
  } catch (error) {
    console.error("Error in route /tamil_new_movies:", error.message);
    res.status(500).send("Internal Server Error");
  }
})

app.get('/tamil_dubbed_movies', async (req, res) => {
  const page= req.query.page || 1;
  try {
    const result = await scraping(`${base_Url}/category/tamilyogi-dubbed-movies-online/page/${page}/`)
    res.send(result);
  } catch (error) {
    console.error("Error in route /tamil_new_movies:", error.message);
    res.status(500).send("Internal Server Error");
  }
})

app.get('/tamil_web_series', async (req, res) => {
  const page= req.query.page || 1;
  try {
    const result = await scraping(`${base_Url}/category/tamil-web-series/page/${page}/`)
    res.send(result);
  } catch (error) {
    console.error("Error in route /tamil_new_movies:", error.message);
    res.status(500).send("Internal Server Error");
  }
})
app.get('/search', async (req, res) => {
  const moviename = req.query.moviename;
  const page= req.query.page || 1;
  try {
    const result = await scraping(`${base_Url}/page/${page}/?s=${moviename}`);
    res.send(result);
  } catch (error) {
    console.error("Error in route /search:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(8001, (req, res) => {
  console.log('server started 8001 🚀')
})

