const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController');

const router = Router();

/** CRUD de Pessoas */
router.get('/pessoas', PessoaController.pegaTodasAsPessoas);
router.get('/pessoas/ativas', PessoaController.pegaPessoasAtivas);
router.get('/pessoas/:id', PessoaController.pegaUmaPessoa);
router.post('/pessoas', PessoaController.criaPessoa);
router.put('/pessoas/:id', PessoaController.atualizaPessoa);
router.delete('/pessoas/:id', PessoaController.apagaPessoa);

/** CRUD de Matricula de Pessoa */
router.get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.pegaUmaMatricula);
router.post('/pessoas/:estudanteId/matricula', PessoaController.criaMatricula);
router.put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.atualizaMatricula);
router.delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.apagaMatricula);

/** NAO CRUDs */
router.post('/pessoas/:id/restaura', PessoaController.restauraPessoa);
router.post('/pessoas/:estudanteId/matriculas/:matriculaId/restaura', PessoaController.restauraMatricula);
router.get('/pessoas/:estudanteId/matriculas', PessoaController.pegaMatriculas);
router.get('/pessoas/matricula/:turmaId/confirmadas', PessoaController.pegaMatriculasPorTurma);
router.get('/pessoas/matricula/lotadas', PessoaController.pegaTurmasLotadas);
router.post('/pessoas/:estudanteId/cancela', PessoaController.cancelaPessoa);

module.exports = router;