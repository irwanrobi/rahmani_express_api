const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers.authorization; 

    if(token){ //jika ada token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { //jwt melakukan verify
          if (err) { // apa bila ada error
            res.json({
              success: false, 
              status: 422,
              message: 'Failed to authenticate token'
            }); // jwt melakukan respon
          } else { // apa bila tidak error
            req.decoded = decoded; // menyimpan decoded ke req.decoded
            next(); //melajutkan proses
          }
        });
    } else { // apa bila tidak ada token
        return res.status(403).send({
          success: false, 
          status: 422,
          message: 'No token provided.'
        }); // melkukan respon kalau token tidak ada
    }
}

module.exports = { isAuthenticated };



