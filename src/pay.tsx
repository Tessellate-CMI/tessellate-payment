import { createDirectus, rest, staticToken, readItem } from '@directus/sdk'
import dateFormat from 'dateformat'

export async function pay(
    api_url: string,
    api_token: string,
    uuid: string,
    merchantId: string,
    private_key: string,
    keydata: string
) {
    const client = createDirectus(api_url).with(staticToken(api_token)).with(rest())

    const result = await client.request(readItem('payment', uuid))
    console.log(result)

    let sha256 = require('sha256')

    const buyerEmail = result.buyerEmail
    const buyerPhone = result.buyerPhone
    const buyerFirstName = result.buyerFirstName
    const buyerLastName = result.buyerLastName
    const order_id = uuid.replace(/-/g, '').substr(0, 25)
    let amount = result.amount
    amount += '.00'
    const uid = result.uid
    const currency = 356
    const isocurrency = 'INR'

    const now = new Date()
    const alldata =
        buyerEmail +
        buyerFirstName +
        buyerLastName +
        amount +
        order_id +
        dateFormat(now, 'yyyy-mm-dd')
    console.log({ alldata })
    const checksum = sha256(keydata + '@' + alldata)
    console.log({ checksum })

    return (
        <html lang='en'>
            <head>
                <meta charset='UTF-8' />
                <meta name='viewport' content='width=device-width, initial-scale=1.0' />
                <title>Tessellate Payment</title>
                <script>{`setTimeout(function () {document.getElementById('sendtoairpay').submit()}, 1000)`}</script>
            </head>

            <body>
                <div>
                    Do Not Refresh or Press Back <br />
                    Redirecting to Airpay
                </div>
                <form
                    id='sendtoairpay'
                    method='POST'
                    action='https://payments.airpay.co.in/pay/index.php'
                >
                    <input type='hidden' name='buyerEmail' value={buyerEmail} />
                    <input type='hidden' name='buyerPhone' value={buyerPhone} />
                    <input type='hidden' name='buyerFirstName' value={buyerFirstName} />
                    <input type='hidden' name='buyerLastName' value={buyerLastName} />
                    <input type='hidden' name='orderid' value={order_id} />
                    <input type='hidden' name='amount' value={amount.toString()} />
                    <input type='hidden' name='uid' value={uid} />
                    <input type='hidden' name='privatekey' value={private_key} />
                    <input type='hidden' name='mercid' value={merchantId} />
                    <input type='hidden' name='kittype' value='server_side_sdk' />
                    <input type='hidden' name='checksum' value={checksum} />
                    <input type='hidden' name='currency' value={currency.toString()} />
                    <input type='hidden' name='isocurrency' value={isocurrency} />
                </form>
            </body>
        </html>
    )
}
