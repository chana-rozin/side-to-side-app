
import { LoginService } from "../services/loginService.js";
import 'dotenv/config';

const loginService = new LoginService();
import jwt from 'jsonwebtoken';

export class LoginController{
    
    async login(req, res, next){
        const { username, psw } = req.body;
        try {
            const user = await loginService.login(username, psw);
            if (user) {
                console.log("token ssesion");
                const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.status(200).json({ message: 'Login successful', token });
            } else {
                res.status(401).json({ message: 'Invalid username or password' });
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};