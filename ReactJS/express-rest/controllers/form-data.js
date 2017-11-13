module.exports = {
    get: (req, res) => {
        res.json({data: 'hello'});
    },
    post: (req, res) => {
        console.log('Received data:');
        console.log(req.body.data);
        res.end();
    }
};