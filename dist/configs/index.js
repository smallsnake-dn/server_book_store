"use strict";
module.exports = {
    'mssql': {
        user: 'sa',
        password: '1',
        server: 'localhost',
        trustServerCertificate: true,
        database: 'BanSachVPP'
    },
    'role': {
        'admin': ['user', 'author'],
        'custormer': []
    }
};
