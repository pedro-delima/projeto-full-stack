// Arquivo com as rotas da aplicação

//rota GET que lista os alunos através do Prisma em formato JSON



const express = require('express');
const router = express.Router(); // Criamos um router separado
const { PrismaClient } = require('../../models/generated/prisma')
const prisma = new PrismaClient();





router.get('/',async (req, res) => {
    try {
        const alunos = await prisma.Aluno.findMany();
        res.json(alunos);
    }
    catch (error) {
        console.error('Erro ao buscar alunos:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
})


// Rota PUT que atualiza um aluno existente com a condição de que todos os campos sejam não nulos
router.put('/alunos/:id', async (req, res) => {
    const {id, nome, email, idade} = req.body;
    try {
        if (!id || !nome || !email || !idade) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }
        const updatedAluno = await prisma.Aluno.update({
            where: { id: parseInt(req.params.id) },
            data: {
                id: parseInt(id),
                nome,
                email,
                idade: parseInt(idade)
            }
        });

        res.json(updatedAluno);
    } catch (error) {
        console.error('Erro ao atualizar aluno:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }

})


// Rota POST que cria um novo aluno através do Prisma com a condição de que todos os campos sejam não nulos
router.post('/alunos', async (req, res) => {
    const {id, nome, email, idade} = req.body;
    try {
        if (!id || !nome || !email || !idade) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }
        
        const novoAluno = await prisma.Aluno.create({
        data: {
            id: parseInt(id),
            nome,
            email,
            idade: parseInt(idade)
        }
    })
        res.status(201).json(novoAluno);
    } catch (error) {
        console.log(`Erro ao adicionar aluno, ${error}`)
    }
})
//rota DELETE que apaga o aluno por meio do id fornecido
router.delete('/alunos/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const deletedAluno = await prisma.Aluno.delete({
            where: {id: id}
        })
        
        res.status(204).send(`O aluno com id ${id} foi deletado`);
    }
    catch (error) {
        console.log(`Erro ao deletar aluno, ${error}`)
    }
})

module.exports = router;
