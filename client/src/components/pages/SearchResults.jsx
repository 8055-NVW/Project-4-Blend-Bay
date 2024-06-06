
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react'
import axios from 'axios'
// CUSTOM COMPONENTS
import ShakeBrief from '../subcomponents/ShakeBrief'

export default function SearchResults() {
    const location = useLocation()
    // set request useatate to handle no entry
    const [request, setRequest] = useState(() => () => axios.get('/api/shakes/'))
    //  used uselocation to get the search query from the url
    const searchParams = new URLSearchParams(location.search)
    // get the query from the search params
    const query = searchParams.get('q')

    useEffect(() => {
        if (query) {
            setRequest(() => () => axios.get(`/api/shakes/search/?q=${query}`));
        }
    }, [location.search, query]);

    return (
        <ShakeBrief request={request} searchQuery={query} />
    )
}