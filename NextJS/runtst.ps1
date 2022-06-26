

foreach ($file in Get-ChildItem -Include *.test.ts? -Recurse){
  $fn = $file.FullName.replace("\", "/") 
  Write-Output "$fn"
  node_modules\.bin\jest "$fn" --silent
  Start-Sleep -s 0.5
}