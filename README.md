A simple notes app.

## Live URL:
[https://highway-delite-5x43.vercel.app/](https://highway-delite-5x43.vercel.app/)

## Getting Started

### Development server:

`1.` Clone the repository
```bash
git clone https://github.com/krishnav0110/highway-delite.git
```

`2.` Install npm packages
```bash
npm i
# or
npm install
```

`3.` Add the values in .env file.
```ini
URL=<your-domain-host> # in development server assign value http://localhost:3000
JWT_API_SECRET=<any random characters> # not to be shared in production
MONGO_URI=<mongodb cluster connect URL>
```

`4.` Start development server
```bash
npm run dev
```

`5.` Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
