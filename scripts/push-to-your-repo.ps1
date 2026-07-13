# Push local code to YOUR existing GitHub repo
# Usage:
#   .\scripts\push-to-your-repo.ps1 -RepoUrl "https://github.com/YOUR-USERNAME/YOUR-REPO"

param(
    [Parameter(Mandatory = $true)]
    [string]$RepoUrl
)

$ErrorActionPreference = "Stop"
$env:Path = "C:\Program Files\Git\cmd;" + $env:Path

Set-Location $PSScriptRoot\..

# Normalize URL (strip trailing slash, ensure .git)
$RepoUrl = $RepoUrl.TrimEnd("/")
if (-not $RepoUrl.EndsWith(".git")) {
    $RepoUrl = "$RepoUrl.git"
}

Write-Host "Remote: $RepoUrl" -ForegroundColor Cyan

git remote remove origin 2>$null
git remote add origin $RepoUrl

Write-Host "Pushing to GitHub (browser login may open)..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    $viewUrl = $RepoUrl -replace "\.git$", ""
    Write-Host ""
    Write-Host "Success! Repo is live at:" -ForegroundColor Green
    Write-Host $viewUrl
} else {
    Write-Host ""
    Write-Host "Push failed. Check:" -ForegroundColor Red
    Write-Host "  1. Repo URL is correct (copy from GitHub browser address bar)"
    Write-Host "  2. You are logged into GitHub when prompted"
    Write-Host "  3. Repo is empty OR you used 'git pull' first if it has a README"
}