// Para adicionar projetos, copie um objeto desta lista e preencha os campos.
// categoria: "autoral" ou "estudo". Não inclua tokens ou credenciais.
window.PORTFOLIO_PROJECTS = [
  {
    id: "pdv", titulo: "PDV Otimizado", categoria: "autoral", tipo: "Projeto autoral",
    resumo: "Uma experiência no caixa de farmácia transformada em uma ferramenta para calcular o troco e sugerir ajustes no pagamento.",
    tecnologias: ["JavaScript", "HTML", "CSS"],
    repositorio: "https://github.com/mubelesa/pdvotimizado",
    problema: "A escassez de moedas e notas pequenas tornava a devolução do troco uma negociação frequente no atendimento.",
    solucao: "Interface de caixa que calcula o troco e sugere valores adicionais ou reduções no pagamento para facilitar sua devolução. Os cálculos usam centavos inteiros e a interface oferece atalhos de teclado.",
    contribuicao: "Projeto desenvolvido por mim, inspirado na minha experiência trabalhando em caixa de farmácia.",
    aprendizado: "Aplicação de lógica de programação, regras de cálculo monetário, manipulação do DOM e interação por teclado.",
    escopo: "Protótipo de interface de caixa. Não inclui estoque, processamento de pagamentos, emissão fiscal ou registro de vendas."
  },
  {
    id: "cep", titulo: "Formulário com consulta de CEP", categoria: "estudo", tipo: "Atividade da EBAC",
    resumo: "Formulário com preenchimento de endereço via ViaCEP, validação da consulta e recuperação de dados com armazenamento local.",
    tecnologias: ["JavaScript", "ViaCEP API", "LocalStorage"],
    repositorio: "https://github.com/mubelesa/formulario-cep",
    problema: "Preencher todos os campos de endereço manualmente aumenta o trabalho e a possibilidade de erros de digitação.",
    solucao: "Consulta assíncrona à API ViaCEP, preenchimento automático dos campos de endereço, mensagens de erro e persistência dos dados no navegador.",
    contribuicao: "Atividade de estudo realizada na EBAC, apresentada como aplicação prática dos conteúdos aprendidos.",
    aprendizado: "Uso de fetch e async/await, tratamento de respostas HTTP, eventos de formulário e armazenamento com LocalStorage.",
    escopo: "Demonstração de formulário. O envio é simulado e não existe um servidor para receber cadastros."
  }
];
