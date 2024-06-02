import { useParams } from 'react-router-dom'
import axios from 'axios'

// Custom Components
import { getToken } from '../../lib/auth'
import ShakeBrief from "../subcomponents/ShakeBrief"

export default function Shake() {
    const { shakeId } = useParams()
    function request(formData){
        return axios.get(`/api/shakes/${shakeId}/`, formData, {
            headers: {
                Authorization: `Bearer ${getToken()}`
    }})}

    return (
        <ShakeBrief request={request} singleView={true}/>
    )
}