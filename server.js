// sk_test_51MKcAfSDRlfR0Dt2Zb0969YnBXP4xjJriI6nzRXfJkjrHUgnQx6gMN3cJ1EhiC2u5GWn1Im9EiDT35czdFWZwB96004rqtn5UK

// Backpack : price_1MMQVlSDRlfR0Dt2txxYiyye

// fittshirt : price_1MMQa8SDRlfR0Dt2UnvQXzt7

// jacket : price_1MMQahSDRlfR0Dt2UIPd0VyB

const express = require('express');

var cors = require('cors');

const stripe = require('stripe')('sk_test_51MKcAfSDRlfR0Dt2Zb0969YnBXP4xjJriI6nzRXfJkjrHUgnQx6gMN3cJ1EhiC2u5GWn1Im9EiDT35czdFWZwB96004rqtn5UK')


const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res)=> {

    console.log(req.body);
    const items = req.body.items;
    let lineItems = [];
    items.forEach((item) => {
        lineItems.push(
            {
                price: item.id,
                quantity: item.quantity
            }
        )
    });

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel"
    });

    res.send(JSON.stringify({
        url: session.url
    }));

});


app.listen(4000, () => console.log("listeing on port 4000!"))