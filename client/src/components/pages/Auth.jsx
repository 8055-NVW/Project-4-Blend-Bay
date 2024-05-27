import GoogleButton from 'react-google-button'

export default function Auth() {
    return (
        <div>

            <h1>Auth Page</h1>

            <GoogleButton
                onClick={() => { console.log('Google button clicked') }}
            />

        </div>
    )
}