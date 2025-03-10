const { signup, login } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');
const ensureAuthenticated = require('../Middlewares/Auth');
const User = require("../Models/User");

const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);

router.get('/user', ensureAuthenticated, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user._id).select('-password'); // No devolver la contraseña
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }
        res.json({ success: true, user });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', success: false });
    }
});

router.get("/users", ensureAuthenticated, async (req, res) => {
    try {
      const users = await User.find({}, "name email"); // Obtiene solo nombre y email
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los usuarios" });
    }
  });

module.exports = router;