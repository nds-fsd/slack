import { useEffect, useState } from "react";
import apiWrapper from './apiWrapper'
const useFetch = (path, method, body, isToken, query) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        apiWrapper(path, method, body, isToken, query)
            .then((data) => {
                setData(data);
                setLoading(false);
                setError(null);
            }
            )
            .catch((error) => {
                setError(error);
                setLoading(false);
            }
            )
    }, [path, method, body, isToken, query]);

    return { data, loading, error };
}
export default useFetch;