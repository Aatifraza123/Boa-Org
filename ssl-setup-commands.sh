#!/bin/bash

# SSL Setup Commands for VPS
# Run these commands on your VPS (72.61.251.120)

echo "=== Installing Certbot for SSL Certificate ==="
sudo apt update
sudo apt install certbot python3-certbot-nginx -y

echo "=== Getting SSL Certificate for api.boabihar.org ==="
sudo certbot --nginx -d api.boabihar.org

echo "=== SSL Certificate installation complete ==="
echo "Certbot will automatically update your nginx config"
echo "Test the certificate renewal with:"
echo "sudo certbot renew --dry-run"