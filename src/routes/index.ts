
import {Application} from 'express'
import routeHome from './Home.route';
import routeProduct from './Product.route';
import routeUser from './User.route';
import routeCart from './Cart.route';
import routeOrder from './Order.route';
import routeOtp from './Otp.route'
import { checkLogin } from '../middlewares/Login.middleware';

function route(app : Application) {
    app.use('/otp', routeOtp)
    app.use('/product', routeProduct);
    app.use('/user', routeUser);
    app.use('/cart', routeCart);
    app.use('/order', routeOrder);
    app.use('/', routeHome);
}


module.exports = route;