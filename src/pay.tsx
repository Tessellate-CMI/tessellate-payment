import { createDirectus, rest, staticToken, readItem } from '@directus/sdk'

export async function pay(api_url: string, api_token: string, uuid: string) {
    const client = createDirectus(api_url).with(staticToken(api_token)).with(rest())

    const result = await client.request(readItem('payment', uuid))
    console.log(result)

    const buyerEmail = result.buyerEmail
    const buyerPhone = result.buyerPhone
    const buyerFirstName = result.buyerFirstName
    const buyerLastName = result.buyerLastName
    const order_id = uuid
    const amount = result.amount
    const uid = result.uid
    const private_key = ''
    const merchantId = ''
    const checksum = ''
    const currency = 'INR'
    const isocurrency = 365

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
                    <input type='hidden' name='merid' value={merchantId} />
                    <input type='hidden' name='kittype' value='server_side_sdk' />
                    <input type='hidden' name='checksum' value={checksum} />
                    <input type='hidden' name='currency' value={currency} />
                    <input type='hidden' name='isocurrency' value={isocurrency.toString()} />
                </form>
            </body>
        </html>
    )
}
