const functions = require('firebase-functions');
const express = require("express");
const cors = require("cors");
const { request, response } = require('express');
const stripe = require("stripe")('sk_test_51HiyGKJhwiMot9x3I1P4lq8UyspsMCOs0rVDIrBO6fzQg7xAQmhdHWhQ2FvEp0zbb04Jo6wqsvtvsPcv8WRh39yI00fnfoB3Aw');

//API

//-API-config
const app = express();

//-Middlewares
app.use(cors({origin:true}));   
app.use(express.json());    

//-API routes
app.get('/',(request,response) => response.status(200).send('hello World'))
app.post('/payments/create', async (request,response) => {
    const total = request.query.total;

    console.log("payment request made",total)

    const paymentIntent = await stripe.paymentIntents.create({
        description: 'Software development services',
        shipping: {
          name: 'Jenny Rosen',
          address: {
            line1: '510 Townsend St',
            postal_code: '98140',
            city: 'San Francisco',
            state: 'CA',
            country: 'US',
          },
        },
        amount : total,
        currency: "usd",
        payment_method_types: ['card'],  
       
    });

    response.status(201).send({
        clientSecret:paymentIntent.client_secret,
    })
})

//-listen Commands
exports.api = functions.https.onRequest(app);