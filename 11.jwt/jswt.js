const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;
const SECRET_KEY = 'your-secret-key';

// Mock user data
const users = {
  user1: 'password1',
  user2: 'password2',
};

let students = [];

// Middleware to verify JWT
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send('No token provided');
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).send('Failed to authenticate token');
    }
    req.userId = decoded.id;
    next();
  });
}

// Login endpoint to get token
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (users[username] && users[username] === password) {
    const token = jwt.sign({ id: username }, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ auth: true, token: token });
  }
  res.status(401).send('Invalid credentials');
});

// Create (Add a new student) - Protected
app.post('/students', verifyToken, (req, res) => {
  const student = req.body;
  students.push(student);
  res.status(201).send('Student added successfully');
});

// Read (Get all students) - Protected
app.get('/students', verifyToken, (req, res) => {
  res.json(students);
});

// Read (Get a specific student) - Protected
app.get('/students/:id', verifyToken, (req, res) => {
  const id = req.params.id;
  const student = students.find(s => s.id === id);
  if (student) {
    res.json(student);
  } else {
    res.status(404).send('Student not found');
  }
});

// Update (Modify a student's data) - Protected
app.put('/students/:id', verifyToken, (req, res) => {
  const id = req.params.id;
  const updatedStudent = req.body;
  let studentIndex = students.findIndex(s => s.id === id);
  if (studentIndex !== -1) {
    students[studentIndex] = updatedStudent;
    res.send('Student updated successfully');
  } else {
    res.status(404).send('Student not found');
  }
});

// Delete (Remove a student) - Protected
app.delete('/students/:id', verifyToken, (req, res) => {
  const id = req.params.id;
  let studentIndex = students.findIndex(s => s.id === id);
  if (studentIndex !== -1) {
    students.splice(studentIndex, 1);
    res.send('Student deleted successfully');
  } else {
    res.status(404).send('Student not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
//mkdir student-api
// cd student-api
// npm init -y
// npm install express body-parser jsonwebtoken