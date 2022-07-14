var express = require('express');
var router = express.Router();

/* GET go to logout page. */
router.get('/', (req, res) => {

    res.clearCookie('idUser')
    
    res.render('logout', 
        { 
            title: 'Sesion Cerrada', 
            isWithInterface: false
        }
    );
});

module.exports = router;