import express from 'express';
import path from 'path';0


const porta = 3000;
const host = 'localhost';
var listaUsuarios = [];

function processaCadastroUsuario(requisicao, resposta){
    //processar os parametros da url em http://http://localhost:3000/paginas/cadastraUsuario.html?nome=Julia&sobrenome=Redressa&nomeUsuario=juliaredressa&cidade=Presidente+Prudente&uf=SP&cep=190-50000
    const usuario = {
                nome : requisicao.query.nome,
                preco : requisicao.query.preco,
                codigo : requisicao.query.codigo,
                descricao : requisicao.query.descricao,
                categoria : requisicao.query.categoria,
                cep : requisicao.query.cep
                }
    //adicionar um novo usuario na lista de usuarios já cadastrados
    listaUsuarios.push(usuario);
    //retornar lista de usuarios
    
    let conteudoDaResposta = `
                <!DOCTYPE html>
                <html lang="pt-br">
                <head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
                <title>Menu do sistema</title>
                </head>
                <body>
                    <h1>Lista de usuarios cadastrados</h1>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Preço</th>
                                <th>Codigo</th>
                                <th>Descrição</th>
                                <th>Categoria</th>
                            </tr>
                        </thead>
                        <tbody>`;
        
        for (const usuario of listaUsuarios){
            conteudoDaResposta += `
                                    <tr>
                                        <td>${usuario.nome}</td>
                                        <td>${usuario.preco}</td>
                                        <td>${usuario.codigo}</td>
                                        <td>${usuario.descricao}</td>
                                        <td>${usuario.categoria}</td>
                                    </tr>
                                `;
        }

        conteudoDaResposta+=`
                                </tbody>
                            </table>
                            <a class="btn btn-primary" href="/" role="button">Voltar ao menu</a>
                            <a class="btn btn-primary" href="/cadastraUsuario.html" role="button">Continuar cadastrando</a>

                            </body>
                            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous">
                            </script>
                            <html>
                            `
    resposta.end(conteudoDaResposta);
}

const app = express();

//indicando para a aplicação como servir arquivos estaticos localizados na pasta 'paginas'
app.use(express.static('./paginas'));

app.get('/', (requisicao, resposta) => {
    resposta.end(`
            <!DOCTYPE html>
                <html lang="pt-br">
            <head>
                <title>Cadastro de produtos</title>
            </head>
            <body>
                <h1>MENU</h1>
                <ul>
                    <li><a href="/cadastraUsuario.html">Cadastrar produtos</a></li>
                </ul>
            </body>
            </html>
    `)
})
app.get('/cadastraUsuario', processaCadastroUsuario)
app.listen(porta, host, () => {
    console.log(`Servidor executando na url http://${host}:${porta}`);
});



