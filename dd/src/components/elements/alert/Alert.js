import { useSelector } from 'react-redux'
import dynamic from 'next/dynamic'
const Toast = dynamic(() => import('./Toast'));
const Loading = dynamic(() => import('./Loading'));
const Alert = () => {
    const alert = useSelector((state) => state.alertReducer)

    return (
        <div>
            {alert.loading && <Loading />}
            {alert.errors && <Toast title="Errors" body={alert.errors} bgColor="alert_danger" />}
            {alert.success && <Toast title="Success" body={alert.success} bgColor="alert_success" />}
        </div>
    )
}

export default Alert
