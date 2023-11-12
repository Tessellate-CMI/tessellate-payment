import { createDirectus, createItem, rest, staticToken } from '@directus/sdk'

export async function receive(api_url: string, api_token: string, body: any) {
    if (body.CUSTOMVAR.startsWith('stems2023')) {
        return
    }

    const serverData = {
        TRANSACTIONID: body.TRANSACTIONID,
        APTRANSACTIONID: body.ATRANSACTIONID,
        AMOUNT: body.AMOUNT,
        TRANSACTIONSTATUS: body.TRANSACTIONSTATUS,
        MESSAGE: body.MESSAGE,
        ap_SecureHash: body.ap_SecureHash,
        CUSTOMVAR: body.CUSTOMVAR
    }

    const client = createDirectus(api_url).with(staticToken(api_token)).with(rest())
    const result = await client.request(createItem('transactions', serverData))

    return (
        <html lang='en'>
            <head>
                <meta charset='UTF-8' />
                <meta name='viewport' content='width=device-width, initial-scale=1.0' />
                <title>Tessellate Payment Result</title>
            </head>
            <body>
                <div>{serverData.TRANSACTIONID}</div>
            </body>
        </html>
    )
}
