import { Spinner } from 'react-bootstrap'

const Loader = () => {
    return (
        <Spinner
            animation="border"
            variant="primary"
            style={{
                width: '100px',
                height: '100px',
                margin: 'auto',
                display: 'block',
                color: 'black'
            }
            } />

    )
}

export default Loader