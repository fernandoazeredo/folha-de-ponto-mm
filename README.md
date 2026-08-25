# Folha de Ponto MM

Aplicativo estático para geração e impressão de folhas de ponto da Marques & Müller Escritório de Advocacia S/C.

## Funcionalidades

- Seleção de mês, ano e funcionário.
- Preenchimento dos dados cadastrais do funcionário.
- Geração automática dos dias do mês.
- Identificação de sábados, domingos e feriados.
- Campos editáveis para horários, observações, resumo e assinaturas.
- Impressão individual.
- Impressão em lote de todos os funcionários, com opção de salvar em PDF pelo navegador.
- Modo claro e escuro durante a página aberta.
- Layout adaptado para computador, notebook, tablet e celular.

## Arquitetura

O projeto utiliza apenas HTML, CSS e JavaScript. O Firebase é usado exclusivamente para Hosting. Não há Firestore, Realtime Database, Authentication, Storage, `localStorage` ou `sessionStorage`.

## Estrutura

```text
public/
  index.html
  style.css
  script.js
  favicon.svg
.firebaserc
.gitignore
firebase.json
DEPLOY_FIREBASE.ps1
LICENSE.txt
README.md
```

## Publicação

Projeto Firebase: `folha-de-ponto-mm`

No Windows PowerShell, dentro da pasta oficial `D:\APLICATIVOS - DEPLOY\folha-de-ponto-mm`, execute:

```powershell
Unblock-File .\DEPLOY_FIREBASE.ps1
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
.\DEPLOY_FIREBASE.ps1
```
