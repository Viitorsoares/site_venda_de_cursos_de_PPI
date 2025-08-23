import express from 'express';
import session from 'express-session';
import verificarAutenticacao from './security/authenticate.js';

const app = express();
const porta = 3000;
const host = 'localhost'; //permite acesso à aplicação vindas de todas as interfaces de rede

//configurar o servidor para usar o express-session
app.use(session({
    secret: 'meuS3gr3d0',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 15 //15 minutos
    }
}));

app.use(express.urlencoded({extended: true})); //configura o middleware para aceitar o corpo da requisição em um formato URL-encoded

app.post('/login', (requisicao, resposta) => {
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;
    
    if (usuario == 'admin' && senha == 'admin') {
        requisicao.session.autenticado = true;
        resposta.redirect('/menu.html');
    }
    else {
        resposta.send("<span>Usuário ou senha inválidos!</span> <a href='/login.html'>Tentar novamente</a>");
    }
    
});


app.get("/logout", (requisicao, resposta) => {
    requisicao.session.destroy();
    resposta.redirect('/login.html');
});

//configura o servidor para servir arquivos estáticos
app.use(express.static('public'));

//middleware - verificarAutenticacao
app.use(verificarAutenticacao, express.static('private'));

app.listen(porta, host, () => {
    console.log(`Servidor em execução em http://${host}:${porta}`);   //`` template literals
});