import { Container, Row, Col} from "react-bootstrap";
import { Navigasi } from "./Navigasi"
import gmbr from "./logo-masak.png";
import { useEffect, useState } from "react";
import { ListCourse } from "./ListCourse";
import { useHistory } from 'react-router-dom';

export const HalamanPengajar = () => {
    const history = useHistory();
    const [namaUser, setNamaUser] = useState('');

    useEffect(() => {
        const login = localStorage.getItem('dataLoginUser');
        if(!login){
            history.push('/');
            return;
        }
        const name = localStorage.getItem('dataNamaUser');
        setNamaUser(name);
    }, []);

    return (
        <>
            <Navigasi />
            <Container className="pt-5">
                <Row className="justify-content-center">
                    <Col sm={4}>
                        <h3 style={{ display: 'flex', justifyContent: 'center' }}>Selamat datang {namaUser}</h3>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img
                                alt=""
                                src={gmbr}
                                width="260"
                                height="200"
                            />
                        </div>
                    </Col>
                    <Col sm={8}>
                        <ListCourse/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}