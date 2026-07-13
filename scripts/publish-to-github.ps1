# Publish Katoen Natie Moves Together to your GitHub account
# Run in PowerShell from the project folder:
#   .\scripts\publish-to-github.ps1

$ErrorActionPreference = "Stop"
$env:Path = "C:\Program Files\Git\cmd;C:\Program Files\GitHub CLI;" + $env:Path

Set-Location $PSScriptRoot\..

Write-Host "Checking GitHub login..." -ForegroundColor Cyan
$auth = gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Log in to GitHub (browser will open)..." -ForegroundColor Yellow
    gh auth login --hostname github.com --git-protocol https --web
}

# GitHub converts spaces to hyphens: "katoen natie moves together" -> katoen-natie-moves-together
$repoName = "katoen-natie-moves-together"
Write-Host "Creating public repo: $repoName" -ForegroundColor Cyan
gh repo create $repoName --public --source=. --remote=origin --push --description "Katoen Natie Moves Together - corporate sports community platform"

if ($LASTEXITCODE -eq 0) {
    $url = gh repo view --json url -q .url
    Write-Host ""
    Write-Host "Done! Your repo is live at:" -ForegroundColor Green
    Write-Host $url
} else {
    Write-Host "If the repo already exists, run: git push -u origin main" -ForegroundColor Yellow
}