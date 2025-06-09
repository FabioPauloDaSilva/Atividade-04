import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";

const host="0.0.0.0";
const port=7000;
var listaUsuarios=[];
var listaProdutos=[];
const app=express();

app.use(express.urlencoded({extended:true}));

app.use(session(
    {
        secret:"ChaviadoDoSegredo",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge:1000*60*15,
            httpOnly:true,
            secure:false
        }

    }
));

app.use(cookieParser());

app.get("/",vAutenticacao,(requisicao,resposta)=>{
    const ultimoLogin=requisicao.cookies.ultimoLogin;
    resposta.send(`
    <!DOCTYPE html>
<html lang="pt-br">
  <head>
    <!-- Meta tags Obrigatórias -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

    <title>Atividade 4</title>
  </head>
  <body>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
      <a class="navbar-brand" href="#">Menu</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
              <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-expanded="false">
                      Cadastros
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                      <li><a class="dropdown-item" href="/cadastroUsuario">Cadastro de Usuários</a></li>
                      <li><hr class="dropdown-divider"></li>
                      <li><a class="dropdown-item" href="/cadastroProduto">Cadastro de Produtos</a></li>
                      <li><hr class="dropdown-divider"></li>
                      <li><a class="dropdown-item" href="#">Cadastro de Clientes</a></li>
                      <li><hr class="dropdown-divider"></li>
                      <li><a class="dropdown-item" href="#">Cadastro de Fornecedores</a></li>
                  </ul>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="/logout">Sair</a>
              </li>
          </ul>
          <span class="navbar-text">${ultimoLogin?"Ultimo login: " + ultimoLogin:""}</span>
      </div>
  </div>
  </nav>



    <!-- JavaScript (Opcional) -->
    <!-- jQuery primeiro, depois Popper.js, depois Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
  </body>
</html>



    `);
    resposta.end();
});

app.get("/cadastroUsuario",vAutenticacao,(requisicao,resposta)=>
{
resposta.send(
`
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
    <title>Página inicial do aplicativo</title>
</head>
<body>
    <div class="container w-75 mb-5 mt-5">
        <form method="POST" action="/cadastroUsuario" class="row g-3 border p-2" novalidate>
            <fieldset>
                <legend class="text-center">Cadastro de Usuários</legend>
            </fieldset>
            <div class="col-md-4">
                <label for="nome" class="form-label">Primeiro nome</label>
                <input type="text" class="form-control" id="nome" name="nome" required>
            </div>
            <div class="col-md-4">
                <label for="sobrenome" class="form-label">Sobrenome</label>
                <input type="text" class="form-control" id="sobrenome" name="sobrenome" required>
            </div>
            <div class="col-md-4">
                <label for="nomeUsuario" class="form-label">Nome do usuário:</label>
                <div class="input-group has-validation">
                    <span class="input-group-text" id="inputGroupPrepend">@</span>
                    <input type="text" class="form-control" id="nomeUsuario" name="nomeUsuario" aria-describedby="inputGroupPrepend" required>
                </div>
            </div>
            <div class="col-md-6">
                <label for="cidade" class="form-label">Cidade</label>
                <input type="text" class="form-control" id="cidade" name="cidade" required>
            </div>
            <div class="col-md-3">
                <label for="uf" class="form-label">UF</label>
                <select class="form-select" id="uf" name="uf" required>
                    <option selected disabled value="">Escolha um estado...</option>
                    <option>SP</option>
                    <option>RJ</option>
                    <option>PR</option>
                </select>
            </div>
            <div class="col-md-3">
                <label for="cep" class="form-label">CEP</label>
                <input type="text" class="form-control" id="cep" name="cep" required>
            </div>
            <div class="col-12">
                <button class="btn btn-primary" type="submit">Cadastrar</button>
                <a class="btn btn-secondary" href="/">Voltar</a>
            </div>
        </form>
    </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
</html>

    `);
    resposta.end();

});

app.post("/cadastroUsuario",vAutenticacao,(requisicao,resposta)=>{
const nome=requisicao.body.nome;
const sobrenome=requisicao.body.sobrenome;
const nomeUsuario=requisicao.body.nomeUsuario;
const cidade=requisicao.body.cidade;
const uf=requisicao.body.uf;
const cep=requisicao.body.cep;


if (nome && sobrenome && nomeUsuario && cidade && uf && cep) {
    listaUsuarios.push({
        nome: nome,
        sobrenome: sobrenome,
        nomeUsuario: nomeUsuario,
        cidade: cidade,
        uf: uf,
        cep: cep
    });
    resposta.redirect("/listaUsuarios");
}
  else{
    let conteudo = `
    <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
                <title>Página inicial do aplicativo</title>
            </head>
            <body>
                <div class="container w-75 mb-5 mt-5">
                    <form method="POST" action="/cadastroUsuario" class="row g-3 border p-2" novalidate>
                        <fieldset>
                            <legend class="text-center">Cadastro de Usuários</legend>
                        </fieldset>
                        <div class="col-md-4"> `;
    if (!nome) {
        conteudo = conteudo + `
                            <label for="nome" class="form-label">Primeiro nome</label>
                            <input type="text" class="form-control" id="nome" name="nome" required>
                            <span class="text-danger">Por favor informe o nome</span>`;
    }
    else {
        conteudo = conteudo + `
                            <label for="nome" class="form-label">Primeiro nome</label>
                            <input type="text" class="form-control" id="nome" name="nome" value="${nome}" required>
                            `;
    }

    conteudo = conteudo + `</div>
                        <div class="col-md-4"> `;
    if (!sobrenome) {
        conteudo = conteudo + `
                                <label for="sobrenome" class="form-label">Sobrenome</label>
                                <input type="text" class="form-control" id="sobrenome" name="sobrenome"  required>                                
                                <span class="text-danger">Por favor informe o sobrenome</span>`;
    }
    else {
        conteudo = conteudo + `
                                <label for="sobrenome" class="form-label">Sobrenome</label>
                                <input type="text" class="form-control" id="sobrenome" name="sobrnome" value="${sobrenome}" required>
                                `;
    }

    conteudo = conteudo + `</div>
                        <div class="col-md-4">
                            <label for="nomeUsuario" class="form-label">Nome do usuário:</label>
                            <div class="input-group"> `;
    if (!nomeUsuario) {
        conteudo = conteudo + `
                                <span class="input-group-text" id="inputGroupPrepend">@</span>
                                <input type="text" class="form-control" id="nomeUsuario" name="nomeUsuario" aria-describedby="inputGroupPrepend" required>
                                <span class="text-danger">Por favor informe a credencial nomeUsuario!</span>`;
    }
    else {
        conteudo = conteudo + `          
                                <span class="input-group-text" id="inputGroupPrepend">@</span>
                                <input type="text" class="form-control" id="nomeUsuario" name="nomeUsuario" value="${nomeUsuario}" aria-describedby="inputGroupPrepend" required>`;
    }
    conteudo = conteudo + `
                            </div>
                        </div>
                        <div class="col-md-6"> `;
    if (!cidade) {
        conteudo = conteudo +
            `<label for="cidade" class="form-label">Cidade</label>
                                 <input type="text" class="form-control" id="cidade" name="cidade" required>
                                 <span class="text-danger">Por favor informe a cidade!</span>`;
    }
    else {
        conteudo = conteudo + `
                            <label for="cidade" class="form-label">Cidade</label>
                            <input type="text" class="form-control" id="cidade" name="cidade" value="${cidade}" required>`;
    }

    conteudo = conteudo + `
                        </div>
                        <div class="col-md-3">
                            <label for="uf" class="form-label">UF</label>`;
    if (!uf) {
        conteudo = conteudo + `
                            <select class="form-select" id="uf" name="uf" required>
                                <option selected disabled value="">Escolha um estado...</option>
                                <option value="SP">SP</option>
                                <option value="RJ">RJ</option>
                                <option value="PR">PR</option>
                            </select>`;
    }
    else {
        conteudo = conteudo + `
                            <select class="form-select" id="uf" name="uf" required>
                                <option disabled value="">Escolha um estado...</option>
                                <option ${uf == 'SP' ? 'selected' : ''} value="SP">SP</option>
                                <option ${uf == 'RJ' ? 'selected' : ''} value="RJ">RJ</option>
                                <option ${uf == 'PR' ? 'selected' : ''} value="PR">PR</option>
                            </select>
        `;
    }
    conteudo = conteudo + `
                        </div>
                        <div class="col-md-3">
                            <label for="cep" class="form-label">CEP</label>`;
    if (!cep) {
        conteudo = conteudo + `
                            <input type="text" class="form-control" id="cep" name="cep" required>
                            <span class="text-danger">Por favor informe o cep!</span>`;
    }
    else {
        conteudo = conteudo + `
                            <input type="text" class="form-control" id="cep" name="cep" value=${cep} required>
        `;
    }
    conteudo = conteudo + `
                        </div>
                        <div class="col-12">
                            <button class="btn btn-primary" type="submit">Cadastrar</button>
                            <a class="btn btn-secondary" href="/">Voltar</a>
                        </div>
                    </form>
                </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
        </html>`;
    resposta.send(conteudo);
    resposta.end();

  }

});

app.get("/listaUsuarios", vAutenticacao,(requisicao, resposta) => {
    let conteudo = `
            <html lang="pt-br">
                <head>
                    <meta charset="UTF-8">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
                    <title>Página inicial do aplicativo</title>
                </head>
                <body>
                    <div class="container w-75 mb-5 mt-5">
                        <table class="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Sobrenome</th>
                                    <th scope="col">Nome do usuário</th>
                                    <th scope="col">Cidade</th>
                                    <th scope="col">UF</th>
                                    <th scope="col">CEP</th>
                                </tr>
                            </thead>
                            <tbody> `;
    for (let i = 0; i < listaUsuarios.length; i++) {
        conteudo = conteudo + `
                                    <tr>
                                        <td>${listaUsuarios[i].nome}</td>
                                        <td>${listaUsuarios[i].sobrenome}</td>
                                        <td>${listaUsuarios[i].nomeUsuario}</td>
                                        <td>${listaUsuarios[i].cidade}</td>
                                        <td>${listaUsuarios[i].uf}</td>
                                        <td>${listaUsuarios[i].cep}</td>
                                    </tr>
                                `;
    }

    conteudo = conteudo + ` </tbody>
                        </table>
                        <a class="btn btn-secondary" href="/cadastroUsuario">Continuar cadastrando...</a>
                    </div>
                </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
            </html>`
    resposta.send(conteudo);
    resposta.end();
});

app.get("/login", (requisicao, resposta) => {
    resposta.send(`
    <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
            <title>Login do Sistema</title>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    background-color: #17a2b8;
                    height: 100vh;
                }
                #login .container #login-row #login-column #login-box {
                    margin-top: 120px;
                    max-width: 600px;
                    height: 320px;
                    border: 1px solid #9C9C9C;
                    background-color: #EAEAEA;
                }
                #login .container #login-row #login-column #login-box #login-form {
                    padding: 20px;
                }
                #login .container #login-row #login-column #login-box #login-form #register-link {
                    margin-top: -85px;
                }
            </style>
        </head>
        <body>
            <div id="login">
                <h3 class="text-center text-white pt-5">Acessar o Sistema</h3>
                <div class="container">
                    <div id="login-row" class="row justify-content-center align-items-center">
                        <div id="login-column" class="col-md-6">
                            <div id="login-box" class="col-md-12">
                                <form id="login-form" class="form" action="/login" method="post">
                                    <h3 class="text-center text-info">Login</h3>
                                    <div class="form-group">
                                        <label for="usuario" class="text-info">Usuário:</label><br>
                                        <input type="text" name="usuario" id="usuario" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label for="senha" class="text-info">Senha:</label><br>
                                        <input type="password" name="senha" id="senha" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <input type="submit" name="submit" class="btn btn-info btn-md" value="Entrar">
                                   </div>
                            </form>
                           </div>
                      </div>
                  </div>
             </div>
            </div>
        </body>
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    </html>
    `);
});

app.get("/cadastroProduto",vAutenticacao,(requisicao,resposta)=>{
    const ultimoLogin = requisicao.cookies.ultimoLogin;
    const nomeUsuario = requisicao.session.usuario;
  
    let tabela = "";
  
    if (listaProdutos.length > 0) {
      tabela = `
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Código</th>
              <th>Descrição</th>
              <th>Preço de Custo</th>
              <th>Preço de Venda</th>
              <th>Data de Validade</th>
              <th>Quantidade</th>
              <th>Fabricante</th>
            </tr>
          </thead>
          <tbody>
      `;
  
      for (let i = 0; i < listaProdutos.length; i++) {
        const prod = listaProdutos[i];
        tabela += `
          <tr>
            <td>${prod.codigo}</td>
            <td>${prod.descricao}</td>
            <td>${prod.precoCusto}</td>
            <td>${prod.precoVenda}</td>
            <td>${prod.validade}</td>
            <td>${prod.quantidade}</td>
            <td>${prod.fabricante}</td>
          </tr>
        `;
      }
  
      tabela += `
          </tbody>
        </table>
      `;
    }
  
    resposta.send(`
      <html lang="pt-br">
        <head>
          <meta charset="UTF-8" />
          <title>Cadastro de Produtos</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" />

          <style>
          body{
            background-color: blue;
            color: white;
        }
        form{
        background-color: white;
        color: black;
        }
        form td{
            background-color: white; 
            border: 1px solid #ccc;
           }


          </style>
        </head>
        <body class="container mt-5">
          <h3>Bem-vindo, ${nomeUsuario || "usuário"}!</h3>
          <p><strong>Último acesso:</strong> ${ultimoLogin || "nunca"}</p>
  
          <form method="POST" action="/cadastroProduto" class="border p-4 rounded">
            <h4>Cadastro de Produto</h4>
  
            <div class="mb-3">
              <label class="form-label">Código:</label>
              <input class="form-control" type="text" name="codigo" required />
            </div>
  
            <div class="mb-3">
              <label class="form-label">Descrição:</label>
              <input class="form-control" type="text" name="descricao" required />
            </div>
  
            <div class="mb-3">
              <label class="form-label">Preço de Custo:</label>
              <input class="form-control" type="number" step="0.01" name="precoCusto" required />
            </div>
  
            <div class="mb-3">
              <label class="form-label">Preço de Venda:</label>
              <input class="form-control" type="number" step="0.01" name="precoVenda" required />
            </div>
  
            <div class="mb-3">
              <label class="form-label">Data de Validade:</label>
              <input class="form-control" type="date" name="validade" required />
            </div>
  
            <div class="mb-3">
              <label class="form-label">Quantidade:</label>
              <input class="form-control" type="number" name="quantidade" required />
            </div>
  
            <div class="mb-3">
              <label class="form-label">Fabricante:</label>
              <input class="form-control" type="text" name="fabricante" required />
            </div>
  
            <button class="btn btn-primary" type="submit">Cadastrar Produto</button>
          </form>
  
          <hr/>
  
          ${tabela}
  
        </body>
      </html>
    `);

});
app.post("/cadastroProduto",vAutenticacao,(requisicao,resposta)=>{
const{codigo,descricao,precoCusto,precoVenda,validade,quantidade,fabricante}=requisicao.body;
if(codigo&&descricao&&precoCusto&&precoVenda&&validade&&quantidade&&fabricante){
listaProdutos.push({codigo,descricao,precoCusto,precoVenda,validade,quantidade,fabricante});
}
resposta.redirect("/cadastroProduto");
});





app.post("/login", (requisicao, resposta) => {
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;
    if (usuario == "fabin" && senha == "123"){
        requisicao.session.logado = true;
        requisicao.session.usuario = usuario; 
        const dataHoraAtuais = new Date();
        resposta.cookie('ultimoLogin',dataHoraAtuais.toLocaleString(), { maxAge: 1000 * 60 * 60 * 24 * 30});
        resposta.redirect("/");
    }
    else{
         resposta.send(`
            <html lang="pt-br">
                <head>
                    <meta charset="UTF-8">
                    <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
                    <title>Login do Sistema</title>
                    <style>
                        body {
                            margin: 0;
                            padding: 0;
                            background-color: #17a2b8;
                            height: 100vh;
                        }
                        #login .container #login-row #login-column #login-box {
                            margin-top: 120px;
                            max-width: 600px;
                            height: 320px;
                            border: 1px solid #9C9C9C;
                            background-color: #EAEAEA;
                        }
                        #login .container #login-row #login-column #login-box #login-form {
                            padding: 20px;
                        }
                        #login .container #login-row #login-column #login-box #login-form #register-link {
                            margin-top: -85px;
                        }
                    </style>
                </head>
                <body>
                    <div id="login">
                        <h3 class="text-center text-white pt-5">Acessar o Sistema</h3>
                        <div class="container">
                            <div id="login-row" class="row justify-content-center align-items-center">
                                <div id="login-column" class="col-md-6">
                                    <div id="login-box" class="col-md-12">
                                        <form id="login-form" class="form" action="" method="post">
                                            <h3 class="text-center text-info">Login</h3>
                                            <div class="form-group">
                                                <label for="usuario" class="text-info">Usuário:</label><br>
                                                <input type="text" name="usuario" id="usuario" class="form-control">
                                            </div>
                                            <div class="form-group">
                                                <label for="senha" class="text-info">Senha:</label><br>
                                                <input type="password" name="senha" id="senha" class="form-control">
                                            </div>
                                            <span style="color: red;">Usuário ou senha inválidos!</span>
                                            <div class="form-group">
                                                <input type="submit" name="submit" class="btn btn-info btn-md">
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </body>
                <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
                <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
            </html>
    `);
    }
    //Realizar validação
});

function vAutenticacao(requisicao, resposta, next) {  //next = próximo
    if (requisicao.session.logado){
        next();
    }
    else{
        resposta.redirect("/login");
    }
}

app.get("/logout", (requisicao, resposta) => {
    requisicao.session.destroy();
    resposta.redirect("/login");
});

app.listen(port, host, () => {
    console.log(`Servidor em execução em http://${host}:${port}/`);
});



