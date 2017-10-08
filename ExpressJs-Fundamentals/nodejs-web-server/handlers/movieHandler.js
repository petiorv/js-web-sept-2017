const fs = require('fs');
const qs = require('querystring');
const db = require('./../config/dataBase');


let loadAddMovie = ((req, res) => {
    fs.readFile('./views/addMovie.html', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        res.write(data);
        res.end();
    });
});

let postNewMovie = ((req, res) => {
    let body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        let movieBody = qs.parse(body);
        let validMovieFlag = true;
        for (let prop in movieBody) {
            if (movieBody[prop] === '') {
                validMovieFlag = false;
            }
        }
        if (validMovieFlag) {
            db.push(movieBody);
            fs.readFile('./views/addMovie.html', 'utf8', (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }
                data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', '<div id="succssesBox"><h2 id="succssesMsg">Movie Added</h2></div>')
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.write(data);
                res.end();
            });
        } else {
            fs.readFile('./views/addMovie.html', (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }
                data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', '<div id="errBox"><h2 id="errMsg">Please fill all fields</h2></div>')
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.write(data);
                res.end();
            });
        }
    });
});

let loadAllMovies = ((req, res) => {
    fs.readFile('./views/viewAll.html', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        let allMovies = ``;
        let cnt = 0;
        for (var movie of db.sort((a, b) => a.movieYear.localeCompare(b.movieYear))) {
            let moviePoster = qs.parse(movie.moviePoster);

            allMovies += `<div class="movie">
                            <a href=/movies/details/${cnt}> 
                                <img class="moviePoster" src="${Object.keys(moviePoster)}"/>
                            </a>
                          </div>`;

            cnt++;
        }
        data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', allMovies);
        res.write(data);
        res.end();
    });
});

let movieDetails = ((req, res) => {
    db.sort((a, b) => a.movieYear.localeCompare(b.movieYear));
    let id = Number(req.pathname.slice(-1));
    let movieDescription = Object.keys(qs.parse(db[id].movieDescription));
    let moviePoster = Object.keys(qs.parse(db[id].moviePoster));
    let movieTitle = Object.keys(qs.parse(db[id].movieTitle));
    let movieYear = Object.keys(qs.parse(db[id].movieYear));
    let html = ``;
    fs.readFile('./views/details.html', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        html += `<div class="content">
                        <img src="${moviePoster}" alt=""/>
                        <h3>Title ${movieTitle}</h3>
                        <h3>Year ${movieYear}</h3 >
                        <p> ${movieDescription}</p>
                     </div >`;

        data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', html);
        res.write(data);
        res.end();
    });
});

module.exports = ((req, res) => {
    if (req.pathname === '/addMovie' && req.method === 'GET') {
        loadAddMovie(req, res);
    } else if (req.pathname === '/addMovie' && req.method === 'POST') {
        postNewMovie(req, res);
    } else if (req.pathname === '/viewAllMovies' && req.method === 'GET') {
        loadAllMovies(req, res);
    } else if (req.pathname.startsWith('/movies/details/') && req.method === 'GET') {
        movieDetails(req, res);
    } else {
        return true;
    }
});