'use strict';
module.exports = function (app) {
    //const todoList = require('../controllers/todoListControllers'),
    const userHandlers = require('../controllers/userController');
    const paramValidation = require('../param-validator/param-validator');
    const validate = require('express-validation');
    // todoList Routes
    /* app.route('/tasks')
         .get(todoList.list_all_tasks)
         .post(userHandlers.loginRequired, todoList.create_a_task);
     
     app.route('/tasks/:taskId')
         .get(todoList.read_a_task)
         .put(todoList.update_a_task)
         .delete(todoList.delete_a_task);
 */
    app.route('/api/auth/register')
        .post(validate(paramValidation.register), userHandlers.register);

    app.route('/api/auth/sign_in')
        .post(validate(paramValidation.sign_in), userHandlers.sign_in);

    app.route('/api/auth/forgot_password')
        // .get(userHandlers.render_forgot_password_template)
        .post(validate(paramValidation.forgot_password), userHandlers.forgot_password);

    app.route('/api/auth/reset_password')
        // .get(userHandlers.render_reset_password_template)
        .post(validate(paramValidation.reset_password), userHandlers.reset_password);
    /*
    app.route('/api/auth/test')
        .post(userHandlers.loginRequired, validate(paramValidation.credential), userHandlers.test);
        */
};