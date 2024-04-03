
import { LoginService } from "../services/loginService.js";
import 'dotenv/config';

const loginService = new LoginService();
import jwt from 'jsonwebtoken';
import { UsersService } from "../services/usersService.js";

export class LoginController{
    
    async login(req, res, next){
        const { username, psw } = req.body;
        try {
            let user = await loginService.login(username, psw);
            if (user) {
                user = await loginService.getUserByUsername(username);
                user=user[0];
                console.log("token ssesion");
                console.log("Token payload:", {id:user.id, username: user.username, email:user.email});
                const token = jwt.sign({id:user.id, username: user.username, email:user.email}, process.env.JWT_SECRET, { expiresIn: '1h' });
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