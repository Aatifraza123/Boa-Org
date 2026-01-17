$body = @{
    membership_no = "BOA/LM/0002/2023"
    password = "User@123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login-membership" -Method Post -Body $body -ContentType "application/json"

if ($response.success) {
    Write-Host "Login successful, testing POST endpoint..."
    
    $testBody = @{
        test = "data"
    } | ConvertTo-Json
    
    $headers = @{
        "Authorization" = "Bearer $($response.token)"
        "Content-Type" = "application/json"
    }
    
    try {
        $testResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/registrations/test-post" -Method Post -Body $testBody -Headers $headers
        Write-Host "POST Test Response:"
        $testResponse | ConvertTo-Json -Depth 3
    } catch {
        Write-Host "POST Test Error: $($_.Exception.Message)"
    }
}