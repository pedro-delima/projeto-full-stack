const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json())


const alunosRoutes = require('./routes/routesAlunos')
app.use('/api', alunosRoutes);

app.listen(port, () => {
  console.log(`Servidor está rodando na porta: http://localhost:${port}/api/`);
});




