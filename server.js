const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 8080;

// Serve static files
app.use(express.static('public'));

// Start the Server
app.listen(PORT, () => {
    console.log("Server is running on http://localhost:${PORT}");
});
