# Justiça para Santa Cruz — Landing Page

Landing page estática para a ação coletiva internacional contra a Ternium, em nome das famílias de Santa Cruz e região afetadas pela poluição da siderúrgica.

## Estrutura do Projeto

```
landing/
├── index.html              ← Página principal
├── privacy.html            ← Política de Privacidade (LGPD)
├── thank-you.html          ← Página de confirmação (para formulário futuro)
├── assets/
│   ├── css/
│   │   └── styles.css      ← Estilos completos (responsivo)
│   ├── js/
│   │   └── main.js         ← Configuração central + interações
│   └── img/                ← Imagens (adicionar manualmente)
├── reference.html          ← Arquivo de referência (não publicar)
├── frontend.css            ← CSS de referência (não publicar)
└── form.css                ← CSS de referência (não publicar)
```

## Publicação no GitHub Pages

1. Crie um repositório no GitHub (ex.: `justica-para-santa-cruz`).
2. Envie os arquivos do projeto (exclua os arquivos de referência):
   ```bash
   git init
   git add index.html privacy.html thank-you.html assets/ README.md
   git commit -m "Versão inicial da landing page"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/justica-para-santa-cruz.git
   git push -u origin main
   ```
3. No repositório, vá em **Settings → Pages**.
4. Em **Source**, selecione **Deploy from a branch** → branch `main`, pasta `/ (root)`.
5. Aguarde alguns minutos. O site estará em `https://SEU-USUARIO.github.io/justica-para-santa-cruz/`.

### Domínio personalizado

1. Em **Settings → Pages → Custom domain**, insira seu domínio (ex.: `justicaparasantacruz.com.br`).
2. No provedor de DNS, crie um registro **CNAME** apontando para `SEU-USUARIO.github.io`.
3. Marque **Enforce HTTPS** quando o certificado for emitido.

## Como editar textos e CTAs

### Número de WhatsApp / links
Todos os links dinâmicos são configurados **em um único lugar**: o arquivo `assets/js/main.js`.

Abra `main.js` e edite as constantes no topo:

```js
const CONFIG = {
  WHATSAPP_NUMBER: '5521999999999',      // ← Número com DDI+DDD (sem + ou espaços)
  WHATSAPP_TEXT: 'Olá! Quero saber...',  // ← Mensagem pré-preenchida
  INSTAGRAM_URL: 'https://www.instagram.com/justicaparasantacruz',
  CONTACT_EMAIL: 'contato@justicaparasantacruz.com.br',
  SITE_NAME: 'Justiça para Santa Cruz',
};
```

Salve o arquivo e o site inteiro será atualizado automaticamente — todos os botões, links e o botão flutuante de WhatsApp utilizam esses valores.

### Textos da página
Edite diretamente os arquivos `.html`. Os textos estão organizados em seções comentadas:
- **A) Header** — menu de navegação
- **B) Hero** — título e subtítulo principal
- **C) Sobre o Caso** — descrição da ação
- **D) Contexto Jurídico** — cards informativos + elegibilidade
- **E) FAQ** — perguntas e respostas (formato `<details>/<summary>`)
- **F) Contato** — canal de atendimento
- **G) Footer** — rodapé com textos legais

### Cores e fontes
Edite as variáveis CSS no topo de `assets/css/styles.css`:

```css
:root {
  --color-primary: #1B3A4B;     /* Azul institucional */
  --color-accent: #25D366;      /* Verde WhatsApp */
  --color-instagram: #E1306C;   /* Rosa Instagram */
  --font-heading: Georgia, 'Times New Roman', serif;
  --font-body: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
```

## Imagens

Coloque imagens na pasta `assets/img/` e referencie no HTML:

```html
<img src="assets/img/nome-da-imagem.jpg" alt="Descrição acessível" loading="lazy">
```

Formatos recomendados: `.webp` (preferido), `.jpg`, `.png`.

## Formulário de contato (integração futura)

O `index.html` já contém um formulário HTML comentado na seção de Contato. Para ativá-lo:

1. Descomente o bloco `<form>` dentro da seção `#contato`.
2. Configure o `action` do formulário para o serviço desejado:
   - **Formspree:** `action="https://formspree.io/f/SEU-ID"`
   - **Google Forms:** embed do formulário ou redirecionamento
   - **Netlify Forms:** adicione `netlify` ao atributo do `<form>`
3. Após o envio, redirecione para `thank-you.html`.

## Arquivos NÃO publicáveis

Os seguintes arquivos são de referência e **não devem** ser enviados ao repositório público:

- `reference.html` — HTML do site de referência
- `frontend.css` — CSS do site de referência
- `form.css` — CSS do site de referência
- `material para o site.pdf` — PDF com conteúdo-fonte

Adicione-os ao `.gitignore`:

```
reference.html
frontend.css
form.css
*.pdf
```

## Tecnologias

- HTML5 semântico
- CSS3 (variáveis customizadas, Flexbox, Grid, media queries)
- JavaScript vanilla (sem dependências)
- Nenhum framework, build tool ou backend — 100% estático

## Licença

Todos os direitos reservados — Justiça para Santa Cruz.
