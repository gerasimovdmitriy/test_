const db = require('../db/db');

async function getUserByEmail(email) {
    let res = null;
    try {
        let { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);

        if (rows.length > 0) {
            res = rows[0];
        }

        return [res, null];
    } catch (e) {
        console.error('GET USER ERROR:' + e)
        return [null, e];
    }
}

async function createUser(email, password) {
    try {
        await db.query('INSERT INTO public.users\n' +
            '(email, password)\n' +
            'VALUES($1, $2);', [email, password]);
        return [true, null];
    } catch (e) {
        console.error('CREATE USER ERROR:' + e)
        return [false, e];
    }
}

async function updateUserPassword(email, password) {
    try {
        await db.query(`
        UPDATE public.users
        SET  password=$2, "updatedAt"=CURRENT_TIMESTAMP
        WHERE email = $1;`, [email, password]);
        return [true, null];
    } catch (e) {
        console.error('UPDATE USER PASSWORD ERROR:' + e)
        return [false, e];
    }
}

module.exports = {
    getUserByEmail,
    createUser,
    updateUserPassword
}