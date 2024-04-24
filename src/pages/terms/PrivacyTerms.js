import React from 'react'
import styles from "./styles.module.scss"
const PrivacyTerms = ({ pageContent }) => {
    return (
        <div className={styles.right}>
            {
                pageContent ?
                    <div className={`${styles.right_content} ${styles.right_content_policy}`} dangerouslySetInnerHTML={{ __html: pageContent }} />
                    :
                    <div className={styles.right_content}>
                        <h1>Airports Pickups London Privacy Policy</h1>
                        <p style={{ fontWeight: '500' }}>
                            Airports Pickups London Privacy Policy This Privacy Notice sets out your rights under the new laws: GDPR (General Data Protection Regulation).
                        </p>
                        <br />
                        <p>
                            Airport Pickups London (APL) understands that we have a responsibility to protect your privacy and look after your personal data safe and secure.
                            This privacy policy outlines how APL collects, uses and protects any personal information that you give when you visit APL website.
                            APL may choose to change its privacy policy from time to time, so we advise that our customers check this page regularly.
                        </p>

                        <h2 style={{ marginBottom: '0rem' }}>How the law protects you</h2>
                        <ul>
                            Data protection laws state that we are only able to process personal data if we have valid reasons to do so. The reasons we process your personal data include, but are not limited to, your consent, performance of a contract and to contact you.
                        </ul>

                        <h2 style={{ marginBottom: '0rem' }}>Information we collect, and how we use it.</h2>
                        <ul>
                            We receive information about you when you use our website, complete forms on
                            our website, if you contact us by phone, email,
                            live-chat or otherwise in respect of any of our products and services or during
                            the purchasing of any such product. If you provide us with personal data about a third
                            party (for example when registering a booking on their behalf), you warrant that you have
                            obtained the express consent from the third party for the disclosure and use of their personal data.
                            Your personal data may be collected when you use our services, including but not limited to:
                            <br />
                            <li style={{ listStyle: "inside", marginLeft: '3rem' }}  >Passenger Name</li>
                            <li style={{ listStyle: "inside", marginLeft: '3rem' }}  >Email address</li>
                            <li style={{ listStyle: "inside", marginLeft: '3rem' }}  >Telephone number</li>
                            <li style={{ listStyle: "inside", marginLeft: '3rem' }}  >Flight no</li>
                            <li style={{ listStyle: "inside", marginLeft: '3rem' }}  >Pick up address</li>
                            <li style={{ listStyle: "inside", marginLeft: '3rem' }}  >Drop off address</li>


                        </ul>
                        <h2 style={{ marginBottom: '0rem' }} >The information we collect:</h2>
                        <ul>
                            All of the above information is required from our customers in order to be able to make a booking, and providing transportation services.
                        </ul>
                        <h2 style={{ marginBottom: '0rem' }} >Third Parties</h2>
                        <ul>
                            APL does not and never shall sell your personal data to third parties
                            for marketing or advertising purposes. However we may submit your data
                            to third parties via using secure payment gateway API for the purpose of
                            processing billing such as card payments. You have the right to access the information we
                            hold about you. Please email your requests to accounts@aplcars.com and we will
                            provide a PDF file with the data.
                        </ul>
                        <h2 style={{ marginBottom: '0rem' }} >Where we store your personal data</h2>
                        <ul>
                            All information you provide to us is stored on our secured dedicated servers at
                            address within the EEA. The personal
                            information which is collected from our customers is only handled by our staff
                            and is not in reach of other third parties.
                        </ul>

                        <h2 style={{ marginBottom: '0rem' }} >Retention periods</h2>
                        <ul>
                            We will keep your personal data for the duration of 5 years as you are a customer of APL. We shall
                            retain your data only for as long as necessary in accordance with applicable laws.
                        </ul>
                        <h2 style={{ marginBottom: '0rem' }} >Your rights</h2>
                        <ul>
                            In preventing the use or processing of your personal data, it may delay or prevent us from fulfilling our contractual obligations to you. It may also mean that we shall be unable to provide our services or process the cancellation of your service.
                            <br />
                            You have the right to object to our use of your personal data, or ask us to delete, remove or stop using it if there is no need for us to keep it. This is known as your right to be forgotten. There are legal and accountancy reasons why we will need to keep your data, but please do inform us if you think we are retaining or using your personal data incorrectly.

                            <br />
                            You can view, edit or delete your personal data via email: documents@aplcars.com.
                            <br />

                            We will not contact you for marketing purposes unless you have given us your prior consent.
                        </ul>

                        <h2 style={{ marginBottom: '0rem' }} >Deleting client profile</h2>
                        <ul>
                            <br />
                            Using this function will result in:
                            <br />
                            <li style={{ listStyle: "inside", marginLeft: '3rem' }}> Deleting passenger details</li>
                            <li style={{ listStyle: "inside", marginLeft: '3rem' }}> Deleting Transport details</li>
                            <li style={{ listStyle: "inside", marginLeft: '3rem' }}> Terminating all future bookings, (subject to T & C)</li>
                            <li style={{ listStyle: "inside", marginLeft: '3rem' }}> Clearing client changes logs and emails</li>
                            <li style={{ listStyle: "inside", marginLeft: '3rem' }}> Removing ALL non-billing data</li>

                        </ul>
                        <h2 style={{ marginBottom: '0rem' }} >Data Breaches</h2>
                        <ul>
                            In the event of a data breach, we shall ensure that our obligations under applicable data protection laws are complied with where necessary.

                            If you have any questions about our Privacy Policy, the practices of this company or your dealings with this Site, please contact us at: documents@aplcars.com
                        </ul>
                        <h2 style={{ marginBottom: '0rem' }} >Head Office</h2>
                        <p>Airport Pickups London</p>
                        <p>APL Office</p>
                        <p>Novotel Heathrow</p>
                        <p>Cherry Lane, West Drayton, London</p>
                        <p>UB7 9HJ </p>
                        <p>Tel: +44 (0) 20 8688 7744</p>
                        <p>Fax: +44 (0) 20 8683 2330 </p>
                        <p> <a style={{ color: 'blue' }} href="https://www.airport-pickups-london.com" title="Airport Pickups London" target="_blank">www.airport-pickups-london.com</a></p>
                    </div>
            }
        </div>
    )
}

export default PrivacyTerms