"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Home_route_1 = __importDefault(require("./Home.route"));
const Product_route_1 = __importDefault(require("./Product.route"));
const User_route_1 = __importDefault(require("./User.route"));
const Cart_route_1 = __importDefault(require("./Cart.route"));
const Order_route_1 = __importDefault(require("./Order.route"));
const Otp_route_1 = __importDefault(require("./Otp.route"));
function route(app) {
    app.use('/otp', Otp_route_1.default);
    app.use('/product', Product_route_1.default);
    app.use('/user', User_route_1.default);
    app.use('/cart', Cart_route_1.default);
    app.use('/order', Order_route_1.default);
    app.use('/', Home_route_1.default);
}
module.exports = route;
