import React, { useEffect, useRef } from "react";
import styles from "./styles.module.scss"

const AccountUserTable = ({ tableRef, columns, datas, onChangeEditHandler = () => { } }) => {
    const columnsRef = useRef(null);
    const initializeTableRefChildren = (filteredColumns) => {
        //adding children length to css variable
        columnsRef.current.style.setProperty("--bookingTableChildrenNumber", filteredColumns.length);
    };
    useEffect(() => {
        let filteredColumns = columns?.filter((col) => col.checked === true)
        initializeTableRefChildren(filteredColumns)
    }, [columns])

    const handleEdit = (params = {}) => {
        let { id } = params
        onChangeEditHandler({ id })
    }

    return (
        <>
            <div className={`${styles.table_wrapper}`}>
                <table ref={columnsRef} className={styles.table}>
                    <thead>
                        <tr className={`${styles.table_header_row}`}>
                            {columns
                                ?.filter((col) => col.checked === true)
                                ?.map((col) => {
                                    return (
                                        <th className={styles.be_sent} key={col.id}>
                                            <div>
                                                <span>{col.val}</span>
                                            </div>
                                        </th>
                                    );
                                })}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {datas
                                ?.filter((col) => col.checked === true)
                                ?.map((col, index) => {
                                    return (
                                        <td key={index} onClick={() => handleEdit({ id: col.id })} style={col.id === 9 ? { fontWeight: '500',cursor: 'pointer', color: "#3554D1",  } : {}}    >
                                            {col.val}
                                        </td>
                                    );
                                })}
                        </tr>
                    </tbody>
                </table>
            </div>
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    display: 'block',
                    zIndex: -1000,
                    width: 0,
                    height: 0,
                    overflow: 'hidden',
                }}
            >
                <div style={{ width: 1080, minHeight: 1000 }}>
                    <div className={styles.pdf_table_div}>
                        <table id="pdf_file" ref={tableRef}>
                            <thead>
                                <tr>
                                    {columns
                                        ?.filter((col) => col.checked === true)
                                        ?.map((col, _) => {
                                            return (
                                                <th className={styles.be_sent} key={col.id}>
                                                    {col.val}
                                                </th>
                                            );
                                        })}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {columns
                                        ?.filter((col) => col.checked === true)
                                        ?.map((_, index) => {
                                            return <td key={index}>888</td>;
                                        })}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );

};

export default AccountUserTable;
