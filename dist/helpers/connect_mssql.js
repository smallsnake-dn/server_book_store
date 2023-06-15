"use strict";
// const mssql = require('mssql')
// const pool_mssql = require('./create_mssql')
// const dataAccess = () => {
//     console.log('Connect successfull');
//     const run = async function (name : string, command : string, inputs = [], outputs = []) {
//         try {
//             const pool = pool_mssql;
//             await pool.connect()
//             const request = pool.request();
//             assignParams(request, inputs, outputs);
//             return request[name](command);
//         } catch (error) {
//             throw error
//         }
//     }
//     return {
//         query: async (command, inputs = [], outputs = []) => {
//             return run('query', command, inputs, outputs);
//         },
//         queryEntity: async (command, entity, outputs = []) => {
//             const inputs = fetchParams(entity);
//             return run('query', command, inputs, outputs);
//         },
//         execute: async (command, inputs = [], outputs = []) => {
//             return run('execute', command, inputs, outputs);
//         },
//         executeEntity: async (command, entity, outputs = []) => {
//             const inputs = fetchParams(entity);
//             return run('execute', command, inputs, outputs);
//         },
//         close: async () => {
//             try {
//             } catch (error) {
//                 throw error
//             }
//         }
//     }
// }
// const fetchParams = entity => {
//     const params = [];
//     for (const key in entity) {
//         if (entity.hasOwnProperty(key)) {
//             const value = entity[key];
//             params.push({
//                 name: key,
//                 value
//             });
//         }
//     }
//     return params;
// };
// const assignParams = (request, inputs, outputs) => {
//     [inputs, outputs].forEach((params, index) => {
//         const operation = index === 0 ? 'input' : 'output';
//         params.forEach(param => {
//             if (param.type) {
//                 request[operation](param.name, param.type, param.value);
//             } else {
//                 request[operation](param.name, param.value);
//             }
//         });
//     });
// };
// const generateTable = (columns, entities) => {
//     const table = new mssql.Table();
//     columns.forEach(column => {
//         if (column && typeof column === 'object' && column.name && column.type) {
//             if (column.hasOwnProperty('options')) {
//                 table.columns.add(column.name, column.type, column.options);
//             } else {
//                 table.columns.add(column.name, column.type);
//             }
//         }
//     });
//     entities.forEach(entity => {
//         table.rows.add(...columns.map(i => entity[i.name]));
//     });
//     return table;
// };
// module.exports = {
//     "dataAccess" : dataAccess(),
//     generateTable
// };
