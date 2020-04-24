var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */


/* ---- Q1a (Dashboard) ---- */
function getAllGenres(req, res) {
  var query = `SELECT DISTINCT genre FROM Genres`;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  })
};


/* ---- Q1b (Dashboard) ---- */
function getTopInGenre(req, res) {
  var query = `
  SELECT title, rating, vote_count
  FROM Movies JOIN Genres ON Movies.id = Genres.movie_id
  WHERE Genres.genre = '${req.params.genre}'
  ORDER BY rating DESC, vote_count DESC
  LIMIT 10;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- Q2 (Recommendations) ---- */
function getRecs(req, res) {
  console.log(req.params.title);
  var query = `
  WITH T1 AS (
    SELECT genre
    FROM Movies JOIN Genres ON Movies.id = Genres.movie_id
    WHERE Movies.title = '${req.params.title}'
  )
  SELECT DISTINCT title, id, rating, vote_count
  FROM Movies M JOIN Genres G ON M.id = G.movie_id
  WHERE M.title != '${req.params.title}' AND NOT EXISTS (
    SELECT genre
    FROM T1
    WHERE genre NOT IN(
      SELECT genre
      FROM Genres
      WHERE movie_id = M.id
    )
  )
  ORDER BY rating DESC, vote_count DESC
  LIMIT 5;
  `;

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- (Best Genres) ---- */
function getDecades(req, res) {
	var query = `
    SELECT DISTINCT (FLOOR(year/10)*10) AS decade
    FROM (
      SELECT DISTINCT release_year as year
      FROM Movies
      ORDER BY release_year
    ) y
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

/* ---- Q3 (Best Genres) ---- */
function bestGenresPerDecade(req, res) {
  var query = `
  WITH all_genres AS (
    SELECT DISTINCT genre
    FROM Genres),
    top_genres AS (SELECT genre, AVG(rating) AS avg_rating
    FROM Genres JOIN Movies ON Genres.movie_id = Movies.id
    WHERE release_year >= ${req.params.decade} AND release_year <= (${req.params.decade} + 9)
    GROUP BY genre),
    all_genres_na AS (
      SELECT all_genres.genre, avg_rating
      FROM all_genres LEFT JOIN top_genres ON all_genres.genre = top_genres.genre
    ) SELECT genre, COALESCE(avg_rating, 0 ) AS avg_rating 
      FROM all_genres_na
      ORDER BY avg_rating DESC, genre ASC;
  `;
  
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

// The exported functions, which can be accessed in index.js.
module.exports = {
	getAllGenres: getAllGenres,
	getTopInGenre: getTopInGenre,
	getRecs: getRecs,
	getDecades: getDecades,
  bestGenresPerDecade: bestGenresPerDecade
}