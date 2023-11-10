import { createDirectus, rest, staticToken, createItem } from '@directus/sdk'

export async function receive(
    api_url: string,
    api_token: string,
    mid: string,
    username: string,
    body: any
) {
    if (body.CUSTOMVAR !== 'STEMSregistration') {
        return
    }

    // let CRC32 = require('crc32')
    // let txnhash = CRC32.str(
    //     body.TRANSACTIONID +
    //         ':' +
    //         body.APTRANSACTIONID +
    //         ':' +
    //         body.AMOUNT +
    //         ':' +
    //         body.TRANSACTIONSTATUS +
    //         ':' +
    //         body.MESSAGE +
    //         ':' +
    //         mid +
    //         ':' +
    //         username
    // )

    // let chmod = body.CHMOD
    // let custmvar = body.CUSTOMERVPA

    // if (chmod === 'upi') {
    //     txnhash = CRC32.str(
    //         body.TRANSACTIONID +
    //             ':' +
    //             body.APTRANSACTIONID +
    //             ':' +
    //             body.AMOUNT +
    //             ':' +
    //             body.TRANSACTIONSTATUS +
    //             ':' +
    //             body.MESSAGE +
    //             ':' +
    //             mid +
    //             ':' +
    //             username +
    //             ':' +
    //             custmvar
    //     )
    // }

    // txnhash = txnhash >>> 0
    // console.log(body.ap_SecureHash)
    // console.log(txnhash)

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
    console.log('Directus Updated')

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
