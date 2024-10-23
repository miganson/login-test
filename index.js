const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const users = [
  { username: "Miguel", password: "passMiguel" },
  { username: "Ferdinand", password: "passFerdinand" },
];
const SECRET_KEY = "key";

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log('receive', {username, password})

  const user = users.find((person) => {
    console.log('person', person)
    console.log('username', username)
    console.log('password', password)

    person.username === username && person.password === password;
  });

  if (user) {
    console.log('user found')
    const token = jwt.sign({ username: user.username }, SECRET_KEY, {
      expiresIn: "1h",
    });
    return res.status(200).json({ message: "Login successful", token });
  } else {
    console.log('not found', user)

    return res.status(400).json({ message: "Invalid credentials." });
  }
});

app.use((req, res) => {
  res.status(404).json({ message: "Invalid login attempt" });
});
console.log("Server Running");
app.listen(3000);
