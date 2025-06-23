This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# What to Eat? – Backend & Admin Setup

## Prerequisites
- Docker & Docker Compose installed

## Getting Started

1. **Clone the repo**
2. **Start the backend and database:**
   ```sh
   docker-compose up --build
   ```
   - FastAPI backend: [http://localhost:8000/docs](http://localhost:8000/docs)
   - PostgreSQL: `localhost:5432`, user: `whattoeat`, password: `secretpassword`

3. **Default Admin Credentials:**
   - Username: `admin`
   - Password: `admin123`

4. **Seeding the Database:**
   - (Instructions will be added after models are created)

## Project Structure
- `backend/` – FastAPI app
- `frontend/` – Next.js admin dashboard (coming soon)

---

For any issues, open an issue or contact @ahmed.codes

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
