import { html } from '@elysiajs/html'
import { Elysia } from 'elysia'
import env from 'env-var'
import { pay } from './pay'
import { receive } from './receive'

const host = env.get('HOST').default('0.0.0.0').asString()
const port = env.get('PORT').default('3000').asPortNumber()

const api_url = env.get('API_URL').required().asUrlString()
const api_token = env.get('API_TOKEN').required().asString()

const app = new Elysia()
    .use(html())
    .get('/', () => 'OK')
    .get('/send/:uuid', ({ params: { uuid } }: { params: { uuid: string } }) =>
        pay(api_url, api_token, uuid)
    )
    .post('/receive', receive)
    .listen({ hostname: host, port: port })

console.log(`Payment Server Running: ${app.server?.hostname}:${app.server?.port}`)
