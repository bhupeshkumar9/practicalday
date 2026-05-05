const express = require("express");
const app = express();

const PORT = 3000;


app.use(express.json());


app.use((req, res, next) => {
    const currentTime = new Date().toLocaleString();
    console.log(`Request received at: ${currentTime}`);
    console.log(`${req.method} ${req.url}`);
    next();
});


let users = [];


const response = (res, message, data = null) => {
    return res.json({
        message,
        time: new Date().toLocaleString(),
        data
    });
};


app.get("/", (req, res) => {
    response(res, "Server Running");
});



app.get("/users", (req, res) => {
    response(res, "Users fetched successfully", users);
});


app.post("/users", (req, res) => {
    const { name, email } = req.body;

    
    if (!name || !email) {
        return response(res, "Name and email are required");
    }

    
    const exists = users.find(user => user.email === email);
    if (exists) {
        return response(res, "Email already exists");
    }

    const newUser = {
        id: users.length + 1,
        name,
        email
    };

    users.push(newUser);

    response(res, "User added successfully", newUser);
});


app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
        return response(res, "User not found");
    }

    users.splice(index, 1);

    response(res, "User deleted successfully");
});


app.get("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const user = users.find(user => user.id === id);

    if (!user) {
        return response(res, "User not found");
    }

    response(res, "User fetched successfully", user);
});


app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return response(res, "All fields required");
    }

    if (email === "admin@gmail.com" && password === "1234") {
        return response(res, "Login Success");
    } else {
        return response(res, "Invalid Credentials");
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
