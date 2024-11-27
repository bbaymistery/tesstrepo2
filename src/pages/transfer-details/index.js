import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LinkBreadCumb from "../../components/elements/LinkBreadcumb";
import Layout from "../../components/layouts/Layout";
import {
  checkingGoToNextPage,
  dropHandlingsTransfer,
  onewayDroopOffPointsOneWay,
  onewayPickUpPointsOneWay,
  pickUpHandlingsTransfer,
  returnDropHandling,
  returnDropOffPointsReturn,
  returnPassengerEmail,
  returnPassengerFullName,
  returnPassengerNumber,
  returnPassengerPhone,
  returnPickupHandling,
  returnPickUpPointsReturn,
  selectCHheckedInput,
  selectedReturnQuot,
  selectedTransferQuot,
  selectHandlingInputs,
  transferComment,
  transferPassengerEmail,
  transferPassengerFullName,
  transferPassengerPhone,
  transferPassengersNumber,
} from "../../store/pickUpDropOffReducer/pickUpDropSelectors";
import styles from "./styles.module.scss";
import PassnegerDetails from "../../components/elements/TDP_PassengerDetails";
import TransferSummarizeLeft from "../../components/elements/TDP_JourneySummary";
import TransferJourneyDetails from "../../components/elements/TDP_JorneyDetails";
import InfoModal from "../../components/elements/InfoModal/InfoModal";
import { waitingModalInfo } from "../../store/showFieldReducer/showFieldSelectors";
import LeftRightButton from "../../components/elements/LeftRightButtons";
import TextArea from "../../components/elements/TextArea";

import CheckBox from "./CheckBox";
import {
  CHECK_JOURNEY_DETAILS_TO_GO_NEXT_PAGE,
  SET_ERROR_IN_RETURN_DETAILS_PAGE,
  SET_ERROR_IN_TRANSFER_DETAILS_PAGE,
  UPDATE_SPECIAL_REQUEST,
} from "../../store/pickUpDropOffReducer/pickUpDropTypes";
import { useRouter } from "next/router";
import { useConfirm } from "../../hooks/useConfirm";
const TransferDetails = (props) => {
  let { env } = props
  const dispatch = useDispatch();
 

  const waitinggModalInfo = useSelector(waitingModalInfo);
  const selectcheckingGoToNextPage = useSelector(checkingGoToNextPage);
  const checkedInput = useSelector(selectCHheckedInput);
  const selectedHandlingInputs = useSelector(selectHandlingInputs); //pickupime flightnumber handling
  //transfer pick drop items
  const TransferQuot = useSelector(selectedTransferQuot);
  const selectedPickUpsOneWay = useSelector(onewayPickUpPointsOneWay);
  const selectedDropOffOneWay = useSelector(onewayDroopOffPointsOneWay);
  const trSpecialRequest = useSelector(transferComment)
  const selectPassengersNumber = useSelector(transferPassengersNumber);
  const fullName = useSelector(transferPassengerFullName);
  const email = useSelector(transferPassengerEmail);
  const phone = useSelector(transferPassengerPhone);

  //return pick drop items
  const returnPickUpPoints = useSelector(returnPickUpPointsReturn);
  const returnDropOffPoints = useSelector(returnDropOffPointsReturn);
  const returnQuot = useSelector(selectedReturnQuot);
  const selectreturnPassengerNumber = useSelector(returnPassengerNumber);
  const selectPickTransferHandling = useSelector(pickUpHandlingsTransfer);
  const selectDroptransferHandling = useSelector(dropHandlingsTransfer);
  const selectreturnPcikHandling = useSelector(returnPickupHandling);
  const selectreturnDropHandling = useSelector(returnDropHandling);
  const returnFullName = useSelector(returnPassengerFullName);
  const returnEmail = useSelector(returnPassengerEmail);
  const returnPhone = useSelector(returnPassengerPhone);

  const returnSpecialRequest = useSelector(transferComment)


  const [crumbs, setCrumbs] = useState([
    { linkName: "/", name: "home" },
    { linkName: "/quotation", name: "Airport Transfer Quotations" },
    { linkName: "/transfer-details", name: "Airport Transfer Details" },
  ]);
  const router = useRouter();


  //handling passenher details
  const [handleInputs, setHandleInputs] = useState({
    firstname: fullName.length > 0 ? fullName : "",
    firstnameError: "",
    firstNameFocused: false,
    email: email.length > 0 ? email : "",
    emailError: "",
    emailFocused: false,
    phone: phone.length > 0 ? phone : "",
    phoneError: "",
    phoneFocused: false,
    passengersNumber: selectPassengersNumber, //it is gonna bu Number
  });
  const [handleTextArea, setHandleTextArea] = useState({
    transfer: trSpecialRequest.length > 0 ? trSpecialRequest : "",
    return: returnSpecialRequest.length > 0 ? returnSpecialRequest : "",
  });
  //setHandling inpts for return passenger details
  //handling passenher details
  const [handleInputsReturn, setHandleInputsReturn] = useState({
    firstname: returnFullName.length > 0 ? returnFullName : "",
    firstnameError: "",
    firstNameFocused: false,
    email: returnEmail.length > 0 ? returnEmail : "",
    emailError: "",
    emailFocused: false,
    phone: returnPhone.length > 0 ? returnPhone : "",
    phoneError: "",
    phoneFocused: false,
    passengersNumber: selectreturnPassengerNumber, //it is gonna bu Number
  });

  const confirmationAlert = useConfirm({ previousUrl: "/quotation", nextUrl: "/payment", message: "If you leave the page, all data will be deleted." })
  const gotoNextPage = (e) => {
    //'gfhgfh@hkjhkj.com'.split('@').length===2 && 'gfhgfh@hkjhkj.com'.split('@')[1].split('.').length === 2
    //yani eger asagidakilar true ise demeli error yoxdur

    let fL = handleInputs.firstname.length > 0;
    let eL = handleInputs.email.includes("@") && !handleInputs.email.includes(' ');
    let pL = handleInputs.phone.length > 0;

    //return passenger details
    let rfL = !checkedInput ? handleInputsReturn.firstname.length > 0 : true;
    let reL = !checkedInput
      ? handleInputsReturn.email.includes("@") && !handleInputsReturn.email.includes(' ')
      : true;
    let rpL = !checkedInput ? handleInputsReturn.phone.length > 0 : true;
    //handlingError of passenger details
    if (!fL || !pL || !eL || !rfL || !reL || !rpL) {
      setHandleInputs((values) => ({
        ...values,
        firstnameError: !fL ? "required" : "",
        phoneError: !pL ? "required" : "",
        emailError: !eL ? "required" : "",
      }));

      if (!checkedInput) {
        setHandleInputsReturn((values) => ({
          ...values,
          firstnameError: !rfL ? "required" : "",
          phoneError: !rpL ? "required" : "",
          emailError: !reL ? "required" : "",
        }));
      }
    }
    if (pL && eL && fL && reL && rfL && rpL) {

      dispatch({ type: CHECK_JOURNEY_DETAILS_TO_GO_NEXT_PAGE, payload: true });
    } else {
      dispatch({
        type: CHECK_JOURNEY_DETAILS_TO_GO_NEXT_PAGE,
        payload: false,
      });
    }
    //bu error sadece flight ile ilgili inut boslugunda olusucak
    //*checking flights length start
    selectPickTransferHandling.map((each, i) => {
      if (each?.flightDetails?.flightNumber?.length < 1) {
        dispatch({
          type: SET_ERROR_IN_TRANSFER_DETAILS_PAGE,
          payload: {
            erMessage: "required",
            jourrneyType: "transfer",
            categoryOfError: "flightCategory",
            whichSelectedItem: i,
          },
        });
        dispatch({
          type: CHECK_JOURNEY_DETAILS_TO_GO_NEXT_PAGE,
          payload: false,
        });
      } else {
        dispatch({
          type: SET_ERROR_IN_TRANSFER_DETAILS_PAGE,
          payload: {
            erMessage: "",
            jourrneyType: "transfer",
            categoryOfError: "flightCategory",
            whichSelectedItem: i,
          },
        });
      }
    });
    selectPickTransferHandling.map((each, i) => {

      if (each?.waitingMinute.length === 0) {

        // alert("wainting.is length", each?.waitingMinute.length)
        dispatch({
          type: SET_ERROR_IN_TRANSFER_DETAILS_PAGE,
          payload: {
            erMessage: "required",
            jourrneyType: "transfer",
            categoryOfError: "flightCategory_Waiting",
            whichSelectedItem: i,
          },
        });
        dispatch({
          type: CHECK_JOURNEY_DETAILS_TO_GO_NEXT_PAGE,
          payload: false,
        });
      } else {
        dispatch({
          type: SET_ERROR_IN_TRANSFER_DETAILS_PAGE,
          payload: {
            erMessage: "",
            jourrneyType: "transfer",
            categoryOfError: "flightCategory_Waiting",
            whichSelectedItem: i,
          },
        });
      }
    });
    //burda eger returndeki pick upoints varsa icindekilerin biri bos ise error verir
    selectreturnPcikHandling.map((each, i) => {
      if (each?.flightDetails?.flightNumber?.length < 1) {
        dispatch({
          type: SET_ERROR_IN_RETURN_DETAILS_PAGE,
          payload: {
            erMessage: "required",
            jourrneyType: "return",
            categoryOfError: "flightCategory",
            whichSelectedItem: i,
          },
        });
        dispatch({
          type: CHECK_JOURNEY_DETAILS_TO_GO_NEXT_PAGE,
          payload: false,
        });
      } else {
        dispatch({
          type: SET_ERROR_IN_RETURN_DETAILS_PAGE,
          payload: {
            erMessage: "",
            jourrneyType: "return",
            categoryOfError: "flightCategory",
            whichSelectedItem: i,
          },
        });
      }
    });
    selectreturnPcikHandling.map((each, i) => {
      if (each?.waitingMinute.length === 0) {
        dispatch({
          type: SET_ERROR_IN_RETURN_DETAILS_PAGE,
          payload: {
            erMessage: "required",
            jourrneyType: "return",
            categoryOfError: "flightCategory_Waiting",
            whichSelectedItem: i,
          },
        });
        dispatch({
          type: CHECK_JOURNEY_DETAILS_TO_GO_NEXT_PAGE,
          payload: false,
        });
      } else {
        dispatch({
          type: SET_ERROR_IN_RETURN_DETAILS_PAGE,
          payload: {
            erMessage: "",
            jourrneyType: "return",
            categoryOfError: "flightCategory_Waiting",
            whichSelectedItem: i,
          },
        });
      }
    });




    //
    //*postss start
    selectPickTransferHandling.map((each, i) => {
      if (each?.postCodeDetails?.postCodeAddress?.length < 1) {
        dispatch({
          type: SET_ERROR_IN_TRANSFER_DETAILS_PAGE,
          payload: {
            erMessage: "required",
            jourrneyType: "transfer",
            categoryOfError: "postCategory",
            whichSelectedItem: i,
          },
        });
        dispatch({
          type: CHECK_JOURNEY_DETAILS_TO_GO_NEXT_PAGE,
          payload: false,
        });
      } else {
        dispatch({
          type: SET_ERROR_IN_TRANSFER_DETAILS_PAGE,
          payload: {
            erMessage: "",
            jourrneyType: "transfer",
            categoryOfError: "postCategory",
            whichSelectedItem: i,
          },
        });
      }
    });
    selectDroptransferHandling.map((each, i) => {
      if (each?.postCodeDetails?.postCodeAddress?.length < 1) {
        dispatch({
          type: SET_ERROR_IN_TRANSFER_DETAILS_PAGE,
          payload: {
            erMessage: "required",
            jourrneyType: "transfertwo",
            categoryOfError: "postCategory",
            whichSelectedItem: i,
          },
        });
        dispatch({
          type: CHECK_JOURNEY_DETAILS_TO_GO_NEXT_PAGE,
          payload: false,
        });
      } else {
        dispatch({
          type: SET_ERROR_IN_TRANSFER_DETAILS_PAGE,
          payload: {
            erMessage: "",
            jourrneyType: "transfertwo",
            categoryOfError: "postCategory",
            whichSelectedItem: i,
          },
        });
      }
    });
    //burda eger returndeki pick upoints varsa icindekilerin biri bos ise error verir
    selectreturnPcikHandling.map((each, i) => {
      if (each?.postCodeDetails?.postCodeAddress?.length < 1) {
        dispatch({
          type: SET_ERROR_IN_RETURN_DETAILS_PAGE,
          payload: {
            erMessage: "required",
            jourrneyType: "return",
            categoryOfError: "postCategory",
            whichSelectedItem: i,
          },
        });
        dispatch({
          type: CHECK_JOURNEY_DETAILS_TO_GO_NEXT_PAGE,
          payload: false,
        });
      } else {
        dispatch({
          type: SET_ERROR_IN_RETURN_DETAILS_PAGE,
          payload: {
            erMessage: "",
            jourrneyType: "return",
            categoryOfError: "postCategory",
            whichSelectedItem: i,
          },
        });
      }
    });
    selectreturnDropHandling.map((each, i) => {
      if (each?.postCodeDetails?.postCodeAddress?.length < 1) {
        dispatch({
          type: SET_ERROR_IN_RETURN_DETAILS_PAGE,
          payload: {
            erMessage: "required",
            jourrneyType: "returntwo",
            categoryOfError: "postCategory",
            whichSelectedItem: i,
          },
        });
        dispatch({
          type: CHECK_JOURNEY_DETAILS_TO_GO_NEXT_PAGE,
          payload: false,
        });
      } else {
        dispatch({
          type: SET_ERROR_IN_RETURN_DETAILS_PAGE,
          payload: {
            erMessage: "",
            jourrneyType: "returntwo",
            categoryOfError: "postCategory",
            whichSelectedItem: i,
          },
        });
      }
    });
    //*post finisfh

    //*checking flights length finish
    //*cruise start
    selectPickTransferHandling.map((each, i) => {
      if (each?.cruiseNumber?.length < 1) {
        dispatch({
          type: SET_ERROR_IN_TRANSFER_DETAILS_PAGE,
          payload: {
            erMessage: "required",
            jourrneyType: "transfer",
            categoryOfError: "cruise",
            whichSelectedItem: i,
          },
        });
        dispatch({
          type: CHECK_JOURNEY_DETAILS_TO_GO_NEXT_PAGE,
          payload: false,
        });
      } else {
        dispatch({
          type: SET_ERROR_IN_TRANSFER_DETAILS_PAGE,
          payload: {
            erMessage: "",
            jourrneyType: "transfer",
            categoryOfError: "cruise",
            whichSelectedItem: i,
          },
        });
      }
    });
    //burda eger returndeki pick upoints varsa icindekilerin biri bos ise error verir
    selectreturnPcikHandling.map((each, i) => {
      if (each?.cruiseNumber?.length < 1) {
        dispatch({
          type: SET_ERROR_IN_RETURN_DETAILS_PAGE,
          payload: {
            erMessage: "required",
            jourrneyType: "return",
            categoryOfError: "cruise",
            whichSelectedItem: i,
          },
        });
        dispatch({
          type: CHECK_JOURNEY_DETAILS_TO_GO_NEXT_PAGE,
          payload: false,
        });
      } else {
        dispatch({
          type: SET_ERROR_IN_RETURN_DETAILS_PAGE,
          payload: {
            erMessage: "",
            jourrneyType: "return",
            categoryOfError: "cruise",
            whichSelectedItem: i,
          },
        });
      }
    });

    //*cruise finish
  };

  const handleChangeTextArea = (e, journeyType) => {
    if (
      e.target.value.includes('"')
      || e.target.value.includes(`'`)
      || e.target.value.includes('/')
      || e.target.value.includes('\\')
    ) {
      return
    } else {


      setHandleTextArea((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
      dispatch({
        type: UPDATE_SPECIAL_REQUEST,
        payload: { value: e.target.value, journeyType },
      });
    }
  };

  useEffect(() => {
    if (selectcheckingGoToNextPage) {
      // alert("tm")
      let arrayForChecking = [
        ...selectPickTransferHandling,
        ...selectDroptransferHandling,
        ...selectreturnPcikHandling,
        ...selectreturnDropHandling,
      ];

      let checkForInsideInputs = arrayForChecking.every((each) => {
        return each?.errorMessage.length < 1;
      });
      let checkInsiDEinputsForWaiiting = arrayForChecking.every((each) => {
        return each?.waitingMinute.length > 0;
      });

      let s = arrayForChecking.map((each) => {
        return each?.waitingMinute.length > 0;
      });



      if (checkForInsideInputs && checkInsiDEinputsForWaiiting) {
        router?.push("/payment");
        dispatch({
          type: CHECK_JOURNEY_DETAILS_TO_GO_NEXT_PAGE,
          payload: false,
        });
      }
    }
  }, [selectcheckingGoToNextPage, selectHandlingInputs]);
  useEffect(() => {
    if (!checkedInput) {
      window.scrollTo({
        top: 755,
        left: 0,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: 156,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [checkedInput]);

  return (
    <>
      <Layout title="Transfer Details London Taxi">
        <div className={`page ${styles.tr_page}`}>
          {waitinggModalInfo && (
            <InfoModal content="Please note that on international flights, for UK and EU Citizens the average clearing time is around 45 to 60 minutes except for first & business class travellers where it is 30-45 minutes. Other nationalities take around 60-70 minutes and foreign students may take up to 90 minutes. For domestic flight, the clearance time is around 15 minutes" />
          )}
          <div className={`page_section ${styles.tr_page_section}`}>
            <div
              className={`page_section_container ${styles.tr_page_section_container}`}
            >
              <LinkBreadCumb crumbs={crumbs} />

              <div className={styles.content}>
                {/* burasi styles.left olandi */}
                <div className={styles.content_left}>
                  <TransferSummarizeLeft
                    title="Transfer Details"
                    journeyType={0}
                    showPrice={false}
                    env={env}
                  />
                  {returnPickUpPoints.length > 0 &&
                    returnDropOffPoints.length > 0 && (
                      <TransferSummarizeLeft
                        title="Return Journey"
                        journeyType={1}
                        showPrice={true}
                        env={env}

                      />
                    )}
                </div>

                <div className={styles.right}>
                  <PassnegerDetails
                    handleInputs={handleInputs}
                    setHandleInputs={setHandleInputs}
                    quot={TransferQuot}
                    passNumber={selectPassengersNumber}
                    title="Passenger Details"
                    journeyType={0}
                  />
                  <TransferJourneyDetails
                    pickUps={selectedPickUpsOneWay}
                    drops={selectedDropOffOneWay}
                    journeyTitle={returnPickUpPoints.length > 0 ? "Transfer Journey Details" : "Journey Details"}
                    journeyType={0}
                    env={env}
                    pickupHandlings={selectPickTransferHandling}
                    dropHandlings={selectDroptransferHandling}
                  />
                  <div className={`${styles.special_request_div}`}>
                    <div className={styles.special_div}>
                      <TextArea
                        name="transfer"
                        icon="pen-to-square"
                        value={handleTextArea.transfer}
                        onChange={(e) => handleChangeTextArea(e, 0)}
                        title="Special Request "
                      />
                    </div>
                  </div>
                  {!checkedInput && (
                    <PassnegerDetails
                      handleInputs={handleInputsReturn}
                      setHandleInputs={setHandleInputsReturn}
                      quot={returnQuot}
                      passNumber={selectreturnPassengerNumber}
                      title="Passenger Details For Return Journey"
                      journeyType={1}
                      animation={true}
                    />
                  )}
                  {/*//! return  */}
                  {returnPickUpPoints.length > 0 &&
                    returnDropOffPoints.length > 0 && (
                      <TransferJourneyDetails
                        pickUps={returnPickUpPoints}
                        drops={returnDropOffPoints}
                        journeyTitle="Return Journey Details"
                        journeyType={1}
                        marginTop={true}
                        env={env}
                        pickupHandlings={
                          selectedHandlingInputs[1].returnPcikHandling
                        }
                        dropHandlings={
                          selectedHandlingInputs[1].returndropHandling
                        }
                      />
                    )}
                  {returnPickUpPoints.length > 0 &&
                    returnDropOffPoints.length > 0 && (
                      <div className={`${styles.special_request_div}`}>
                        <div className={styles.special_div}>
                          <TextArea
                            name="return"
                            icon="pen-to-square"
                            value={handleTextArea.return}
                            onChange={(e) => handleChangeTextArea(e, 1)}
                            title="Special Request "
                          />
                        </div>
                      </div>
                    )}
                  {returnDropOffPoints.length > 0 &&
                    returnDropOffPoints.length > 0 && <CheckBox />}
                  <LeftRightButton
                    linkToBack="/quotation"
                    styleForTransferDetails={true}
                    leftBtnTitle="Previous"
                    rightBtnTitle="Next"
                    gotoNextPage={gotoNextPage} //check up elemesi icin bu fonksyonu gonderik
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
// ..

//background-color: #efefef;
//https: //api.london-tech.com/media/i/angle-double-right/efefef
export default TransferDetails;
export async function getServerSideProps({ req, res }) {
  if (req.url === "/transfer-details") {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }
  return {
    props: {
      data: "",
    },
  };
}
