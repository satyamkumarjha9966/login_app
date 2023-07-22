import axios from "axios";
import { useEffect, useState } from "react";
import { getUsername } from "../helper/helper";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

// Making Custome Hook = show that starting name with use
export default function useFetch(query) {

    const [getData, SetData] = useState({isLoading : false, apiData : undefined, status : null, serverError : null});

    useEffect(() => {

        const fetchData = async () => {
            try {
                SetData(prev => ({...prev, isLoading: true}));

                const {username} = !query ? await getUsername() : "";

                const {data, status} = !query ? await axios.get(`/api/user/${username}`) : await axios.get(`/api/${query}`);

                if (status === 201) {
                    SetData(prev => ({...prev, isLoading: false}));
                    SetData(prev => ({...prev, apiData: data, status: status}));
                }

                SetData(prev => ({...prev, isLoading: false}));

            } catch (error) {
                SetData(prev => ({...prev, isLoading: false, serverError: error}));
            }
        };
        fetchData()
    }, [query]);

    return [getData, SetData]
};