import { createDirectus, rest, staticToken, readItem } from '@directus/sdk'
// import dateFormat from 'dateformat'

export async function pay(
    api_url: string,
    api_token: string,
    orderid: string
    // merchantId: string,
    // private_key: string,
    // keydata: string
) {
    const client = createDirectus(api_url).with(staticToken(api_token)).with(rest())

    const result = await client.request(readItem('payment', orderid))
    console.log(result)

    // let sha256 = require('sha256')

    const buyerEmail = result.buyerEmail
    const buyerPhone = result.buyerPhone
    const buyerFirstName = result.buyerFirstName
    const buyerLastName = result.buyerLastName
    const order_id = result.orderid
    const amount = result.amount //amount should always be integer when read from directus
    // const uid = result.uid
    // const currency = 356
    // const isocurrency = 'INR'

    // const now = new Date()
    // const alldata =
    //     buyerEmail +
    //     buyerFirstName +
    //     buyerLastName +
    //     amount +
    //     order_id +
    //     uid +
    //     dateFormat(now, 'yyyy-mm-dd')
    // console.log({ alldata })
    // const checksum = sha256(keydata + '@' + alldata)
    // console.log({ checksum })

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
                    Redirecting to CMI Payment Gateway
                </div>
                <form
                    id='sendtoairpay'
                    method='GET'
                    action='https://www.schoolpay.co.in/form_generator/view.php'
                >
                    <input type='hidden' name='id' value='81393' />
                    <input type='hidden' name='element_306' value='23' />
                    <input
                        type='hidden'
                        name='element_405'
                        value={buyerFirstName + ' ' + buyerLastName}
                    />
                    <input type='hidden' name='element_100' value={buyerPhone} />
                    <input type='hidden' name='element_408' value={buyerEmail} />
                    <input type='hidden' name='element_327' value={order_id} />
                    <input type='hidden' name='element_409_1' value={amount} />
                    <input type='hidden' name='element_409_2' value='00' />
                </form>
            </body>
        </html>
    )
}
