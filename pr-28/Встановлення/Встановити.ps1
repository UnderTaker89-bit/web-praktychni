$ErrorActionPreference = 'Stop'
$installerPath = 'D:\прктичні\Програмування Веб\Встановлення Docker\Docker Desktop Installer.exe'
if (-not (Test-Path -LiteralPath $installerPath)) { throw 'Офіційний інсталятор не знайдено за підготовленим шляхом.' }
$signature = Get-AuthenticodeSignature -LiteralPath $installerPath
if ($signature.Status -ne 'Valid' -or $signature.SignerCertificate.Subject -notmatch 'Docker Inc') {
    throw 'Цифровий підпис Docker Inc не підтверджено. Встановлення зупинено.'
}
$installProcess = Start-Process -FilePath $installerPath -ArgumentList 'install','--backend=wsl-2','--installation-dir=D:\DockerDesktop','--wsl-default-data-root=D:\DockerData' -PassThru -Wait
if ($installProcess.ExitCode -ne 0) { throw "Інсталятор завершився з кодом $($installProcess.ExitCode)" }
Write-Host 'Відкрийте Docker Desktop і самостійно перегляньте ліцензійну угоду.'
