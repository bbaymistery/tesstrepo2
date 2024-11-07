import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // Define your HTML template
            const htmlTemplate = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              border: 1px solid #ddd;
              border-radius: 8px;
            }
            .header {
              background-color: #f8f8f8;
              padding: 10px;
              text-align: center;
            }
            .header h2 {
              margin: 0;
            }
            .details {
              margin-top: 20px;
            }
            .details p {
              line-height: 1.6;
            }
            .total {
              font-weight: bold;
              font-size: 1.2em;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Booking Confirmation</h2>
              <p>Airport Pickups London</p>
            </div>
            <div class="details">
              <p><strong>Service:</strong> Arrival at Heathrow Terminal 2</p>
              <p><strong>Date:</strong> 06-11-2024</p>
              <p><strong>Passenger Name:</strong> Enck Erickson</p>
              <p><strong>Flight Details:</strong> Flight No: Test123, Class: Economy</p>
              <p><strong>Luggage:</strong> 2 Suitcases</p>
            </div>
            <div class="total">
              <p>Total Price: £369</p>
            </div>
            <p>Thank you for booking with Airport Pickups London. We look forward to serving you!</p>
          </div>
        </body>
        </html>
      `;

            const transporter = nodemailer.createTransport({
                name: "mail.plesk-secure.com",
                host: "mail.plesk-secure.com",
                port: 25,
                secure: false,
                auth: {
                    user: "info@aplcars.com",
                    pass: "Istanbul2021!-",
                },
                tls: { rejectUnauthorized: true },
            });

            const mailData = {
                from: `"London Heathrow Taxi" <info@aplcars.com>`,
                to: "elgun.ezmemmedov@mail.ru",
                subject: "subject",
                html: htmlTemplate,
            };
            await new Promise((resolve, reject) => {
                transporter.sendMail(mailData, function (err, info) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        console.log(info);
                        resolve(info);
                    }
                });
            });
            res.status(200).json({ status: "OK" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to send email' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
