module.exports = (app) => {
    app.get('', (req, res) => {
        res.status(200).json({content: 'Freelance Flow API'})
    });
}