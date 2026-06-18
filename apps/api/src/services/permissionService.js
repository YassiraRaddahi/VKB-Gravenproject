function getPermissionsByRole(conn_db, roleId) {

    return new Promise((resolve, reject) => {
        const permissionSql = `
            SELECT permissions.name
            FROM permission_role
            JOIN permissions ON permission_role.permission_id = permissions.id
            WHERE permission_role.role_id = ?
        `;

        conn_db.query(permissionSql, [roleId], (err, permissionRows) => {
            if (err) {
                return reject(err);
            }

            if (!permissionRows || permissionRows.length === 0) {
                return reject(new Error("Geen rechten toegewezen"));
            }

            resolve(permissionRows.map(row => row.name));
        });
    });
}

module.exports = {getPermissionsByRole};
