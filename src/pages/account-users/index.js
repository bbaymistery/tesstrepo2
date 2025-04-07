import React, { useEffect, useRef, useState } from 'react'

import Layout from '../../components/layouts/Layout';
import { getWindowDimensions } from '../../helpers/windowDimension';
import styles from "./styles.module.scss"
import { useRouter } from 'next/router';
import { DataTable, ParagraphReactComponent } from '../../components/elements/Datatable';
import UserModalStatus from '../../components/elements/UserModalStatus';

const AccountUsers = ({ data }) => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const router = useRouter()
    const [filteredDatas, setfilteredDatas] = useState([])
    const [state, setstate] = React.useReducer((s, d) => ({ ...s, ...d }), { rows: 500, currentPage: 0, numberOfPages: null })
    const [addUserModalStatus, setaddUserModalStatus] = useState(false)//for add user btn above the table
    let [internalState, setInternalState] = React.useReducer((s, o) => ({ ...s, ...o }), {
        '1': "",//id
        '2': "",//fullname
        "3": "",//email
        "4": "",//mainAccountName   --
        "5": "",// "All Agencies"  Acc Agency Name
        "6": "Account Admin",//Role
        // "7": "",//create date  =>buda orijinal saytda yoxdur (add user kisminda)
        "8": "Active",//status
        // "9": "",//Options,   =>bu olmuyacag cunki edit falan elemek ucundur
        "10": ""//for password When we click to add user or edit user
    })

    //todo
    const onChangeSearchHandler = (e) => {
        let { value, name } = e.target
    }

    const outsideClick = () => {
        setaddUserModalStatus(false)//close add user pop up
    }

    useEffect(() => {
        const handleResize = () => setWindowDimensions(getWindowDimensions());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    let { numberOfPages, currentPage, rows } = state;
    let DATA = filteredDatas.map((reservation) => ({
        'tr': { className: '' },
        'td': {
            'Id': ParagraphReactComponent({ value: reservation.reservationId }),
            'Full Name': ParagraphReactComponent({ text: reservation.accountReferanceNumber }),
            'Email': ParagraphReactComponent({ value: reservation.pax }),
            "Main Account Name": ParagraphReactComponent({ value: reservation?.pickupPoints[0][2] }),
            "Acc.Agency Name": ParagraphReactComponent({ value: reservation?.dropoffPoints[0][2] }),
            "Role": ParagraphReactComponent({ value: reservation?.transferDateTimeString }),
            "Created Date": ParagraphReactComponent({ value: reservation?.flightDetails?.flightNumber }),
            "Status": ParagraphReactComponent({ value: reservation?.transferTypeText }),
            "Edit": ParagraphReactComponent({ value: reservation?.carName }),
        }
    }))

    return (
        <Layout loggedIn={data} pageUrl={router.pathname}>
            <div className={`page ${styles.page} ${windowDimensions.width < 990 ? "ml_0" : "0"}`}>
                <div className={`page_section ${styles.page_section} `}  >
                    <div className={`page_section_container ${styles.page_section_container} `} >
                        {addUserModalStatus ?
                            <UserModalStatus
                                title="Add New User"
                                btnText="Add New User"
                                outsideClick={outsideClick}
                                internalState={internalState}
                                showModal={addUserModalStatus}
                                setInternalState={setInternalState}
                                closeModal={setaddUserModalStatus}
                            />
                            : <></>}
                        <div className={styles.tabs_container}>
                            <div className={styles.tabs_content_header}>
                                <div className={styles.add_new_user_btn_div}>
                                    <button onClick={() => setaddUserModalStatus(true)} >Add new user</button>
                                </div>
                                <div className={styles.search_div}>
                                    <input placeholder='Search User' type="text" onChange={onChangeSearchHandler} />
                                </div>
                            </div>

                            <div className={styles.table}>
                                < DataTable
                                    setTableConfig={config => setstate({ ...config })} {...{ numberOfPages, currentPage, rows }}
                                    export={true}
                                    thead={
                                        [
                                            'Id',
                                            'Full Name',
                                            'Email',
                                            'Main Account Name',
                                            'Acc.Agency Name',
                                            'Role',
                                            'Created Date',
                                            'Status',
                                            'Edit',
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

export default AccountUsers;
export async function getServerSideProps({ req, res }) {
    let verify = req.cookies["user-id"];

    return {
        props: {
            data: verify,
        },
    };
}