async function checkSession (req, res, next) {
    let sess = req.session;

    if (!sess.email) {
        return res.status(401).send('Unauthorized');
    }
    next();
};

module.exports = {
    checkSession
}