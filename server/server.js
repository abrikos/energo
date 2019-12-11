const server = require ('@smartplatform/server');
const debug = require ('debug')('smartplatform:sakhaenergo:server');

// Запускать сервер если используется как скрипт
const startApp = (require.main === module);

const boot = module.exports = (callback) => {
    server ({
        appRootDir: __dirname,
        startApp,
    }, (app) => {
        callback && callback (app);
    });
};

startApp && boot ();
