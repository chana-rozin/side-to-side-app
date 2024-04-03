
function getByIdQuery(table_name,condition, isSoftDeletedRecord = false) {
    let query;
    if(isSoftDeletedRecord)
        query = `SELECT * FROM ${table_name} WHERE ${condition} AND is_deleted = false`;
    else
        query = `SELECT * FROM ${table_name} WHERE ${condition}`;
    return query
}


function getQuery(table_name, isSoftDeleted = false, condition=true, limit = null) {
    console.log("get query")
    let query;
    if(isSoftDeleted)
        query = `SELECT * FROM ${table_name} WHERE ${condition} AND is_deleted = false`;
    else
        query = `SELECT * FROM ${table_name} WHERE ${condition}`;
    return query
}

function softDeleteQuery(table_name,column_name){
    const query = `UPDATE ${table_name} SET is_deleted = true WHERE ${column_name} = ? `;
    return query;
}

function deleteQuery(table_name,condition) {
    const query = ` DELETE FROM ${table_name} WHERE ${condition} `;
    return query
}

function updateQuery(table_name, condition, isSoftDeleted = false) {
    let query;
    if(isSoftDeleted)
        query = `UPDATE ${table_name} SET ${columns} WHERE ${condition} AND is_deleted = false`;
    else
        query = `UPDATE ${table_name} SET ${columns} WHERE ${condition}`;
    return query
}

function createQuery(table_name, columns , values) {
    const query = `INSERT INTO ${table_name} (${columns}) VALUES (${values})`;
    return query
}


function getByIdQuery(table_name,column_name, isSoftDeletedRecord = false) {
    let query;
    if(isSoftDeletedRecord)
        query = `SELECT * FROM ${table_name} WHERE ${column_name} = ? AND is_deleted = false`;
    else
        query = `SELECT * FROM ${table_name} WHERE ${column_name} = ?`;
    return query
}


function getQuery(table_name, isSoftDeleted = false, limit = null, ) {
    console.log("get query")
    // let query;
    // const limitClause = limit ? `limit ${limit}` : '';
    if(isSoftDeleted)
        query = `SELECT * FROM ${table_name} WHERE is_deleted = false`;
    else
        query = `SELECT * FROM ${table_name} `;
    return query
}

function softDeleteQuery(table_name,column_name){
    const query = `UPDATE ${table_name} SET is_deleted = true WHERE ${column_name} = ? `;
    return query;
}

function deleteQuery(table_name,column_name) {
    const query = ` DELETE FROM ${table_name} WHERE ${column_name} = ? `;
    return query
}

function updateQuery(table_name, column_name, columns, isSoftDeleted = false) {
    let query;
    if(isSoftDeleted)
        query = `UPDATE ${table_name} SET ${columns} WHERE ${column_name} = ? AND is_deleted = false`;
    else
        query = `UPDATE ${table_name} SET ${columns} WHERE ${column_name} = ?`;
    return query
}

function createQuery(table_name, columns , values) {
    const query = `INSERT INTO ${table_name} (${columns}) VALUES (${values})`;
    return query
}

