import { Redirect } from "react-router";
import { getQueryParams } from "../../../util/UrlUtils";

function Callback(props) {
    const params = getQueryParams(props.location.search);

    console.log(`query params: ${JSON.stringify(params)}`);

    const { token } = params;
    if (token) localStorage.setItem('access-token', token);

    return <Redirect to="/" />
}

export default Callback;