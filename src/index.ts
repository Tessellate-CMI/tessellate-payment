import { html } from '@elysiajs/html'
import { Elysia } from 'elysia'
import { exit } from 'process'
import { pay } from './pay'
import { receive } from './receive'

let host = process.env.HOST || (process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost')
let port = process.env.PORT || 3000

if (!process.env.API_URL) {
    console.log('API_URL not set!')
    exit()
}
if (!process.env.API_TOKEN) {
    console.log('API_TOKEN not set!')
    exit()
}

let api_url = process.env.API_URL ?? ''
let api_token = process.env.API_TOKEN ?? ''

const app = new Elysia()
    .use(html())
    .get('/', () => 'OK')
    .get('/send/:uuid', ({ params: { uuid } }: { params: { uuid: string } }) =>
        pay(api_url, api_token, uuid)
    )
    .post('/receive', receive)
    .listen({ hostname: host, port: port })

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
