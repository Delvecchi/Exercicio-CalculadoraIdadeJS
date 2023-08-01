//OK   1. Pegar os valores
//OK   2. Calcular a Idade
//       a. Com base no ano
//       b. Com mês (EXTRA)
//       c. Com dia (EXTRA)

//OK   3. Gerar a faixa etária

//     Resultado            Faixa
//     0 à 12                Criança
//     13 à 17                Adolescente
//     18 à 65               Adulto
//     Acima de 65         Idoso

//OK   4. Organizar o objeto pessoa para salvar na lista
// 5. Cadastrar a pessoa na lista
// 6. Função para carregar as pessoas, carrega a lista do localStorage, chamar ao carregar a página
// 7. Renderizar o conteúdo da tabela com as pessoas cadastradas
// 8. Botão para limpar os registros;

function calcular(event) {
    // Previne o recarregar da página
    event.preventDefault()

    console.log("Foi executada a função calcular")

    // Passo 1
    let usuario = receberValores()

    // // Passo 2
    let idade = calcularIdade(usuario.ano)

    // Passo 3
    let classificacaoIdade = classificarIdade(idade)

    console.log(classificacaoIdade)

    // Passo 4
    usuario = organizarDados(usuario, idade, classificacaoIdade)
    console.log(usuario)

    // Passo 5
    cadastrarUsuario(usuario)

    // Esse
    carregarUsuarios()

    // Ou
    window.location.reload()

}

function receberValores() {
    let nomeUsuario = document.getElementById("nome").value.trim()
    let dataUsuario = document.getElementById("ano").value

    let dadosUsuario = {
        nome: nomeUsuario,
        ano: dataUsuario
    }
    console.log(dadosUsuario)

    return dadosUsuario
}

function calcularIdade(ano) {
    let idade = 2023 - ano

    console.log(idade)

    return idade
}

function classificarIdade(ano) {
    //     Resultado            Faixa
    //     0 à 12                Criança
    //     13 à 17                Adolescente
    //     18 à 65               Adulto
    //     Acima de 65         Idoso

    if (ano >= 0 && ano <13) {
        return "Criança"
    }else if (ano > 12 && ano < 18) {
        return "Adolescente"
    }else if (ano > 17 && ano < 66) {
        return "Adulto"
    }else {
        return "Idoso"
    }
}

function organizarDados(dadosUsuario, idade, classificacaoIdade ) {
    let dataHoraAtual = new Intl.DateTimeFormat('pt-BR', { timeStyle: 'long', dateStyle: 'short' }).format(Date.now())
    
    let dadosUsuarioAtualizado = {
        ...dadosUsuario,
        faixa: idade,
        situacaoIdade: classificacaoIdade,
        dataCadastro: dataHoraAtual
    }

    return dadosUsuarioAtualizado
}

function cadastrarUsuario(dadosUsuario) {
    let listaUsuarios = []

    if (localStorage.getItem("usuariosCadastrados") != null) {
        listaUsuarios = JSON.parse( localStorage.getItem("usuariosCadastrados") )
    }

    // Adiciona o usuario na lista de usuarios
    listaUsuarios.push(dadosUsuario)

    // Salva a listaUsuarios no localStorage
    localStorage.setItem("usuariosCadastrados",  JSON.stringify(listaUsuarios) )

}

function carregarUsuarios() {
    let listaCarregada = []

    if ( localStorage.getItem("usuariosCadastrados") != null ) {
        listaCarregada = JSON.parse(localStorage.getItem("usuariosCadastrados"))
    }

    if(listaCarregada.length == 0) {
        // Se não tiver nenhum usuario cadastrado, mostrar mensagem
        let tabela = document.getElementById("corpo-tabela")

        tabela.innerHTML = `<tr class="linha-mensagem">
            <td colspan="6">Nenhum usuario cadastrado ☹ </td>
        </tr>`

    } else {
        // Montar conteudo da tabela
        montarTabela(listaCarregada)
    }

    console.log(listaCarregada)
}

window.addEventListener("DOMContentLoaded", () => carregarUsuarios() )

function montarTabela(listaUsuarios) {
    let tabela = document.getElementById("corpo-tabela")

    let template = ""

    listaUsuarios.forEach(usuario => {
        template += `<tr>
            <td data-cell="nome">${usuario.nome}</td>
            <td data-cell="ano">${usuario.ano}</td>
            <td data-cell="idade">${usuario.faixa}</td>
            <td data-cell="classificação etária">${usuario.situacaoIdade}</td>
            <td data-cell="data de cadastro">${usuario.dataCadastro}</td>
        </tr>`
    })

    tabela.innerHTML = template;
}

function deletarRegistros() {
    // Remove o item do localStorage
    localStorage.removeItem("usuariosCadastrados")

    // Recarrega a página
    window.location.reload()
}