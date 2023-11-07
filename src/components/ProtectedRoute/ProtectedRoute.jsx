import { Navigate } from 'react-router-dom';

import { BASE_PAGE } from '../../utils/constants.jsx';

const ProtectedRoute = ({ element: Component, ...props }) => {
    return (
        props.isLoggedIn ?
            <Component {...props} /> : <Navigate to={BASE_PAGE} replace />
    )
}

export default ProtectedRoute;
