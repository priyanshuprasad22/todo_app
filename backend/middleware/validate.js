const validateTask = (req, res, next) => {
    const { title, description, status, dueDate } = req.body;
    if (!title || !description || !status || !dueDate) {
        return res.status(400).send({ error: 'Title, description, status, and due date are required' });
    }
    next();
};


module.exports = validateTask;