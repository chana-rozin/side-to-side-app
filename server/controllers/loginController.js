
import { LoginService } from "../services/loginService.js";
const loginService = new LoginService();
import jwt from 'jsonwebtoken';

export class LoginController{
    
    async login(req, res, next){
        const { username, password } = req.body;
        try {
            const user = await loginService.login(username, password);
            if (user) {
                const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.status(200).json({ message: 'Login successful', token });
            } else {
                res.status(401).json({ message: 'Invalid username or password' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};