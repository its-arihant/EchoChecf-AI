require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        });
        console.log("✅ MongoDB connected successfully!");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
};
connectDB();

// ✅ User Schema & Model
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
});

const User = mongoose.model("User", userSchema);

// ✅ User Form Schema & Model
const userFormSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    age: { type: Number, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    fruits: { type: String },
    vegetables: { type: String },
    allergies: { type: String, default: "None" },
});

const UserForm = mongoose.model("UserForm", userFormSchema);

// ✅ Middleware to verify JWT
const authenticateJWT = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token" });
    }
};

// ✅ Signup Route
// ✅ Signup Route (Modified to return token)
app.post("/api/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        // 🔹 Generate JWT token immediately after signup
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({ message: "User registered successfully", token });
    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({ message: "Server error" });
    }
});


// ✅ Login Route
app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Save User Form Route (Protected)
app.post("/api/user-form", authenticateJWT, async (req, res) => {
    try {
        const { name, email, contact, age, height, weight, fruits, vegetables, allergies } = req.body;

        if (!name || !email || !contact || !age || !height || !weight) {
            return res.status(400).json({ message: "All required fields must be filled." });
        }

        const userData = new UserForm({
            userId: req.user.id,
            name,
            email,
            contact,
            age,
            height,
            weight,
            fruits,
            vegetables,
            allergies,
        });

        await userData.save();
        res.json({ message: "User form saved successfully!" });
    } catch (error) {
        console.error("User Form Error:", error);
        res.status(500).json({ message: "Failed to save user details" });
    }
});

// ✅ Image Upload & Prediction Route
const upload = multer({ dest: "uploads/" });

app.post("/api/predict", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No image uploaded" });
        }

        const imagePath = req.file.path;
        const formData = new FormData();
        formData.append("file", fs.createReadStream(imagePath));

        // 🔹 Send image to Streamlit API
        const response = await axios.post("http://127.0.0.1:5001/predict", formData, {
            headers: { ...formData.getHeaders() },
        });

        fs.unlinkSync(imagePath); // Delete temp image

        res.json(response.data);
    } catch (error) {
        console.error("❌ Prediction Error:", error.message);
        res.status(500).json({ error: "Failed to get prediction" });
    }
});

// ✅ Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
