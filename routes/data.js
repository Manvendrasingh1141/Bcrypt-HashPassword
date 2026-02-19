import { Router } from 'express';
import User from '../schema/user.js';
import bcrypt from 'bcrypt';

const router = Router();

// register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userEmail = await User.findOne({ email });
        if (userEmail) {
            return res.send({ success: false, message: "User already registered!" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = new User({
            name: name,
            email: email,
            password: hashedPassword
        });
        await userData.save();
        res.send({ success: true, message: "Data saved successfully" });

    } catch (err) {
        console.log("Error while registered", err);
        res.send({ success: false, message: "Error while registering" });
    }
});


// login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const userEmail = await User.findOne({ email });
        if (!userEmail) {
            return res.send({ success: false, message: "User not registered!" });
        }
        const isMatch = await bcrypt.compare(password, userEmail.password);
        if (!isMatch) {
            return res.send({ success: false, message: "Invalid Password" });
        }
        res.send({ success: true, message: "Logged in successfully" });

    } catch (err) {
        console.log("Error while login", err);
        res.send({ success: false, message: "Error while login" });
    }
});

export default router;  