const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 8080;


// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Register Endpoint
app.post('/register', (req, res) => {
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

            // Send success message only after user is registered
            res.send('Registration successful! You can now <a href="/login.html">Log In</a>');
      

          });
    });
});

// Login Endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    fs.readFile('myDB.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Internal server error.');
        }

        const users = data.split('\n');
        const userFound = users.some(line => {
            const [storedUsername, storedPassword] = line.split(',').map(item => item.trim());
            return storedUsername === username && storedPassword === password;
        });

        if (userFound) {
            res.send(`Welcome, ${username}!`);
        } else {
            res.status(401).send('Invalid username or password. Please try again.');
        }
    });
});

// Login Endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    fs.readFile('myDB.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Internal server error.');
        }

        const users = data.split('\n');
        const userFound = users.some(line => {
            const [storedUsername, storedPassword] = line.split(',').map(item => item.trim());
            return storedUsername === username && storedPassword === password;
        });

        if (userFound) {
            res.send(`Welcome, ${username}!`);
        } else {
            res.status(401).send('Invalid username or password. Please try again.');
        }
    });
});


// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Unexpected error:', err);
    res.status(500).send('Internal server error.');
});


// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});





