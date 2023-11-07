import { createDirectus, rest, staticToken, createItem } from '@directus/sdk'

export async function receive(
    api_url: string,
    api_token: string,
    mid: string,
    username: string,
    req,
    res,
    next
) {
    if (req.body.CUSTOMVAR !== 'STEMSregistration') {
        return
    }

    let CRC32 = require('crc32')
    let txnhash = CRC32.str(
        req.body.TRANSACTIONID +
            ':' +
            req.body.APTRANSACTIONID +
            ':' +
            req.body.AMOUNT +
            ':' +
            req.body.TRANSACTIONSTATUS +
            ':' +
            req.body.MESSAGE +
            ':' +
            mid +
            ':' +
            username
    )

    let chmod = req.body.CHMOD
    let custmvar = req.body.CUSTOMERVPA

    if (chmod === 'upi') {
        txnhash = CRC32.str(
            req.body.TRANSACTIONID +
                ':' +
                req.body.APTRANSACTIONID +
                ':' +
                req.body.AMOUNT +
                ':' +
                req.body.TRANSACTIONSTATUS +
                ':' +
                req.body.MESSAGE +
                ':' +
                mid +
                ':' +
                username +
                ':' +
                custmvar
        )
    }

    txnhash = txnhash >>> 0
    console.log(req.body.ap_SecureHash)
    console.log(txnhash)

    const serverData
    serverData.TRANSACTIONID = req.body.TRANSACTIONID
    serverData.APTRANSACTIONID = req.body.ATRANSACTIONID
    serverData.AMOUNT = req.body.AMOUNT
    serverData.TRANSACTIONSTATUS = req.body.TRANSACTIONSTATUS
    serverData.MESSAGE = req.body.MESSAGE
    serverData.ap_SecureHash = req.body.ap_SecureHash
    serverData.CUSTOMVAR = req.body.CUSTOMVAR

    const client = createDirectus(api_url).with(staticToken(api_token)).with(rest())
    const result = await client.request(createItem(transactions, serverData))
    console.log(result)
}
