$body = @{
    membership_no = "BOA/LM/0002/2023"
    password = "User@123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login-membership" -Method Post -Body $body -ContentType "application/json"

Write-Host "Login Response:"
$response | ConvertTo-Json -Depth 3

if ($response.success) {
    Write-Host "`nTesting registration with token..."
    
    $regBody = @{
        seminar_id = 1
        category_id = 1
        slab_id = 1
        delegate_type = "BOA Member"
        amount = 1000
    } | ConvertTo-Json
    
    $headers = @{
        "Authorization" = "Bearer $($response.token)"
        "Content-Type" = "application/json"
    }
    
    try {
        $regResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/registrations" -Method Post -Body $regBody -Headers $headers
        Write-Host "Registration Response:"
        $regResponse | ConvertTo-Json -Depth 3
    } catch {
        Write-Host "Registration Error: $($_.Exception.Message)"
        if ($_.Exception.Response) {
            $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
            $errorBody = $reader.ReadToEnd()
            Write-Host "Error Body: $errorBody"
        }
    }
}