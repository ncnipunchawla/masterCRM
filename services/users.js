'use strict';

const Client = require('../models/clients');
const User = require('../models/users');
const md5 = require('md5');
const authenticate = require('./authentication');
const mongoose = require('mongoose');

function handleAuthentication(email, password, ip) {
    return User.findOne({"email": email}).exec().then(user => {
        if(!user) {
            return {
                'status': 401,
                'data': 'Incorrect email and password combination. Please try again.'
            }
        }
        return authenticateUser(email, password).then(user_data => {
            if (!user_data) {
                return {
                    'status': 401,
                    'data': 'Incorrect email and password combination. Please try again.'
                }
            }
            if (user_data.enabled != '1') {
                return {
                    'status': 401,
                    'data': 'Your account has been disabled.'
                };
            }
            return authenticate.generateToken(user_data.id, user_data.name, user_data.email, user_data.client_id, user_data.role).then(function (token) {
                delete user_data.password;
                return {
                    'status': 200,
                    'data': {
                        'profile': user_data,
                        'token': token
                    }
                }
            });
        });
    });
}

function authenticateUser(email, password) {
    const salt = process.env.AUTH_SALT;
    const encrypted_password = md5(password + salt);
    return User.findOne({"email": email, "password": encrypted_password}).exec().then(user => {
        return user;
    });
}

function setPassword(email, password) {
    password = md5(password + process.env.AUTH_SALT);
    return db('users').where('email', email).update({
        'password': md5(password + process.env.AUTH_SALT)
    }).then(function () {
        return {
            'message': 'Password Changed Successfully'
        };
    });
}

module.exports = {
    handleAuthentication,
    setPassword
}