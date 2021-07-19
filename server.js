const express = require('express');
const puppeteer = require('puppeteer');

const server = express();

const PORT = process.env.PORT || 3333;

server.get('/', async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.alura.com.br/formacao-front-end');

  const pageContent = await page.evaluate(() => {
    return {
      subtitle: document.querySelector('.formacao-headline-subtitulo').innerHTML,
    };
  });

  console.log('pageContent:', pageContent)

  // Pegar dados da página da Alura
  await browser.close();

  res.send({
    "id": 113709,
    "code": "front-end",
    "kind": "DEGREE",
    "kindDisplayName": "Formação",
    "kindSlugDisplayName": "formacao",
    "situation": "PUBLISHED",
    "title": "Front-end",
    "subtitle": pageContent.subtitle
  })
})

server.listen(PORT, () => {
  console.log('Servidor rodando com sucesso na porta 3333')
})