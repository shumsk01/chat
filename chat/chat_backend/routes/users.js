const router = require('express').Router();
let User = require('../models/user.model');


// Creating Users
router.route('/create').post((req, res) => {
    const username = req.body.username;
    
    const newUser = new User({username});

    newUser.save()
    .then(() => res.json('User Added'))
    .catch(err => res.status(400).json('Error: ' + err));
});

/* 
-- Reading user information --
 : / gives back all the users
 : /ID/<username> gives back a specific users ID
 : /<userID> gives back all the information for a user with a specific ID
 */
router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/ID/:username').get((req, res) => {
    User.find({username: req.params.username},{_id: 1})
    .then(userID => res.json(userID))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:userID').get((req, res) => {
    User.findById(req.params.userID)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

/*
-- Updating user information --
: /update/<userID> changes the username to the provided username using ID
*/
router.route('/update/:userID').post((req, res) => {
    User.findById(req.params.userID)
    .then(user => {
        user.username = req.body.username;
        
        user.save()
        .then(() => res.json('Exercise Updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));    
    
});

/*
-- Deleting users --
: This permanently deletes users. Use with caution
*/
router.route('/:userID').delete((req, res) => {
    User.findByIdAndDelete(req.params.userID)
    .then(() => res.json('User Deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;