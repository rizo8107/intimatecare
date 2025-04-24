# SSL Certificate Setup for intimatecare.in

This directory is for storing SSL certificates required for HTTPS support on the intimatecare.in website.

## Required Files

You need to place the following files in this directory:

1. `intimatecare.in.crt` - The SSL certificate file
2. `intimatecare.in.key` - The private key file

## How to Obtain SSL Certificates

### Option 1: Let's Encrypt (Recommended for Production)

Let's Encrypt provides free SSL certificates that are trusted by all major browsers.

1. Install Certbot on your server:
   ```bash
   sudo apt-get update
   sudo apt-get install certbot
   ```

2. Obtain a certificate:
   ```bash
   sudo certbot certonly --standalone -d intimatecare.in -d www.intimatecare.in
   ```

3. Copy the certificate files to this directory:
   ```bash
   sudo cp /etc/letsencrypt/live/intimatecare.in/fullchain.pem ./intimatecare.in.crt
   sudo cp /etc/letsencrypt/live/intimatecare.in/privkey.pem ./intimatecare.in.key
   ```

4. Set up auto-renewal:
   ```bash
   sudo crontab -e
   ```
   Add the following line:
   ```
   0 3 * * * certbot renew --quiet && cp /etc/letsencrypt/live/intimatecare.in/fullchain.pem /path/to/project/ssl/intimatecare.in.crt && cp /etc/letsencrypt/live/intimatecare.in/privkey.pem /path/to/project/ssl/intimatecare.in.key
   ```

### Option 2: Self-Signed Certificate (For Testing Only)

For testing purposes, you can generate a self-signed certificate:

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout intimatecare.in.key -out intimatecare.in.crt
```

**Note:** Self-signed certificates will still show security warnings in browsers.

### Option 3: Commercial SSL Certificate

If you already have a commercial SSL certificate from a provider like Comodo, DigiCert, etc., simply place the certificate and key files in this directory with the correct names.

## Deployment

After placing the certificate files in this directory, rebuild and redeploy your Docker container:

```bash
docker-compose down
docker-compose up -d --build
```

## Troubleshooting

If you encounter SSL issues:

1. Check that the certificate files exist and have the correct names
2. Verify that the certificate is valid and not expired
3. Ensure the Nginx configuration correctly references these files
4. Check Nginx logs for any SSL-related errors:
   ```bash
   docker-compose logs web
   ```
