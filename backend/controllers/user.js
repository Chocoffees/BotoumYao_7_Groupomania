// Allow users to access to app

// Import bcrypt: hash password > securely store user password
const bcrypt = require('bcrypt');
// Secure API access (->informations<-) -> authentication by token
const jwt = require('jsonwebtoken');
require('dotenv').config()
// Import models created 
const models = require('../models');

// Register new user in database: use signup function
exports.signup = (req, res) => {

    // Define params (= table users)
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    const service = req.body.service;
    const avatar = req.body.avatar;
    const admin = req.body.admin;

    // Search if user email already exists in database: use findOne() method
    models.User.findOne({ 
        where: { email: email }
    })
        .then(user => {
            if (!user) {  // if can not find user
                return res.status(404).json({ error: 'Email not registered in database' });
            }
            else {
                bcrypt.hash(password, 10)  // call of the bcrypt hash function

                    // create and register the new user in database (return res success/failure)
                    .then(hash => {
                        const newUser = models.User.create({
                            email: email,
                            password: hash,
                            username: username,
                            service: service,
                            avatar: avatar,
                            admin: 0
                        });
                        newUser.save()
                            .then(() => res.status(201).json({ message: 'User created with success!', 'iduser': newUser.id }))
                            .catch(error => {
                                console.log(error)
                                res.status(400).json({ error })
                            });
                    })
                    .catch(error => {
                        console.log(error)
                        res.status(500).json({ error: 'Email check failed' })
                    });
            };

        }).catch(error => {
            console.log(error)
            res.status(500).json({ error: 'Email check failed' })
        });
    }

// Connect user to app: use login function to check user informations
// > Permit connection
exports.login = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    // Search user in database: use findOne() method
    models.User.findOne({
        where: { email: email }
    })
    .then(user => {
        if (!user) {  // if can not find user
          return res.status(401).json({ error: 'User not found in database' });
        }
        // Compare password in database with the one entered by user > use compare() method
        bcrypt.compare(req.body.password, user.password)
          .then(valid => { // return boolean (comparison correct or not)
            if (!valid) { // invalid password entered
              return res.status(401).json({ error: 'Password invalid' });
            }
            res.status(200).json({ // return JSON obj which will contain 1 user.id
              'iduser': user.id,
              // Allow user connection with encrypted token 
              token: jwt.sign( // encode new token: use sign()
                  { iduser: user.id },
                  process.env.RANDOM_TOKEN_SECRET, // long random string
                  { expiresIn: '1h' } // configuration > apply access token expiration delay
                )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};
