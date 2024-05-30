import { styled } from '@mui/material/styles'
import { Container } from '@mui/material'

const FormContainer = styled('div')({
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
})


export default function FormPage({ children }) {
    return (
        <FormContainer>
            <Container sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    maxWidth: 'sm',
                    boxShadow: 3,
                    borderRadius: 4,
                }}>
                {children}
            </Container>
        </FormContainer>
    )
}