import {Router} from 'express'
import accountController from '../controllers/Account.controller';
import userController from '../controllers/User.controller';
import { checkLogin } from '../middlewares/Login.middleware';

const route = Router();




route.post('/login', accountController.login);
route.post('/refreshToken', accountController.getAccessToken);
route.post('/logout', checkLogin, accountController.logOut);
route.post('/newpass', accountController.newPass)
route.post('/newuser', userController.newUser)


export = route;


