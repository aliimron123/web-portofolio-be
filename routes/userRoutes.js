const express = require('express');
const { signUpUser, loginUser } = require('../controllers/authController');
const userController = require('../controllers/userController');
const protectedRoute = require('../controllers/partials/protectedController');
const router = express.Router();

// auth
router.route('/signup').post(signUpUser);
router.route('/login').post(loginUser);

// product
router
    .route('/')
    .get(userController.getAllUser)
    .post(userController.createUser);
router
    .route('/:id')
    .get(
        protectedRoute.protected,
        protectedRoute.protectRoleby('authorityAdmin'),
        userController.getUser
    )
    .patch(
        protectedRoute.protected,
        protectedRoute.protectRoleby('authorityAdmin'),
        userController.updateUser
    )
    .delete(
        protectedRoute.protected,
        protectedRoute.protectRoleby('authorityAdmin'),
        userController.deleteUser
    );

module.exports = router;
