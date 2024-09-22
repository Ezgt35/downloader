const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;
const filesDir = path.join(__dirname, 'files');

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// Route to get list of files
app.get('/files', (req, res) => {
    fs.readdir(filesDir, (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Unable to retrieve files' });
        }
        res.json(files);
    });
});

// Route to download a specific file
app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(filesDir, filename);
    res.download(filePath, err => {
        if (err) {
            res.status(500).json({ message: 'File download error' });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
