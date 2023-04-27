const {Router} = require('express');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const { rolApiPost, rolMetodoPost} = require('../controllers/apps');


const router = Router();

router.post('/:environment/api/:apiName',[
    check('apiName','El nombre de la api es obligatorio').not().isEmpty(),
    check('environment','El environment es obligatorio').not().isEmpty(),
    check('roles','El/los roles son obligatorios').not().isEmpty(),
    validarCampos
], rolApiPost);

router.post('/:environment/api/:apiName/metodo',[
    check('apiName','El nombre de la api es obligatorio').not().isEmpty(),
    check('metodo','El nombre del metodo es obligatorio').not().isEmpty(),
    check('environment','El environment es obligatorio').not().isEmpty(),
    check('roles','El/los roles son obligatorios').not().isEmpty(),
    validarCampos
], rolMetodoPost);

module.exports = router;