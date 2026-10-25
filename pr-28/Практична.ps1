param([ValidateSet('Basics','Build','Rebuild','Check','Dev','Stop')][string]$Step='Build')
$ErrorActionPreference='Stop'
Set-Location -LiteralPath $PSScriptRoot
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) { throw 'Спочатку встановіть та запустіть Docker Desktop.' }
function Invoke-Docker { & docker.exe @args; if ($LASTEXITCODE -ne 0) { throw "Docker завершився з кодом $LASTEXITCODE" } }
Invoke-Docker info
switch ($Step) {
 'Basics' {
  Invoke-Docker --help
  Invoke-Docker compose --help
  Invoke-Docker run --rm hello-world
  Invoke-Docker pull busybox:latest
  Invoke-Docker image ls busybox:latest
  # Видаляється лише щойно завантажений навчальний образ; без force.
  Invoke-Docker image rm busybox:latest
  Invoke-Docker pull busybox:latest
  Invoke-Docker run --name web-pr28-busybox busybox:latest echo 'hello from busybox'
  Invoke-Docker ps
  Invoke-Docker ps -a --filter name=web-pr28-busybox
  Invoke-Docker start -a web-pr28-busybox
  Invoke-Docker stop web-pr28-busybox
  Invoke-Docker rm web-pr28-busybox
 }
 'Build' { Invoke-Docker compose up -d --build }
 'Rebuild' {
  Invoke-Docker compose down
  Invoke-Docker compose build --no-cache
  Invoke-Docker compose up -d
 }
 'Check' {
  New-Item -ItemType Directory -Path 'Результати' -Force | Out-Null
  & docker image ls web-pr28-static --format 'table {{.Repository}}	{{.Tag}}	{{.ID}}	{{.Size}}' | Tee-Object -FilePath 'Результати/Образи.txt'
  if ($LASTEXITCODE) { throw 'Не вдалося отримати образи' }
  & docker compose ps | Tee-Object -FilePath 'Результати/Контейнери.txt'
  if ($LASTEXITCODE) { throw 'Не вдалося отримати контейнери' }
  Invoke-Docker compose logs --tail 20
  $response=Invoke-WebRequest 'http://localhost:8080' -UseBasicParsing
  if ($response.StatusCode -ne 200 -or $response.Content -notmatch 'Hello docker!') { throw 'Сторінка не пройшла перевірку' }
  "HTTP $($response.StatusCode) — Hello docker!" | Set-Content -LiteralPath 'Результати/HTTP.txt' -Encoding UTF8
 }
 'Dev' { Invoke-Docker compose -f compose.yaml -f compose.dev.yaml up -d --build }
 'Stop' { Invoke-Docker compose down }
}

