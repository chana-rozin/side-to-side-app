
import { LoginService } from "../services/loginService.js";
import 'dotenv/config';

const loginService = new LoginService();
import jwt from 'jsonwebtoken';
import { UsersService } from "../services/usersService.js";

export class LoginController{
    
    async login(req, res, next){
        const { username, psw } = req.body;
        try {
            const user = await loginService.login(username, psw);
            if (user) {
                console.log("token ssesion");
                //need more datails of the user in order to store in the token, to use them in authorized
                const token = jwt.sign({ username: user.username}, process.env.JWT_SECRET, { expiresIn: '1h' });
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