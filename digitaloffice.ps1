# Run this script from Admin PowerShell
# If executing was blocked, enter 'Set-ExecutionPolicy RemoteSigned'
if ( -not (Test-Path '.\DigitalOffice' -PathType Container) )
{
	Write-Host Geting source code
	git clone https://github.com/LT-Students/DigitalOffice/
}
cd .\DigitalOffice
Write-Host Updating source code
git pull
Write-Host Building solution
dotnet build
Write-Host Starting AuthenticationService
cd .\Services\AuthenticationService\bin\Debug\netcoreapp3.1\
start LT.DigitalOffice.AuthenticationService.exe
cd ..\..\..\..\..\
Write-Host Starting CheckRightsService
cd .\Services\CheckRightsService\bin\Debug\netcoreapp3.1\
start LT.DigitalOffice.CheckRightsService.exe
cd ..\..\..\..\..\
Write-Host Starting CompanyService
cd .\Services\CompanyService\bin\Debug\netcoreapp3.1\
start LT.DigitalOffice.CompanyService.exe
cd ..\..\..\..\..\
Write-Host Starting FileService
cd .\Services\FileService\bin\Debug\netcoreapp3.1\
start LT.DigitalOffice.FileService.exe
cd ..\..\..\..\..\
Write-Host Starting ProjectService
cd .\Services\ProjectService\bin\Debug\netcoreapp3.1\
start LT.DigitalOffice.ProjectService.exe
cd ..\..\..\..\..\
Write-Host Starting TimeManagementService
cd .\Services\TimeManagementService\bin\Debug\netcoreapp3.1\
start LT.DigitalOffice.TimeManagementService.exe
cd ..\..\..\..\..\
Write-Host Starting UserService
cd .\Services\UserService\bin\Debug\netcoreapp3.1\
start LT.DigitalOffice.UserService.exe
cd ..\..\..\..\..\