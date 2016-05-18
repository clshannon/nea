var express     = require('express'),
    Bourne      = require('bourne'),
    bodyParser  = require('body-parser'),
    // Create new bourne data store
    db          = new Bourne('data.json'),
    // Create router object
    router      = express.Router();

router
    .use(function (req, res, next) {
        /*
        -TEMPORARY: req.user is placeholding for later when we add authentication
        -Later, req.user will be the object of the logged in user
        */
        if (!req.user) req.user = { id: 1};
        next();
    })
    // Used to parse request bodies
    .use(bodyParser.json())

    .route('/contact')
        // get method to handle GET requests
        .get(function (req, res) {
            // Find array of contacts where userId = that of the logged in user
            db.find({ userId: parseInt(req.user.id, 10) }, function (err, data) {
                // Return array of contacts
                res.json(data);
            });
        })

        // post method to handle POST requests
        .post(function (req, res) {
            // Set contact = data from POST request which will be inserted into the "db"
            var contact = req.body;
            // Set userId parameter to that of the logged in user; Contact "Owner".
            contact.userId = req.user.id;

            // Insert request data into "db"
            db.insert(contact, function (err, data) {
                // Responde with data
                res.json(data);
            });
        });

router
    // Express Middleware that will only run if one of the route's parameters is "id"
    .param('id', function (req, res, next) {
        // Add dbQuery to request object to be used later; prevent from re-writing code
        req.dbQuery = { id: parseInt(req.params.id, 10) }
        next();
    })
    .route('/contact/:id')
        .get(function (req, res) {
            db.findOne(req.dbQuery, function (err, data) {
                res.json(data);
            });
        })
        // Method to deal with PUT/update requests
        .put(function (req, res) {
            // Set contact equal to request object parameters
            var contact = req.body;
            // Remove parameters from request object which were automatically added by AngularJS on the frontend
            delete contact.$promise;
            delete contact.$resolved;

            db.update(req.dbQuery, contact, function (err, data) {
                res.json(data[0]);
            });
        })
        // Method to deal with DELETE requests
        .delete(function (req, res) {
            db.delete(req.dbQuery, function () {
                res.json(null);
            });
        });

module.exports = router;
