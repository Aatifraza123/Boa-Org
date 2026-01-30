import { useState } from 'react';
import { API_BASE_URL } from '@/lib/utils';

export function ApiTest() {
  const [testResult, setTestResult] = useState<string>('');

  const testApi = async () => {
    try {
      console.log('Testing API at:', API_BASE_URL);
      setTestResult('Testing...');
      
      // Test basic connectivity
      const response = await fetch(`${API_BASE_URL}/api/committee-members?page_type=home`);
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      const responseText = await response.text();
      console.log('Raw response:', responseText.substring(0, 500));
      
      setTestResult(`Status: ${response.status}\nContent-Type: ${response.headers.get('content-type')}\nResponse: ${responseText.substring(0, 200)}...`);
    } catch (error) {
      console.error('API Test Error:', error);
      setTestResult(`Error: ${error}`);
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
      <h3>API Test</h3>
      <p>API Base URL: {API_BASE_URL}</p>
      <button onClick={testApi}>Test API</button>
      <pre style={{ background: '#f5f5f5', padding: '10px', marginTop: '10px' }}>
        {testResult}
      </pre>
    </div>
  );
}