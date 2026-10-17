(() => {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  const themeButton = $('#theme-toggle');
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  let manualTheme = false;
  try { manualTheme = !!localStorage.getItem('vmb-theme'); } catch (_) {}
  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    const dark = theme === 'dark';
    $('#theme-icon').textContent = dark ? '☀' : '☾';
    $('#theme-label').textContent = dark ? 'Tema claro' : 'Tema escuro';
    themeButton.setAttribute('aria-label', dark ? 'Ativar tema diurno' : 'Ativar tema noturno');
    document.querySelector('meta[name="theme-color"]').content = dark ? '#101312' : '#f6f7f2';
  }
  setTheme(document.documentElement.dataset.theme);
  themeButton.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    manualTheme = true;
    setTheme(theme);
    try { localStorage.setItem('vmb-theme', theme); } catch (_) {}
  });
  media.addEventListener('change', (event) => { if (!manualTheme) setTheme(event.matches ? 'dark' : 'light'); });
  $('#year').textContent = new Date().getFullYear();

  const projects = window.PORTFOLIO_PROJECTS || [];
  const dialog = $('#project-dialog');
  let previousFocus;
  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function safeURL(value) {
    try { const url = new URL(value); return url.protocol === 'https:' ? url.href : null; } catch (_) { return null; }
  }
  function openDetails(project) {
    previousFocus = document.activeElement;
    $('#dialog-title').textContent = project.titulo;
    $('#dialog-origin').textContent = project.tipo;
    const content = $('#dialog-content');
    content.replaceChildren();
    [['O problema', 'problema'], ['A solução', 'solucao'], ['Minha participação', 'contribuicao'], ['Aprendizados', 'aprendizado'], ['Escopo atual', 'escopo'], ['Próximos passos', 'futuro']].forEach(([title, key]) => {
      if (!project[key]) return;
      content.append(element('h3', '', title), element('p', '', project[key]));
    });
    const url = safeURL(project.repositorio);
    $('#dialog-repo').hidden = !url;
    if (url) $('#dialog-repo').href = url;
    dialog.showModal();
  }
  $('#dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => previousFocus?.focus());
  function renderProjects(filter) {
    const grid = $('#projects-grid');
    grid.replaceChildren();
    const selected = projects.filter((project) => filter === 'todos' || project.categoria === filter);
    selected.forEach((project, index) => {
      const card = element('article', 'project-card');
      const visual = element('div', `project-visual ${project.id === 'pdv' ? 'pdv-visual' : 'cep-visual'}`);
      visual.setAttribute('aria-hidden', 'true');
      visual.append(element('span', 'visual-label', project.id === 'pdv' ? 'CAIXA / INTERFACE WEB' : project.id === 'cep' ? 'ENDEREÇO / INTEGRAÇÃO API' : project.id === 'inventario' ? 'INVENTÁRIO / PROTÓTIPO WEB' : 'PROJETO / DESENVOLVIMENTO'));
      const mini = element('div', 'mini-app');
      mini.append(element('span', 'mini-app-title', project.id === 'pdv' ? 'PDV Otimizado' : project.id === 'cep' ? 'Preencha menos. Encontre mais.' : project.id === 'inventario' ? 'Casa em Ordem' : project.titulo));
      if (project.id === 'pdv') {
        mini.append(element('div', 'mini-line', 'Total da compra                 R$ 42,30'), element('div', 'mini-line', 'Valor recebido                  R$ 50,00'), element('div', 'mini-highlight', 'Troco  →  R$ 7,70'), element('div', 'mini-foot', '+ R$ 0,30 recebidos → R$ 8,00 de troco'));
      } else if (project.id === 'cep') {
        mini.append(element('div', 'mini-line', 'CEP                         80010-000'), element('div', 'mini-highlight', '✓ Endereço encontrado'), element('div', 'mini-line', 'Rua XV de Novembro'), element('div', 'mini-foot', 'Centro · Curitiba · PR'));
      } else if (project.id === 'inventario') {
        mini.append(element('div', 'mini-line', 'Cozinha · CX-01'), element('div', 'mini-line', 'Pratos de jantar · 6 de 8 conferidos'), element('div', 'mini-highlight', '2 unidades a conferir'), element('div', 'mini-foot', 'Exemplo de conferência · exportação em PDF'));
      } else {
        mini.append(element('div', 'mini-highlight', '</> Aplicação de software'), element('div', 'mini-line', project.tecnologias.join(' · ')), element('div', 'mini-foot', project.tipo));
      }
      visual.append(mini);
      const body = element('div', 'project-body');
      const top = element('div', 'card-top');
      top.append(element('span', 'eyebrow', project.tipo), element('span', 'card-number', String(index + 1).padStart(2, '0')));
      body.append(top, element('h3', '', project.titulo), element('p', '', project.resumo));
      const tags = element('ul', 'tags');
      project.tecnologias.forEach((tech) => tags.append(element('li', '', tech)));
      const links = element('div', 'card-links');
      const details = element('button', 'text-link', 'Explorar projeto ↗');
      details.type = 'button';
      details.setAttribute('aria-label', `Explorar projeto ${project.titulo}`);
      details.addEventListener('click', () => openDetails(project));
      links.append(details);
      const repoURL = safeURL(project.repositorio);
      if (repoURL) {
        const repo = element('a', 'repo-link', 'Código ↗');
        repo.href = repoURL; repo.target = '_blank'; repo.rel = 'noopener noreferrer';
        repo.setAttribute('aria-label', `Código de ${project.titulo} no GitHub`);
        links.append(repo);
      }
      body.append(tags, links); card.append(visual, body); grid.append(card);
    });
    $('#project-count').textContent = `${selected.length} projeto(s) exibido(s).`;
  }
  document.querySelectorAll('[data-filter]').forEach((button) => button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    renderProjects(button.dataset.filter);
  }));
  renderProjects('todos');

  const money = (cents) => (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  function updateDemo() {
    const totalInput = $('#demo-total'), paidInput = $('#demo-paid');
    const total = Math.round(totalInput.valueAsNumber * 100), paid = Math.round(paidInput.valueAsNumber * 100);
    if (totalInput.value === '' || paidInput.value === '' || !totalInput.validity.valid || !paidInput.validity.valid || !Number.isSafeInteger(total) || !Number.isSafeInteger(paid)) {
      $('#demo-change').textContent = '—'; $('#demo-suggestion').textContent = 'Informe valores válidos com até duas casas decimais.'; return;
    }
    if (paid < total) {
      $('#demo-change').textContent = money(0); $('#demo-suggestion').textContent = `Faltam ${money(total - paid)} para completar o pagamento.`; return;
    }
    const change = paid - total;
    $('#demo-change').textContent = money(change);
    const extra = (100 - change % 100) % 100;
    $('#demo-suggestion').textContent = extra ? `Se o cliente acrescentar ${money(extra)}, o troco será ${money(change + extra)}. Sem moedas de centavos.` : 'O troco já está em reais inteiros. Nenhum ajuste de centavos é necessário.';
  }
  $('#demo-total').addEventListener('input', updateDemo);
  $('#demo-paid').addEventListener('input', updateDemo);
  updateDemo();
})();
