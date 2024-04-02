import { LoginService } from "../services/loginService";
const loginService = new LoginService;

export class LoginController{
    
    async login(req, res, next){
        const { username, password } = req.body;
        try {
            const user = await loginService(username, password);
            if (user) {
                res.status(200).json({ message: 'Login successful', user });
            } else {
                res.status(401).json({ message: 'Invalid username or password' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};