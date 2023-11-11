import { html } from '@elysiajs/html'
import { Elysia } from 'elysia'
import env from 'env-var'
import { pay } from './pay'
import { receive } from './receive'

const host = env.get('HOST').default('0.0.0.0').asString()
const port = env.get('PORT').default('3000').asPortNumber()

const api_url = env.get('DIRECTUS_API_URL').required().asUrlString()
const api_token = env.get('DIRECTUS_API_TOKEN').required().asString()

const app = new Elysia()
    .use(html())
    .get('/', () => 'OK')
    .get('/send/:orderid', ({ params: { orderid } }: { params: { orderid: string } }) =>
        pay(api_url, api_token, orderid)
    )
    .post('/receive', ({ body }) => receive(api_url, api_token, body))
    .listen({ hostname: host, port: port })

console.log(`Payment Server Running: ${app.server?.hostname}:${app.server?.port}`)
