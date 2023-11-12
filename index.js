import express from 'express';

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
app.get('/cadastraUsuario.html', (requisicao, resposta) => {
    resposta.end(`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
        <title>Cadastro</title>
    </head>
    <body>
        <div class="container">
            <form action='/cadastraUsuario' method='GET' class="row g-3 needs-validation" novalidate>
                <fieldset class="border p-2">
                <legend class="mb-3">Cadastro de produtos</legend>
                <div class="col-md-4">
                  <label for="nome" class="form-label">Nome</label>
                  <input type="text" class="form-control" id="nome" name="nome"  required>
                  <div class="valid-feedback">
                    Por favor, informe o nome!
                  </div>
                </div>
    
                <div class="col-md-4">
                  <label for="preco" class="form-label">Preço</label>
                  <input type="text" class="form-control" id="preco" name="preco" required>
                  <div class="valid-feedback">
                    Por favor, informe o preço!
                  </div>
                </div>
    
                <div class="col-md-4">
                  <label for="codigo" class="form-label">Codigo</label>
                  <div class="input-group has-validation">
                    <input type="text" class="form-control" id="codigo" name="codigo" aria-describedby="inputGroupPrepend" required>
                    <div class="invalid-feedback">
                    Por favor, informe o codigo!
                    </div>
                  </div>
                </div>
    
                <div class="col-md-6">
                  <label for="descricao" class="form-label">Descrição</label>
                  <input type="text" class="form-control" id="descricao" name="descricao" required>
                  <div class="invalid-feedback">
                    Por favor, informe a Descrição!
                  </div>
                </div>
    
                <div class="col-md-3">
                  <label for="categoria" class="form-label">Categoria</label>
                  <select class="form-select" id="categoria" name="categoria">
                    <option selected disabled value="">Escolha um produto...</option>
                    <option value="Padaria">Padaria</option>
                    <option value="Carnes">Carnes</option>
                    <option value="Mercearia">Mercearia</option>
                    <option value="Matinais">Matinais</option>
                    <option value="Frios">Frios</option>
                    <option value="Laticínios">Laticínios</option>
                    <option value="Bebidas">Bebidas</option>
                    <option value="Ultidades domesticas">Ultidades domesticas</option>
                    <option value="Limpeza">Limpeza</option>
                    <option value="Higiene">Higiene</option>
                    <option value="Hortifruti">Horti-fruti</option>
                    <option value="Não Listado">Não listado</option>
                  </select>
                  <div class="invalid-feedback">
                    Por favor, informe a categoria!
                  </div>
                </div>
                
                <div class="col-12 mt-2">
                  <button class="btn btn-primary" type="submit" >Cadastrar</button>
                </div>
              </form>
            </fieldset>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous">
        </script>
        <script>
            (function() {
                'use strict'
                var forms = document.querySelectorAll('.needs-validation')
                const form = forms[0];
                form.addEventListener('submit', (event) => {
                    if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                    }
                form.classList.add('was-validated')
                 });
                })();
        </script>
    </body>
    </html>
    `)
})
app.get('/cadastraUsuario', processaCadastroUsuario)
app.listen(porta, host, () => {
    console.log(`Servidor executando na url http://${host}:${porta}`);
});



