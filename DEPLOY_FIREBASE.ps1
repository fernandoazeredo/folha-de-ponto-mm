[CmdletBinding()]
param(
    [Parameter(Mandatory = $false)]
    [ValidateNotNullOrEmpty()]
    [string]$FirebaseProjectId = "folha-de-ponto-mm"
)

$ErrorActionPreference = "Stop"
$ProjectIdOficial = "folha-de-ponto-mm"

if ($FirebaseProjectId -ne $ProjectIdOficial) {
    throw "Project ID incorreto. Este projeto deve usar exclusivamente '$ProjectIdOficial'."
}

Set-Location -LiteralPath $PSScriptRoot

Write-Host "Validando acesso ao Firebase..." -ForegroundColor Cyan

if (-not (Get-Command firebase -ErrorAction SilentlyContinue)) {
    throw "Firebase CLI não encontrado. Instale com: npm install -g firebase-tools"
}

firebase --version
if ($LASTEXITCODE -ne 0) {
    throw "Não foi possível executar o Firebase CLI."
}

firebase projects:list --json | Out-Null
if ($LASTEXITCODE -ne 0) {
    throw "Acesso ao Firebase não validado. Execute 'firebase login' e tente novamente."
}

Write-Host "Publicando somente o Firebase Hosting em '$ProjectIdOficial'..." -ForegroundColor Cyan
firebase deploy --only hosting --project $ProjectIdOficial

if ($LASTEXITCODE -ne 0) {
    throw "O deploy do Firebase Hosting falhou."
}

$HostingUrl = "https://$ProjectIdOficial.web.app"
Write-Host "Release complete!" -ForegroundColor Green
Write-Host "URL final: $HostingUrl" -ForegroundColor Green
Write-Host "Project Console: https://console.firebase.google.com/project/$ProjectIdOficial/overview" -ForegroundColor Cyan
