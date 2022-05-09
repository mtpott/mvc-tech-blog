const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User } = require('../models');

//get all blog posts on home page