const jwt = require('jsonwebtoken');
const config = require('../config/config');
const userSessionModel = require('../models/userSessionModel');
const User=require('../models/userModel');

function authorizeRoles(allowedRoleIds = []) {
    return async (req, res, next) => {
        // console.log(req.headers.authorization, allowedRoleIds);
        try {
            const token = req.headers.authorization?.split(' ')[1];
 
            if (!token) {
                return res.status(401).json({ message: 'No token provided' });
            }
 
            const decodedToken = jwt.verify(token, config.jwtSecret);
 
            // additionally checking for the expiry and adding to a blacklisted item
            // console.log(blacklist);
            if (decodedToken.exp < Date.now() / 1000) {
                return res.status(401).json({ message: 'Token has expired' });
            }
 
            const userRoleId = decodedToken.RoleID;
            if (!userRoleId) {
                return res.status(401).json({ message: 'Role not found in token' });
            }
 
            if (!allowedRoleIds.includes(userRoleId)) {
                return res.status(403).json({ message: 'Access forbidden: Insufficient permissions' });
            }
          
            req.user = decodedToken;
            // console.log(req.user);
            req.token = token;
            // console.log(decodedToken);
            next();
        } catch (error) {
            //console.error('JWT verification error:', error);
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token has expired' });
            } else if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: 'Invalid token' });
            } else {
                console.error('Authorization error:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }
        }
    };
}
 
 
function isPasswordChanged() {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
 
            if (!token) {
                return res.status(401).json({ message: 'No token provided' });
            }
 
            const decodedToken = jwt.verify(token, config.jwtSecret);
            const user=await User.findOne({where:{UserID:decodedToken.UserID}});
            if (user.PasswordChanged) {
                return next();
            }
            return res.status(403).json({ message: 'Access forbidden: User need to change the password.' });
 
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}
 
 
 
module.exports = { authorizeRoles, isPasswordChanged };
 
 
