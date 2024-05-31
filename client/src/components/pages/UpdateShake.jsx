import { useParams } from 'react-router-dom'
import axios from 'axios'

import { getToken } from '../../lib/auth'
import ShakeForm from '../subcomponents/ShakeForm'

export default function UpdateShake() {
    const { shakeId } = useParams()

    function request(formData){
        return axios.put(`/api/shakes/${shakeId}/`, formData, {
            headers: {
                Authorization: `Bearer ${getToken()}`
    }})}

    return (
        <ShakeForm  title='Update' request={request} onLoad={true} shakeId={shakeId} />
    )
}