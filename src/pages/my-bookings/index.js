import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../components/layouts/Layout';
import styles from "./styles.module.scss"
import { currentDate, } from '../../helpers/getDates';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { DataTable, ParagraphReactComponent } from '../../components/elements/Datatable';
import ReusableModal from '../../components/elements/ReusableModal';
import io from 'socket.io-client'
import LoadingInlineInput from '../../components/elements/Loadings/LoadingInlineInput';
import OutsideClickAlert from '../../components/elements/OutsideClickAlert';
import { parseCookies } from '../../helpers/cokieesFunc';
//we didnt use But i left here maybe one day we can use 
const InlineEditor = (props) => {
    const { type, reservation, isEditing, onStartEdit, onFinishEdit, onCloseEditingCell, editingCell, setEditingCell, editingCellFieldName, maxSuitcase = 3 } = props;

    let inputElement;
    if (type === "input") {
        inputElement = <input type="text" value={editingCell[editingCellFieldName]} onChange={e => setEditingCell({ [editingCellFieldName]: e.target.value })} />;
    } else if (type === "select") {
        inputElement = (
            <select value={editingCell.pax} onChange={e => setEditingCell({ pax: e.target.value })}>
                {Array.from(new Array(maxSuitcase)).map((arr, i) => { return <option key={i} value={i + 1}>{i + 1}</option> })}
            </select>
        );
    }

    return (
        isEditing
            ? (
                editingCell.editLoading ?
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <LoadingInlineInput style={{ right: "50%", transform: "translate(50%, -50%)" }} />
                    </div>
                    :
                    <div className="inline_edit_div_container">
                        {inputElement}
                        <span onClick={() => onFinishEdit(editingCellFieldName)} className={"icon_span"}>
                            <i className="fa-solid fa-check"></i>
                        </span>
                        <span onClick={() => onCloseEditingCell()} className={"icon_span"}>
                            <i className="fa-solid fa-xmark"></i>
                        </span>
                    </div>
            )
            : <p className='inline_edit_paragraph' onClick={onStartEdit} >
                {reservation[editingCellFieldName]}
                <i className="fa-regular fa-pen-to-square"></i>
            </p>
    );
};
const InlineBookingEdition = (props) => {
    const { loginToken = "", loginUserId = "", reservationId = "" } = props;
    let baseUrl = `https://api.london-tech.com/tools/reservation-form?action=edit&reservationId=${reservationId}&xAuthToken=${loginToken}&userId=${loginUserId}`
    const [isModalVisible, setModalVisible] = useState(false);
    const [iframeLink, setiframeLink] = useState("")
    const editReservation = (par) => {
        let url = `https://api.london-tech.com/tools/reservation-form?action=edit&reservationId=${reservationId}&xAuthToken=${loginToken}&userId=${loginUserId}`
        setModalVisible(true);
        setiframeLink(url)
    }
    const closeModal = (par) => {
        setModalVisible(false);
    }


    let a = "https://api.london-tech.com/tools/reservation-form?action=edit&reservationId=831351&xAuthToken=fca3a99be0c8c9895c500b2414927e32&userId=879"
    return (
        <>
            <button className='inline_edit_div_button' onClick={editReservation}>
                Edit
            </button>


            <div className={`${styles.edit_booking_modal} ${isModalVisible ? styles.show : styles.hide}`}>
                <div className={styles.modal_container}>
                    <div className={styles.modaltop}>
                        <p>{reservationId} • Edit Reservation</p>
                        <div className={styles.icon} onClick={closeModal}>
                            <i className="fas fa-times"></i>
                        </div>
                    </div>

                    <div className={styles.iframe_div}>
                        <iframe src={iframeLink}></iframe>

                    </div>
                </div>
            </div>
        </>
    );
};

const InlineModalEditor = (props) => {
    const { reservation, isEditing, onStartEdit, onFinishEdit, onCloseEditingCell, editingCell, setEditingCell, maxSuitcase = 3 } = props;

    return (
        isEditing
            ? (
                <div className={styles.edit_modal} >
                    <div className={styles.edit_modal_container}>
                        <div className={styles.edit_modal_container_top}>
                            <div className={styles.edit_modal_container_top_left}>
                                <p className={styles.edit_modal_container_top_left_text}>
                                    Passenger Details
                                </p>
                                <li className={styles.edit_modal_container_top_left_reservation_text}>
                                    {reservation.reservationId}
                                </li>
                            </div>
                            <div className={styles.edit_modal_container_top_right}>
                                <span className={`${styles.icon_whatsap} ${styles.icon}`}>
                                    <a style={{ display: 'flex' }} rel="noreferrer" target="_blank" href={`https://wa.me/${editingCell["phone"]}`}>
                                        <i className="fa-brands fa-whatsapp"></i>
                                    </a>
                                </span>
                                <span onClick={() => onCloseEditingCell()} className={`${styles.icon_close} ${styles.icon}`}>
                                    <i className="fa-solid fa-xmark"></i>
                                    Close
                                </span>
                                {editingCell.editLoading ?
                                    <span style={{ position: 'relative', width: "40px" }}>
                                        <span style={{ display: "flex", justifyContent: "center" }}>
                                            <LoadingInlineInput style={{ right: "50%", transform: "translate(50%, -50%)" }} />
                                        </span>
                                    </span> :
                                    <span onClick={() => onFinishEdit()} className={`${styles.icon_edit} ${styles.icon}`}>
                                        <i className="fa-solid fa-edit"></i>
                                        Edit
                                    </span>}
                            </div>
                        </div>
                        <div className={styles.edit_modal_container_body}>
                            <div className={styles.input_div}>
                                <p>Full Name </p>
                                <div>
                                    <span>:</span>
                                    <input type="text" value={editingCell["passengerName"]} onChange={e => setEditingCell({ ["passengerName"]: e.target.value })} />
                                </div>
                            </div>
                            <div className={styles.input_div}>
                                <p>Phone </p>
                                <div>
                                    <span>:</span>
                                    <input type="text" value={editingCell["phone"]} onChange={e => setEditingCell({ ["phone"]: e.target.value })} />
                                </div>
                            </div>
                            <div className={styles.input_div}>
                                <p>Pax </p>
                                <div>
                                    <span>:</span>
                                    <select value={editingCell.pax} onChange={e => setEditingCell({ pax: e.target.value })}>
                                        {Array.from(new Array(maxSuitcase)).map((arr, i) => { return <option key={i} value={i + 1}>{i + 1}</option> })}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
            : <p className='inline_edit_paragraph' onClick={onStartEdit} >
                {reservation["passengerName"]}
                <i className="fa-regular fa-pen-to-square"></i>
            </p>
    );
}
const ModalDriverPopUp = (props) => {
    let { data: { driverId, driverStatusText, env } } = props
    const [enRouterModalStatus, setEnRouteModalStatus] = useState(false)

    const greenOrNot = driverStatusText.toLowerCase() === "en route" || driverStatusText.toLowerCase() === "picked up" || driverStatusText.toLowerCase() === "arrived";

    const handleDriverStatusClicking = () => {
        if (!greenOrNot) alert("Once the driver is enroute to this job, the GPS will be activated")
        setEnRouteModalStatus(true)
    }
    return (enRouterModalStatus && driverId && greenOrNot ?
        <ReusableModal showModalCloseIcon={false} shouldShowModal={setEnRouteModalStatus} onRequestClose={() => { setEnRouteModalStatus(false) }} style={{ background: `rgba(0, 0, 0, .6)` }}>
            <div className={"driver_map_iframe_div"}>
                <iframe className={"map_iframe"} src={`${env.apiDomain}/api/v1/drivers/location/${driverId}?hideDetails=true`}>
                </iframe>
                <i onClick={() => setEnRouteModalStatus(false)} className={`fa-solid fa-xmark `}></i>
            </div>
        </ReusableModal>
        : <p className='inline_edit_paragraph' onClick={() => handleDriverStatusClicking(driverStatusText)} >
            {driverStatusText}
            {driverId && greenOrNot ? <i style={{ color: "#01c701" }} className="fa-solid fa-location-dot" ></i> : <i className="fa-solid fa-location-dot" ></i>}
        </p>)
}


const ReservationFlightStatus = (props) => {
    let { reservation, onClick = () => { }, } = props;
    let { flightDetails, flightArrivalTimeString, flightArrivalDateTime, flightStatusText, transferDateTime, transferDateTimeString, } = reservation;
    let { flightNumber } = flightDetails
    if (typeof flightNumber === 'string' && flightNumber.length > 0) {
        let timeColor = undefined;
        let statusColor = undefined;

        if (flightStatusText === 'Undefined') {
            statusColor = 'google_color_red';
            timeColor = 'google_color_red';
        }
        if (flightStatusText === 'Estimated') {
            statusColor = 'google_color_blue';
            timeColor = 'google_color_blue';
        }
        if (flightStatusText === 'Scheduled') {
            statusColor = 'google_color_green';
            timeColor = 'google_color_green';

        }

        if (flightStatusText === 'Landed') {
            statusColor = 'google_color_blue';
            timeColor = 'google_color_blue';

        }

        return (
            <div style={{ cursor: 'pointer' }} onClick={onClick}>
                <p style={{ margin: 0, lineHeight: "18px" }}>{flightDetails?.flightNumber || ''}</p>
                <p className={statusColor} style={{ margin: 0, fontWeight: 'bolder', lineHeight: "18px" }}>{flightStatusText || ""}</p>
                <p className={timeColor} style={{ margin: 0, fontWeight: 'bolder', lineHeight: "18px" }}>{flightArrivalTimeString || ""}</p>
            </div>
        );
    } else {
        return <p style={{ margin: 0, color: 'silver' }}>NULL</p>;
    }
};

const MyBookings = (props) => {
    let { data, env } = props

    const router = useRouter()
    //tableState
    const [state, setstate] = React.useReducer((s, d) => ({ ...s, ...d }), { rows: 500, currentPage: 0, numberOfPages: null })
    const authReducerState = useSelector(state => state.authReducer);
    const [filteredDatas, setfilteredDatas] = useState([])
    const [loadingFilterData, setLoadingFilterData] = useState(false)
    //apply filterstate
    let [internalState, setInternalState] = React.useReducer((s, o) => ({ ...s, ...o }), {
        'startDate': currentDate({ dateValue: Date.now(), forwardDate: 0 }),
        'endDate': currentDate({ dateValue: Date.now(), forwardDate: 1 }),
        "dateSelector": 1,// 1: crated date 2: transfer date
        "sortedBy": "DESC",
        "passengerName": null,
        "passengerEmail": null,
        "reservationId": null,
        "accountRefId": null,
    })


    const [columns, setColumns] = useState([
        { placeHolderName: "Reference ID", id: 1, checked: false, inputFieldName: "accountRefId" },
        { placeHolderName: "Reservation ID", id: 2, checked: true, inputFieldName: "reservationId" },
        { placeHolderName: "Customer Email", id: 3, checked: false, inputFieldName: "passengerEmail" },
        { placeHolderName: "Customer Name", id: 4, checked: false, inputFieldName: "passengerName" },
    ])
    const [showInputSearchFields, setShowInputSearchFields] = useState(false)
    const timeoutRef = useRef(null);
    //!EDIT
    // let initialEditingCell = { isEditing: false, passengerName: null, email: null, type: "", reservationId: "", phone: null, editLoading: false, pax: null }
    let initialEditingCell = { isEditing: false, passengerName: null, email: null, reservationId: "", phone: null, editLoading: false, pax: null }
    const [editingCell, setEditingCell] = React.useReducer((s, d) => ({ ...s, ...d }), initialEditingCell);

    const stateReducer = useSelector((state) => state.pickUpDropOffActions)
    let { appData } = stateReducer

    const authReducer = useSelector((state) => state.authReducer)
    let { user } = authReducer
    let loginToken = user ? user["x-auth-token"] : ""
    let loginUserId = user ? user.id : ""
    React.useEffect(() => {
        if (typeof window === 'object' && window.socketIoApp === undefined) {
            const socket = io.connect(`${env.webSocketDomain}/?x-auth-token=${loginToken}`);
            window.socketIoApp = socket;
            window.socketIoApp.on('connect', () => {
                console.log(socket.id);
            })
            window.socketIoApp.on('connect_error', (error) => {
                console.log(error);
            })
            if (window.socketIoApp && typeof window.socketIoApp.on === 'function') {
                window.socketIoApp.on('new-reservations-updates', (log) => {
                    // handle updated details
                    //!handle reservation updated details directly to the client side .Such as   [passengerName,Phone,Pax]
                    console.log({ log })

                    const updatedReservations = log.reservations;
                    setfilteredDatas((prevDatas) => {

                        const updatedDatas = prevDatas.map((reservation) => {
                            const updatedReservation = updatedReservations.find((updRes) => updRes.reservationId === reservation.reservationId);
                            return updatedReservation ? { ...reservation, ...updatedReservation } : reservation;
                        });
                        return updatedDatas;
                    });

                })
            }
        }
        return () => {
            window.socketIoApp = undefined
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    //cartypes object for card item as {1:{image:'sds, name:Economy}}
    const carObject = appData?.carsTypes?.reduce((obj, item) => ({ ...obj, [item.id]: item, }), {});

    // const outsideClick = () => setShowInputSearchFields(false)
    const handleInputSeachFiledsQueryColumn = (e, id) => {
        // setColumns((prevColumns) => {
        //     return prevColumns.map((col) => {
        //         if (col.id === id) return { ...col, checked: e.target.checked };
        //         return col;
        //     });
        // });
        setColumns((prevColumns) => {
            return prevColumns.map((col) => {
                if (col.id === id) {
                    return { ...col, checked: e.target.checked };
                }
                return { ...col, checked: false };
            });
        });
        let newState = { "passengerName": null, "passengerEmail": null, "reservationId": null, "accountRefId": null };
        setInternalState(newState)

    };
    const generatePlaceholderText = () => {
        const selectedColumns = columns.filter((col) => col.checked).map((col) => col.placeHolderName);

        if (selectedColumns.length > 0) {
            return `${selectedColumns.join(', ')}`;
        } else {
            return 'Add Search Field Please';
        }
    };

    const onchangeDateHandler = (e) => {
        let { name, value } = e.target
        //if 04.04.2020 =>  it is adding 0nde day and return 05.04.2020
        let start = new Date(internalState["startDate"])
        let end = new Date(internalState["endDate"])
        if (name === 'startDate' && start > end) {
            setInternalState({ ["endDate"]: currentDate({ dateValue: value, forwardDate: 1 }), })
        }
        setInternalState({ [name]: value })
    }
    const selectorChangeHandler = (params = {}) => {
        let { e, name } = params
        let { value } = e.target
        if (name === 'dateSelector') {
            setInternalState({ [`dateSelector`]: value === 'Added Date' ? 1 : 2 })
        } else {
            setInternalState({ [`sortedBy`]: value === 'Descending' ? "DESC" : "ASC" })
        }
    }
    //setEditingCallback =>when i use handleFinishEdit i pass parametr like  applyFiltering(() => setEditingCell(initialEditingCell));
    //so it comes from handleFinishEdit() function
    const applyFiltering = () => {
        setLoadingFilterData(true)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let user = {}
        if (authReducerState.isAuthenticated) user = authReducerState.user
        let { startDate, endDate, dateSelector, sortedBy, passengerEmail, passengerName, accountRefId, reservationId } = internalState;
        let { ["x-auth-token"]: xAuthToken, id } = user


        //"x-auth-token": "fe2d4baa049b590ac4276d9e8e9f3227",
        //"user-id": "478",
        // let raw = {
        //     "user-id": id,
        //     "x-auth-token": xAuthToken,
        //     startDate: `${startDate} 00:00:00`,
        //     endDate: `${endDate} 23:59:59`,
        //     dateSelector,
        //     sortedBy,
        //     passengerName: passengerName ? passengerName : null,
        //     passengerEmail: passengerEmail ? passengerEmail : null,
        //     reservationId: +reservationId ? +reservationId : null,
        //     accountReferenceNumber: accountRefId ? accountRefId : null,
        // };
        let raw = {
            "user-id": id,
            "x-auth-token": xAuthToken,
            startDate: `${startDate} 00:00:00`,
            endDate: `${endDate} 23:59:59`,
            dateSelector,
            sortedBy,
            ...passengerName && { passengerName },
            ...passengerEmail && { passengerEmail },
            ...(reservationId && { reservationId }),
            ...accountRefId && { accountReferanceNumber: accountRefId }
        };

        var requestOptions = { method: 'POST', headers: myHeaders, body: JSON.stringify(raw) };
        let url = "/api/v1/corporate-account/reservation/search"
        fetch(`${env.apiDomain}${url}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setEditingCell(initialEditingCell);

                setLoadingFilterData(false)
                if (result.status === 200) {
                    setfilteredDatas(result.data.reservations)

                    if (result.data.reservations.length === 0) {
                        alert("Did not find any datas")
                    }
                } else {
                    setfilteredDatas([])
                    alert("Did not find any datas")
                }
            })
            .catch(error => {
                let message = "Agency MyBookings Component - apply filter fetching catch blog"
                window.handelErrorLogs(error, message, { raw })
                setEditingCell(initialEditingCell);
            });
    };


    const searchHandler = (searchString) => {
        // // Reset all fields initially
        // let newState = { "passengerName": null, "passengerEmail": null, "reservationId": null, "accountRefId": null };

        // columns.forEach((col) => {
        //     if (col.checked) {
        //         if (/^[0-9]+$/.test(searchString)) {
        //             //if the value of sarch value It is integer as string with length 6  and 7  => this is reservationId 
        //             //Passer Name 
        //             if (searchString.length === 6 && col.inputFieldName === "reservationId") {
        //                 newState["reservationId"] = searchString;
        //             } else if (col.inputFieldName === "accountRefId") {
        //                 newState["accountRefId"] = searchString;
        //             }
        //         }
        //         else if (searchString.includes("@") && col.inputFieldName === "passengerEmail") {
        //             newState["passengerEmail"] = searchString;
        //             newState["passengerName"] = null;
        //         }
        //         else if (col.inputFieldName === "passengerName") {
        //             newState["passengerEmail"] = null;
        //             newState["passengerName"] = searchString;
        //         }
        //         else if (searchString.includes('/') && col.inputFieldName === "accountRefId") {
        //             newState["accountRefId"] = searchString;
        //             newState["passengerEmail"] = null;
        //             newState["reservationId"] = null;
        //             newState["passengerName"] = null;
        //         }
        //     }
        // });
        // setInternalState(newState);
        // Yeni state başlangıçta tüm alanları null yapar
        let newState = { "passengerName": null, "passengerEmail": null, "reservationId": null, "accountRefId": null };

        columns.forEach((col) => {
            //id 2  => reservationId
            if (col.checked && col.id === 2) {

                let newR_id = searchString;

                // Split by comma and map the values
                let values = newR_id.split(',').map(value => value.trim());

                // Check if there's only one unique value
                if (values.length === 1 || (values.length > 1 && new Set(values).size === 1)) {
                    newR_id = values[0];
                } else {
                    newR_id = values.join(',');
                }


                newState[col.inputFieldName] = newR_id;

            }
            if (col.checked) {
                newState[col.inputFieldName] = searchString;
            }
        });

        setInternalState(newState);
    }

    //!EDIT

    // const handleStartEdit = (nameOfTableHead, valueOfTableHead, type, reservationId) => {
    //     setEditingCell({ [nameOfTableHead]: valueOfTableHead, type, isEditing: true, reservationId });
    // }

    const handleStartEdit = (reservation) => {
        let { reservationId, passengerName, pax, passengerPhone } = reservation
        setEditingCell({ phone: passengerPhone, passengerName, pax, isEditing: true, reservationId });
    }
    const handleCloseEdit = () => setEditingCell(initialEditingCell)
    const handleFinishEdit = () => {
        setEditingCell({ editLoading: true })
        //check validation
        if (!editingCell["pax"]) {
            return alert(`Pax is required*`)
        } else if (!editingCell["phone"]) {
            return alert(`Phone is required*`)
        } else if (!editingCell["passengerName"]) {
            return alert(`Full Name is required*`)
        }
        let { email, passengerName, reservationId, phone, pax } = editingCell
        let { ["x-auth-token"]: xAuthToken, id } = authReducerState.user

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let raw = { "user-id": id, "x-auth-token": xAuthToken, firstname: passengerName, email, reservationId, phone, pax: pax ? +pax : null };

        var requestOptions = { method: 'POST', headers: myHeaders, body: JSON.stringify(raw) };
        let url = "/api/v1/corporate-account/reservation/edit-passenger-details"



        fetch(`${env.apiDomain}${url}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log({ handlefinisheditResult: result });

                if (result.status === 200) {
                    applyFiltering();
                } else {
                    setEditingCell({ editLoading: false })
                    alert("Something went wrong try to contact with office")
                }
            })
            .catch(error => {
                let message = "Agency MyBookings Component - handleFinishEdit function catch blog"
                window.handelErrorLogs(error, message, { raw })
                setEditingCell(initialEditingCell);
            });

    };
    //Search label 
    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setShowInputSearchFields(true);
    };
    //Search label 
    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setShowInputSearchFields(false);
        }, 650); // 1 second delay
    };
    let { numberOfPages, currentPage, rows } = state;
    //flightStatusText
    //flightArrivalTimeString

    let DATA = filteredDatas.map((reservation) => {
        // let arrayofvalus = [reservation?.flightDetails?.flightNumber, reservation?.flightArrivalTimeString, reservation?.flightStatusText]
        return {
            'tr': { className: '' },
            'td': {
                'Id': ParagraphReactComponent({ value: reservation.reservationId }),
                'Account Ref. Num.': ParagraphReactComponent({ text: reservation.accountReferanceNumber }),
                'Customer Name': {
                    element: <InlineModalEditor
                        reservation={reservation}
                        isEditing={editingCell.isEditing && editingCell.reservationId === reservation.reservationId}//It only opens the edit of the area we clicked on.
                        onStartEdit={() => handleStartEdit(reservation)}
                        onFinishEdit={handleFinishEdit}
                        setEditingCell={setEditingCell}
                        editingCell={editingCell}
                        onCloseEditingCell={handleCloseEdit}
                        maxSuitcase={carObject[reservation?.carId]?.suitcases}

                    />,
                    component: 'ReactComponent', // type of content of cell
                    value: reservation.passengerName,
                    title: reservation.passengerName
                },
                'Pax': ParagraphReactComponent({ value: reservation.pax }),
                // 'Pax': {
                //     element: <InlineModalEditor
                //         type="select"
                //         reservation={reservation}
                //         isEditing={editingCell.isEditing && editingCell.type === 'select' && editingCell.reservationId === reservation.reservationId}//It only opens the edit of the area we clicked on.
                //         onStartEdit={() => handleStartEdit("pax", reservation.pax, 'select', reservation.reservationId)}
                //         onFinishEdit={handleFinishEdit}
                //         setEditingCell={setEditingCell}
                //         editingCell={editingCell}
                //         onCloseEditingCell={handleCloseEdit}
                //         editingCellFieldName="pax"
                //         maxSuitcase={carObject[reservation?.carId]?.suitcases}
                //     />,
                //     component: 'ReactComponent', // type of content of cell
                //     value: reservation.pax,
                //     title: 'Pax :' + reservation.pax
                // },

                "Pick-ip Point": ParagraphReactComponent({ value: reservation?.pickupPoints[0][2] }),
                "Drop-off Point": ParagraphReactComponent({ value: reservation?.dropoffPoints[0][2] }),
                "Transfer Date Time": ParagraphReactComponent({ value: reservation?.transferDateTimeString ? reservation.transferDateTimeString.split(" ")[0].split("-").reverse().join("-") + " " + reservation.transferDateTimeString.split(" ")[1] : '' }),
                // "Flight Number": ParagraphReactComponent({ value: arrayofvalus.join(' \n'), text: arrayofvalus }),
                "Flight Number": {
                    component: 'ReactComponent', // type of content of cell
                    'element': <ReservationFlightStatus reservation={reservation} />,
                    'value': `${reservation?.flightDetails?.flightNumber}  * ${reservation?.flightStatusText} * ${reservation?.flightArrivalTimeString}`,  //!spesific title
                    'title': `${reservation?.flightDetails?.flightNumber}  * ${reservation?.flightStatusText} * ${reservation?.flightArrivalTimeString}`,  //!spesific title
                },
                "Transfer Type": ParagraphReactComponent({ value: reservation?.transferTypeText }),
                "Car Type": ParagraphReactComponent({ value: reservation?.carName }),
                "Price": ParagraphReactComponent({ value: reservation?.journeyPrice }),
                "Added Date": ParagraphReactComponent({ value: reservation?.addedDateTimeString ? reservation.addedDateTimeString.split(" ")[0].split("-").reverse().join("-") + " " + reservation.addedDateTimeString.split(" ")[1] : '' }),
                "Order Status": ParagraphReactComponent({ value: reservation?.reservationStatusText, label: "" }),
                "Driver Status": {
                    component: 'ReactComponent', // type of content of cell
                    'element': <ModalDriverPopUp data={reservation} onClick={() => { console.log("sd") }} env={env} />,
                    'value': reservation.driverStatusText,
                    'text': "",  //!spesific title
                    'title': reservation.driverStatusText,//!for export excel**
                },
                'Options': { element: <InlineBookingEdition loginToken={loginToken} loginUserId={loginUserId} reservationId={reservation.reservationId} />, component: 'ReactComponent', value: "", title: "" },
            }
        }
    })
    useEffect(() => {
        applyFiltering()
    }, [])
    return (
        <Layout loggedIn={data} pageUrl={router.pathname}>
            <div className={`page ${styles.page} `}>
                <div className={`page_section ${styles.page_section} `}  >
                    <div className={`page_section_container ${styles.page_section_container} `} >
                        <div className={styles.title_div}>
                            {/* <h1> Booking History </h1> */}
                            <div className={styles.searching_area}>
                                <div>
                                    <div className={` ${styles.search_menu}`}>
                                        <label htmlFor="From Date"><p>From Date</p></label>
                                        <input className={styles.input} id="From Date" type="date" name="startDate" value={internalState["startDate"]} onChange={(e) => onchangeDateHandler(e)} />
                                        <i className={`fa-solid fa-calendar-days ${styles.date_picker_icon}`}></i>
                                    </div>
                                </div>
                                <div>
                                    <div className={` ${styles.search_menu}`}>
                                        <label htmlFor="End Date"><p>To Date</p></label>
                                        <input className={styles.input} id="End Date" type="date" name="endDate" value={internalState["endDate"]} onChange={(e) => onchangeDateHandler(e)} />
                                        <i className={`fa-solid fa-calendar-days ${styles.date_picker_icon}`}></i>
                                    </div>
                                </div>
                                <div>

                                    <div className={` ${styles.search_menu}`}>
                                        <label htmlFor="dateSelector"><p>Date  Selector</p></label>
                                        <select name="dateSelector" id="dateSelector" onChange={(e) => selectorChangeHandler({ e, name: 'dateSelector' })}>
                                            {[{ value: "Added Date" }, { value: "Transfer Date" }].map((arr, i) => { return <option key={i + 1} id={i} value={arr.value}  > {arr.value} </option> })}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <div className={` ${styles.search_menu}`}>
                                        <label htmlFor="sortingOrder"><p>Sorting </p></label>
                                        <select name="sortingOrder" id="sortingOrder" onChange={(e) => selectorChangeHandler({ e, name: 'sortedBy' })}>
                                            {[{ value: "Descending" }, { value: "Ascending" }].map((arr, i) => { return <option key={i + 1} id={i} value={arr.value}  > {arr.value} </option> })}
                                        </select>
                                    </div>
                                </div>
                                <OutsideClickAlert onOutsideClick={(e) => setShowInputSearchFields(false)} >
                                    <div className={` ${styles.search_menu} ${styles.search_input_div}`}>
                                        <label onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} htmlFor="Search" onClick={() => setShowInputSearchFields(!showInputSearchFields)}><p>Search</p></label>

                                        <input className={styles.input} id="Search" type="text" name="Search" onChange={(e) => searchHandler(e.target.value)} placeholder={generatePlaceholderText()} />
                                        {loadingFilterData ? <i>...</i> : <i onClick={applyFiltering} className="fa-solid fa-magnifying-glass"></i>}
                                        {showInputSearchFields ?
                                            <div className={styles.showfield_search_div} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                                {columns.map((col, index) => {
                                                    return (
                                                        <label key={index}>
                                                            <input type="checkbox" className={styles.showfield_query_input} checked={col.checked} onChange={(e) => handleInputSeachFiledsQueryColumn(e, col.id)} />
                                                            <span>{col.placeHolderName}</span>
                                                        </label>
                                                    )
                                                })}
                                            </div>
                                            : <></>}

                                    </div>
                                </OutsideClickAlert>
                            </div>
                        </div>
                        <div className={styles.tabs_container}>
                            <div className={styles.table}>
                                <DataTable
                                    setTableConfig={config => setstate({ ...config })} {...{ numberOfPages, currentPage, rows }}
                                    export={true}
                                    thead={
                                        ['Id',
                                            'Account Ref. Num',
                                            'Customer Name',
                                            'Pax',
                                            'Pick-ip Point',
                                            'Drop-off Point',
                                            'Transfer Date Time',
                                            'Flight Number',
                                            'Transfer Type',
                                            'Car Type',
                                            'Price',
                                            "Added Date",
                                            "Order Status",
                                            "Driver Status",
                                            "Options"
                                        ]}
                                    data={DATA}
                                />
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default MyBookings;
export async function getServerSideProps({ req, res }) {
    const { cookie } = req.headers;
    const cookies = parseCookies(cookie);

    // Check if the required cookie exists
    const verify = Boolean(cookies["user-id"]);

    if (!verify) {
        // If the cookie doesn't exist, redirect to home page
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    // If the cookie exists, proceed with rendering the page
    return {
        props: {
            data: verify,
        },
    };
}