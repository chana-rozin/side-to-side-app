
function getByIdQuery(table_name,column_name) {
    const query = `SELECT * FROM ${table_name} WHERE ${column_name} = ? `;
    return query
}


function getQuery(table_name) {
    const query = `SELECT * FROM ${table_name} `;
    return query
}

function deleteQuery(table_name,column_name) {
    const query = `DELETE FROM ${table_name} WHERE ${column_name} = ? `;
    return query
}

function updateQuery(table_name, column_name, columns , values) {
    const query = `UPDATE ${table_name} SET (${columns}) VALUES (${values}) WHERE ${column_name} = ? `;
    return query
}

function createQuery(table_name, columns , values) {
    const query = `INSERT INTO ${table_name} SET (${columns}) VALUES (${values})`;
    return query
}

export {getByIdQuery, getQuery, deleteQuery, updateQuery, createQuery }