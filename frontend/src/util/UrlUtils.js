export function getQueryParams(search) {
    const url = search + "";
    console.log(`getQueryParams: ${url}`);
    const params = {};

    const paramStrings = url.split("?")[1].split("&");
    console.log("paramsStrings: " + paramStrings);

    // if (typeof(paramStrings) == 'string') 
    paramStrings.forEach(p => {
        const [key, value] = p.split("=");
        params[key] = value;
    });

    return params;
}