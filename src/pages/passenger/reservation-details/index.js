import React from 'react'


const PassengerReservationDetails = (props) => {
    let { } = props;
    return (
      <React.Fragment>
        <style>{`body { padding:0;margin:0 }iframe { width:100vw;height:100vh;border:unset; }`}</style>
        <iframe src={`https://api-backup.london-tech.com/api/v1/passenger/reservation-details/${props.token}`}></iframe>
      </React.Fragment>
    )
}

export default PassengerReservationDetails
export async function getServerSideProps({ req, res , query }) {
    // console.log(query)
    return {
        props: { 'token':query.token }
    }
}