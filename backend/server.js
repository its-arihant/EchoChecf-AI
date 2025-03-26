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
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Your Vite frontend URL
    credentials: true
}));

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

// Email transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail', // or your email service
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// ✅ Contact Form Submission Route
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: process.env.YOUR_EMAIL, // Your personal email where you want to receive messages
            subject: `New Contact Form Submission from ${name}`,
            text: `
          Name: ${name}
          Email: ${email}
          Message: ${message}
        `,
            html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: 'Your message has been sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send message' });
    }
});

// ✅ Signup Route
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

// ✅ Get User Form Data (Protected Route)
app.get("/api/user-form", authenticateJWT, async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from JWT
        const userFormData = await UserForm.findOne({ userId });

        if (!userFormData) {
            return res.status(404).json({ message: "User form not found" });
        }

        res.json(userFormData);
    } catch (error) {
        console.error("Error fetching user form data:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Update User Form (Protected Route)
app.put("/api/user-form", authenticateJWT, async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, email, contact, age, height, weight, fruits, vegetables, allergies } = req.body;

        // Ensure required fields are provided
        if (!name || !email || !contact || !age || !height || !weight) {
            return res.status(400).json({ message: "All required fields must be filled." });
        }

        const updatedUserForm = await UserForm.findOneAndUpdate(
            { userId },
            { name, email, contact, age, height, weight, fruits, vegetables, allergies },
            { new: true } // Returns updated document
        );

        if (!updatedUserForm) {
            return res.status(404).json({ message: "User form not found" });
        }

        res.json(updatedUserForm);
    } catch (error) {
        console.error("Error updating user form:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Recipe Generation Route
app.post("/api/generate-recipe", async (req, res) => {
    console.log("Received request body:", req.body);

    try {
        const { ingredients, mealType, mealCategory, cuisine, dietType, chefMode } = req.body;

        if (!ingredients || !Array.isArray(ingredients)) {
            return res.status(400).json({ error: "Ingredients must be an array" });
        }

        const prompt = `Generate a detailed recipe with these specifications in perfect JSON format only:
{
  "name": "Recipe Name",
  "description": "Brief description",
  "ingredients": ["item1", "item2"],
  "instructions": ["Step 1", "Step 2"],
  "prepTime": "X minutes",
  "cookTime": "X minutes",
  "totalTime": "X minutes",
  "servings": X,
  "nutritionalContent": {
    "calories": "X kcal",
    "protein": "Xg",
    "carbs": "Xg",
    "fats": "Xg"
  },
  "dietaryTags": ["tag1", "tag2"],
  "cuisine": "${cuisine}",
  "mealType": "${mealType}",
  "difficulty": "${chefMode}"
}

Actual Specifications:
Ingredients: ${ingredients.join(", ")}
Meal Type: ${mealType}
Meal Category: ${mealCategory}
Cuisine: ${cuisine}
Diet Type: ${dietType}
Chef Mode: ${chefMode}

IMPORTANT: Return ONLY the JSON object, without any additional text or explanations. The JSON must be properly formatted and valid.`;

        const cohereResponse = await fetch("https://api.cohere.ai/v1/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + process.env.COHERE_API_KEY,
            },
            body: JSON.stringify({
                model: "command",
                prompt: prompt,
                max_tokens: 1024,
                temperature: 0.7,
                return_likelihoods: "NONE",
            }),
        });

        if (!cohereResponse.ok) {
            const errorText = await cohereResponse.text();
            console.error("Cohere API Error Response:", errorText);
            throw new Error(`Cohere API Error: ${errorText}`);
        }

        const cohereData = await cohereResponse.json();
        let generatedText = cohereData?.generations?.[0]?.text || "{}";
        
        // Enhanced JSON cleaning
        generatedText = generatedText
            .replace(/```json/g, '')  // Remove JSON code block markers
            .replace(/```/g, '')      // Remove any remaining code block markers
            .replace(/^[^{]*/, '')    // Remove everything before first {
            .replace(/[^}]*$/, '')    // Remove everything after last }
            .trim();

        let recipe;
        try {
            recipe = JSON.parse(generatedText);
        } catch (parseError) {
            console.error("JSON Parsing Error:", parseError);
            console.error("Generated text that failed to parse:", generatedText);
            
            // Try to extract JSON from malformed response
            const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                try {
                    recipe = JSON.parse(jsonMatch[0]);
                } catch (secondParseError) {
                    console.error("Secondary JSON Parsing Error:", secondParseError);
                    // Fallback to creating a basic recipe object
                    recipe = createFallbackRecipe(ingredients, mealType, cuisine, dietType, chefMode);
                }
            } else {
                recipe = createFallbackRecipe(ingredients, mealType, cuisine, dietType, chefMode);
            }
        }

        // Validate the recipe object
        if (!recipe.name || !recipe.ingredients || !recipe.instructions) {
            recipe = {
                ...recipe,
                ...createFallbackRecipe(ingredients, mealType, cuisine, dietType, chefMode)
            };
        }

        res.json({ recipe });
    } catch (error) {
        console.error("Error generating recipe:", error);
        res.status(500).json({ 
            error: "Internal Server Error",
            recipe: createFallbackRecipe(
                req.body.ingredients || [], 
                req.body.mealType || "Dinner", 
                req.body.cuisine || "Indian", 
                req.body.dietType || "Vegetarian", 
                req.body.chefMode || "Intermediate"
            )
        });
    }
});

// Helper function to create a fallback recipe
function createFallbackRecipe(ingredients, mealType, cuisine, dietType, chefMode) {
    return {
        name: "Custom Recipe",
        description: "Here's your personalized recipe",
        ingredients: ingredients,
        instructions: [
            "1. Prepare all the ingredients",
            "2. Cook according to your preferred method",
            "3. Season to taste",
            "4. Serve and enjoy!"
        ],
        prepTime: "10 minutes",
        cookTime: "20 minutes",
        totalTime: "30 minutes",
        servings: 2,
        nutritionalContent: {
            calories: "Approx 300-500 kcal",
            protein: "Varies",
            carbs: "Varies",
            fats: "Varies"
        },
        dietaryTags: [dietType],
        cuisine: cuisine,
        mealType: mealType,
        difficulty: chefMode
    };
}

// ✅ Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
