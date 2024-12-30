function COPY_PICK_UP_DETAILS_FOR_TOURS_DROPOFF(params = {}) {
    let { state, action } = params;
    let { data: { selectedPickupPoints } } = action;
    let newState = JSON.parse(JSON.stringify(state));

    // Iterate through all selectedPickupPoints to make conditional changes
    const updatedSelectedPickupPoints = selectedPickupPoints.map(point => {
        if (point.pcatId === 1) {
            return {
                ...point,
                flightDetails: {
                    ...point.flightDetails,
                    flightNumber: "",
                    waitingPickupTime: 0
                }
            };
        }
        if (point.pcatId === 5) {
            return {
                ...point,
                postCodeDetails: {
                    ...point.postCodeDetails,
                },
            };
        }
        if (point.pcatId === 3) {
            return {
                ...point,
                trainNumber:""
            };
        }
            // Create a copy of the point and update the flightDetails

        //train number canbe different for example for pcatId2
        //room number canbe different for example for pcatId3
        //cruise number canbe different for example for pcatId9
        // Return the point as is for other pcatIds
        return point;
    });


    // Assign the updated selectedPickupPoints to selectedDropoffPoints in newState
    newState.reservations[0][`selectedDropoffPoints`] = [...updatedSelectedPickupPoints];

    return newState;
}

export default COPY_PICK_UP_DETAILS_FOR_TOURS_DROPOFF;
