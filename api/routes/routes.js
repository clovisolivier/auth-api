'use strict';
module.exports = function(app){
    //const todoList = require('../controllers/todoListControllers'),
    const userHandlers = require('../controllers/userController');

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
        .post(userHandlers.register);

    app.route('/api/auth/sign_in')
        .post(userHandlers.sign_in);

    app.route('/api/auth/forgot_password')
       // .get(userHandlers.render_forgot_password_template)
        .post(userHandlers.forgot_password);

    app.route('/api/auth/reset_password')
       // .get(userHandlers.render_reset_password_template)
        .post(userHandlers.reset_password);
};