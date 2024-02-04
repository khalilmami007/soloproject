const authController=require("../controllers/auth.controller");
const verifyToken=require("../middlewares/authMiddleware");

module.exports=(app)=>{

    app.post('/api/register',authController.register);
    app.post('/api/login',authController.login);
    app.post('/api/logout',authController.logout);
    app.get('/api/currentUser',verifyToken, authController.getCurrentUser);
}