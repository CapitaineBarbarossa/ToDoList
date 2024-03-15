module.exports = (app) => {
    require('./user')(app)
    require('./todolist')(app)
}
