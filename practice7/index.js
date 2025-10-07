const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Home page — list all files
app.get('/', (req, res) => {
    fs.readdir('./files', (err, files) => {
        if (err) return res.status(500).send('Error reading directory');
        // Remove .txt extension when displaying
        const cleaned = files.map(file => path.parse(file).name);
        res.render('index', { files: cleaned });
    });
});

// Show file content
app.get('/file/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'files', `${req.params.filename}.txt`);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(404).send('File not found');
        res.render('show', { title: req.params.filename, details: data });
    });
});

// Edit file page
app.get('/edit/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'files', `${req.params.filename}.txt`);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(404).send('File not found');
        res.render('edit', { title: req.params.filename, details: data });
    });
});

// Update file (PUT using hidden method override)
app.post('/edit/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'files', `${req.params.filename}.txt`);
    fs.writeFile(filePath, req.body.details, (err) => {
        if (err) return res.status(500).send('Error saving file');
        res.redirect(`/file/${req.params.filename}`);
    });
});

// Create new file
app.post('/create', (req, res) => {
    const filename = req.body.title.split(' ').join('') + '.txt';
    const filePath = path.join(__dirname, 'files', filename);
    fs.writeFile(filePath, req.body.details, (err) => {
        if (err) return res.status(500).send('Error creating file');
        res.redirect('/');
    });
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
