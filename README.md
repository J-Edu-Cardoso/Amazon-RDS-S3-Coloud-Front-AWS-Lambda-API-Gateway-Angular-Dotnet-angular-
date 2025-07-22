# Visualização Interativa de Arquitetura AWS (.NET + Angular)

Esta aplicação web apresenta uma visualização interativa de uma arquitetura típica na AWS, utilizando .NET no backend (Lambda) e Angular no frontend, com recursos visuais para simular e explicar o fluxo de dados entre os serviços.

## Funcionalidades

---

## Diagrama da Arquitetura

![Diagrama da Arquitetura](Image01.jpg)

> **Legenda:**
> - **SPA Angular** → **CloudFront** → **Amazon S3** (conteúdo estático)
> - **SPA Angular** → **API Gateway** → **Lambda (.NET)** → **Amazon RDS** (API/dados)

---
- **Visualização gráfica** dos principais componentes AWS: Angular SPA, CloudFront, S3, API Gateway, Lambda (.NET), RDS.
- **Simulação de fluxos** de requisição, chamada de API e fluxo de dados completo.
- **Balão explicativo interativo**: ao clicar nos botões, um balão aparece com explicação em português sobre o fluxo selecionado.
- **Estilo moderno e responsivo**: CSS profissional, animações e layout adaptável a diferentes tamanhos de tela.

## Tecnologias Utilizadas
- HTML5, CSS3, JavaScript puro
- Python 3 + Flask (para servir localmente)

## Organização Recomendada de Pastas

```
AWS-API-REST/
├── README.md
├── requirements.txt
└── src/
    ├── app.py
    ├── index.html
    └── assets/
        ├── css/
        │   └── style.css
        └── js/
            └── Fluxo.js
```

- Separe imagens, ícones ou outros arquivos estáticos em `assets/img` se necessário.

## Como Executar Localmente
1. **Pré-requisitos:**
   - Python 3 instalado
   - Flask instalado (`pip install flask`)

2. **Execute o servidor Flask:**
   ```bash
   python src/app.py
   ```

3. **Acesse no navegador:**
   - Abra `http://localhost:5000` para visualizar a aplicação.

## Estrutura dos Arquivos
- `src/index.html` — Arquivo principal (HTML), agora referenciando arquivos externos de JS e CSS.
- `src/assets/js/Fluxo.js` — Código JavaScript principal da visualização e interatividade.
- `src/assets/css/style.css` — Arquivo de estilos (CSS) para todo o visual da aplicação.
- `src/app.py` — Servidor Flask simples para servir a aplicação.
- `README.md` — Este manual.

## Como Usar
- Clique nos botões para simular diferentes fluxos:
  - **Requisição do Usuário:** Mostra o caminho do conteúdo estático.
  - **Chamada API:** Demonstra o fluxo de uma chamada de API.
  - **Fluxo de Dados:** Simula o ciclo completo dos dados.
  - **Reset:** Limpa as animações.
  - **Demo Automático:** Executa todos os fluxos em sequência.
- Ao clicar, um balão explicativo aparece no canto inferior direito com detalhes do fluxo.

## Personalização
- Os textos dos balões e o visual podem ser facilmente ajustados no arquivo `index.html`.
- Caso queira adicionar novos fluxos ou componentes, basta seguir o padrão já existente no código.

## Deploy em Produção
- O projeto pode ser hospedado em qualquer serviço capaz de rodar Python (como AWS EC2, Heroku, PythonAnywhere) ou como página estática em S3/CloudFront (removendo o Flask).

## Autor
Desenvolvido por [Seu Nome].

---


# Guia de Deploy AWS: Frontend Angular + Backend .NET

## 1. Frontend Angular: Deploy no S3 + CloudFront

### a) Build do Angular

1. Navegue até a pasta do frontend:
   ```sh
   cd API-Gateway-Angular-Dotnet/angular-frontend
   ```
2. Instale as dependências e faça o build:
   ```sh
   npm install
   npm run build --prod
   ```
   O build será gerado na pasta `dist/`.

### b) Criar Bucket S3 e Fazer Upload

1. No console AWS, acesse **S3** e clique em "Criar bucket".
   - Defina um nome único (ex: `meu-app-frontend`).
   - Região: escolha a mesma do backend se possível.
2. Após criar, acesse o bucket e clique em "Upload".
   - Faça upload de **todos os arquivos e pastas** dentro de `dist/`.
3. Vá em **Propriedades > Hospedagem de site estático** e ative.
   - Defina `index.html` como documento de entrada e erro.
4. Em **Permissões**, permita acesso público (ou siga para CloudFront para acesso privado).
   - Em "Configurações de acesso público", desmarque "Bloquear todo acesso público" (ou mantenha bloqueado para CloudFront).
   - Em "Política de bucket", adicione permissão de leitura pública, se necessário:
     ```json
     {
       "Version": "2012-10-17",
       "Statement": [
         {
           "Sid": "PublicReadGetObject",
           "Effect": "Allow",
           "Principal": "*",
           "Action": "s3:GetObject",
           "Resource": "arn:aws:s3:::meu-app-frontend/*"
         }
       ]
     }
     ```

### c) (Opcional, Recomendado) Configurar CloudFront

1. No console AWS, acesse **CloudFront** e clique em "Criar distribuição".
2. Origem: selecione o bucket S3 do frontend.
3. Em "Configurações de comportamento":
   - Defina "Viewer Protocol Policy" como "Redirect HTTP to HTTPS".
   - Em "Error Pages", adicione regra para redirecionar 403/404 para `/index.html` (SPA fallback).
4. Após criar, copie o domínio CloudFront para usar como URL do frontend.

---

## 2. Backend .NET: Deploy no Elastic Beanstalk

### a) Build e Publish do .NET

1. Navegue até a pasta do backend:
   ```sh
   cd API-Gateway-Angular-Dotnet/dotnet-backend
   ```
2. Compile e publique:
   ```sh
   dotnet publish -c Release -o ./publish
   ```
   Os arquivos estarão na pasta `publish`.

### b) Deploy no Elastic Beanstalk

1. No console AWS, acesse **Elastic Beanstalk** e clique em "Create Application".
2. Selecione plataforma ".NET Core on Linux".
3. Faça upload do conteúdo da pasta `publish` (compacte em .zip para upload).
4. Configure variáveis de ambiente (strings de conexão, secrets, etc) em "Configuration > Software > Environment properties".
5. Aguarde o deploy e anote a URL gerada.

---

## 3. Banco de Dados (Amazon RDS)

1. No console AWS, acesse **RDS** e clique em "Create database".
2. Escolha o engine (MySQL, PostgreSQL, etc) e configure usuário/senha.
3. Defina as regras de segurança para permitir acesso do backend.
4. No backend, configure a string de conexão com os dados do RDS.

---

## 4. Integrações (S3, Lambda, API Gateway)

- **Permissões IAM**: Crie uma role/política para o backend acessar buckets S3.
- **Lambda**: Se usar funções serverless, faça upload do código no AWS Lambda e configure triggers.
- **API Gateway**: Crie endpoints HTTP para expor Lambdas ou o backend.

---

## 5. DNS (Route 53)

1. No console AWS, acesse **Route 53** e crie uma zona hospedada para seu domínio.
2. Aponte o domínio para a distribuição CloudFront (frontend) e Elastic Beanstalk/API Gateway (backend) via registros CNAME/Alias.

---

## Checklist Final
- [ ] Frontend publicado no S3/CloudFront
- [ ] Backend publicado no Elastic Beanstalk
- [ ] Banco RDS criado e integrado
- [ ] Permissões IAM configuradas
- [ ] Integrações Lambda/API Gateway prontas
- [ ] DNS configurado no Route 53

---

> **Dica:** Para automação, considere usar AWS CLI, SAM, CDK ou Terraform.

---

## Referências
- [Documentação AWS S3 Static Website](https://docs.aws.amazon.com/pt_br/AmazonS3/latest/userguide/WebsiteHosting.html)
- [Documentação Elastic Beanstalk .NET](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/dotnet-core-tutorial.html)
- [Documentação CloudFront](https://docs.aws.amazon.com/pt_br/AmazonCloudFront/latest/DeveloperGuide/Introduction.html)
- [Documentação RDS](https://docs.aws.amazon.com/pt_br/AmazonRDS/latest/UserGuide/Welcome.html)
- [Documentação API Gateway](https://docs.aws.amazon.com/pt_br/apigateway/latest/developerguide/welcome.html)
