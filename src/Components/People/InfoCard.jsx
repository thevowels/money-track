import Card from 'react-bootstrap/Card';

export default function InfoCard({title}){
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{title || 'Card Title'}</Card.Title>
                <Card.Text className="text-muted">
                    30000 MMK
                </Card.Text>
                <div className="row ">
                    <div className="col-6 text-end p-0">
                        5000
                    </div>
                    <div className="col-3 text-start ps-2">
                        THB
                    </div>
                    <div className="offset-1 col-2 text-center p-0">
                        ^
                    </div>
                </div>
                <Card.Subtitle className="mb-2 text-blue">Card Subtitle</Card.Subtitle>
            </Card.Body>
        </Card>
    )
}