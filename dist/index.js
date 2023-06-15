"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const route = require('./routes');
// require('./src/helpers/redis_client')
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
app.use((0, morgan_1.default)('combined'));
route(app);
app.use('/resource', express_1.default.static(path_1.default.join(__dirname, 'public')));
app.get('/', (req, res, next) => {
    res.json();
});
app.use((err, req, res, next) => {
    console.log(err);
    res.status(200).json({
        "error-message": err.message,
        "status": err.status || 500,
    });
});
app.listen(PORT, () => {
    console.log(`Listening on PORT::${PORT}`);
});
