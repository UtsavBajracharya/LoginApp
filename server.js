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


// Register Endpoint
app.post('register',(req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required.');

    }

    fs.readFile('myDB.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Internal server error')
        }
   

          // Check if username already exists
          const users = data.split('\n').map(line => line.split(',')[0].trim());
          if (users.includes(username)) {
              return res.status(400).send('Username already exists. Please choose another.');
          }
  
          // Append the new user to the file
          fs.appendFile('myDB.txt', `${username},${password}\n`, (err) => {
              if (err) {
                  console.error('Error writing to file:', err);
                  return res.status(500).send('Internal server error.');
              }
              res.send('Registration successful! You can now <a href="/login">Log In</a>');

          });
    });
});




