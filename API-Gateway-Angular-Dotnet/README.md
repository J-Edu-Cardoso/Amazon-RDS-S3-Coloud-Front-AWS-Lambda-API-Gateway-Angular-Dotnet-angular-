# API Gateway REST - Angular SPA + .NET APIs

Este repositório contém a estrutura completa para um sistema baseado em API Gateway REST, com frontend Angular SPA e backend em .NET APIs (WebAPI), pronto para integração e deploy.

## Estrutura do Projeto

```
API-Gateway-Angular-Dotnet/
├── angular-frontend/     # Aplicação Angular SPA (frontend)
├── dotnet-backend/       # Projeto .NET WebAPI (backend)
└── README.md             # Documentação e instruções
```

## Como usar

1. Siga as instruções de cada subdiretório para rodar o frontend e o backend separadamente.
2. O frontend Angular se comunica com o backend .NET via endpoints RESTful.

---

## Instruções rápidas

- O backend expõe endpoints REST (CRUD de exemplo).
- O frontend Angular consome esses endpoints para exibir e manipular dados.
- Ideal para deploy em nuvem (ex: AWS API Gateway + Lambda + RDS/S3, ou EC2).

---

## Próximos passos
- Siga para `dotnet-backend/` para rodar a API
- Siga para `angular-frontend/` para rodar o SPA
