// middleware/role.js
module.exports = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      console.log('No user or role found on request');
      return res.status(403).json({ msg: 'Access denied' });
    }

    const userRole = req.user.role;
    console.log('User Role:', userRole);
    console.log('Allowed Roles:', allowedRoles);

    if (!allowedRoles.includes(userRole)) {
      console.log('User role not allowed');
      return res.status(403).json({ msg: 'Access denied' });
    }
    next();
  };
};
