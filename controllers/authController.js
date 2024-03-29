const userService = require('../services/userService');
const passwordUtils = require('../utils/password');

async function login(req, res) {
    try {
        let body = req.body;
        let message = 'OK';

        if (!body.email || !body.password) {
            message = 'Не передано имя пользователя или пароль';
            return res.status(400).send(message);
        }

        let [getUserRes, getUserError] = await userService.getUserByEmail(body.email)

        if (getUserError) {
            message = getUserError;
            return res.status(500).send(message);
        }

        if (!getUserRes) {
            message = 'Не удалось авторизоваться. Проверьте емейл или пароль';
            return res.status(400).send(message);
        }

        if (!await passwordUtils.comparePassword(body.password, getUserRes.password)) {
            message = 'Не удалось авторизоваться. Проверьте емейл или пароль';
            return res.status(400).send(message);
        }

        req.session.email = req.body.email;

        return res.send(message);
    } catch (e) {
        console.log(e)
        return res.status(500).send(e||e.message);
    }
}

async function registration(req, res) {
    try {
        let message = 'OK';
        let body = req.body;

        if (!body.email || !body.password) {
            message = 'Не переданы обязательные параметры';
            return res.status(400).send(message);
        }

        let [getUserRes, getUserError] = await userService.getUserByEmail(body.email);

        if (getUserError) {
            message = getUserError;
            return res.status(500).send(message);
        }

        if (getUserRes) {
            message = 'Пользователь уже существует';
            return res.status(400).send(message);
        }

        let [createUserRes, createUserError] = await userService.createUser(body.email, passwordUtils.getHash(body.password).hash);

        if (createUserError) {
            message = createUserError;
            res.status(500);
        }

        return res.send(message);
    } catch (e) {
        return res.status(500).send(e);
    }
}

async function logout(req, res) {
    try {
        req.session.destroy();
        return res.send('OK');
    } catch (e) {
        return res.status(500).send(e);
    }

}

async function refreshPassword(req, res) {
    try {
        let body = req.body;
        let message = 'OK';

        if (!body.password) {
            message = 'Не передан новый пароль';
            return res.status(400).send(message);
        }

        let sess = req.session;
        let [getUserRes, getUserError] = await userService.getUserByEmail(sess.email);

        if (getUserError) {
            message = getUserError;
            return res.status(500).send(message);
        }
        if (!getUserRes) {
            message = 'Пользователь не найден';
            return res.status(400).send(message);
        }

        let [updateUserRes, updateUserError] = await userService.updateUserPassword(sess.email, passwordUtils.getHash(body.password).hash);

        if (updateUserError) {
            message = updateUserError;
            return res.status(500).send(message);
        }
        return res.send(message);
    } catch (e) {
        return res.status(500).send(e);
    }

}

module.exports = {
    registration,
    login,
    logout,
    refreshPassword
}