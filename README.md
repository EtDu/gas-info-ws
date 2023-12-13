## Getting Started

1) Setup Environment Variables:

The server .env file --> `server/.env`:
- PUBLIC_URL should be a domain like `https://mydomain.com` for production, use `http://localhost:3000` for dev, this points to the origin for requests, which is mostly the user's browser

```
ETHERSCAN_API_KEY=
PUBLIC_URL=
```

The Next.JS app .env file --> `.env`
- PUBLIC_URL should be a domain like `https://mydomain.com` for production, use `http://localhost:3001` for dev, this points to the backend for initiating the socket connection

```
NEXT_PUBLIC_URL=""
```

2) Run Docker:

The frontend and backend are both containerized and meant to be run at the same time.

```bash
sudo docker-compose --build up

```

To deploy the app on a VM, I would start by making use of HAProxy to accept incoming https requests at port 443 and direct traffic to localhost:3000 & locahost:3001 accordingly. I would then use Certbot with a domain to obtain TLS certificates and have them automatically renew. HAProxy directing traffic to Docker containers & Certbot combined would be suitable for a lightweight production deployment.