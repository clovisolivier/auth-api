const config = require('./config'),

    port = process.env.PORT,
    Task = require('./server/api/models/todoListModel'),
    User = require('./server/api/models/userModel'),
    logger = require('./logger'),
    app = require('./server/config/express');


require('./server/config/mongo')(config.db);

// Swagger doc
/*app.use(express.static(path.join(appRoot.path, 'swagger')));
app.get('*', (req, res) => {
    res.sendFile(path.join(appRoot.path, 'swagger/index.html'));
  });*/

/*
app.use(express.static(path.join(appRoot.path, 'swagger')));
app.get('/swagger', (req, res) => {
    res.sendFile(path.join(appRoot.path, 'swagger/index.html'));
  });

logger.info('Swagger API running!');
*/

app.listen(port);

logger.info('Authentication API server started on : ' + port);

module.exports = app;