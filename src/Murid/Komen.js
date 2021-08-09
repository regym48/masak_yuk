import { useEffect, useState } from "react";
import { Form, ListGroup, Button } from 'react-bootstrap';
import swal from 'sweetalert';

export const Komen = () => {
    const [komen, setKomen] = useState('');
    const [dataKomen, setDataKomen] = useState([]);

    useEffect(() => {
        getDataKomen();
    }, []);

    const clearState = () => {
        setKomen('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('dataLoginUser');
        const idCo = localStorage.getItem('dataIdCourse');
        const name = localStorage.getItem('dataNamaUser');
        const dataSend = {
            token: token,
            id_course: idCo,
            nama_user: name,
            komen
        }
        fetch(`${process.env.REACT_APP_API}/tambahKomen`, {
            method: 'POST',
            body: JSON.stringify(dataSend),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json()).then(hasil => {
                console.log(hasil);
                if (hasil.status === 'berhasil') {
                    swal("success", 'Komentar Berhasil Ditambahkan', "success");
                    getDataKomen();
                    clearState();
                }
            })
            .catch(err => {
                alert(err)
            })
    }

    const getDataKomen = () => {
        const token = localStorage.getItem('dataLoginUser');
        const idCourse = localStorage.getItem('dataIdCourse');
        const senDataProg = {
            token: token,
            id_course: idCourse
        }
        fetch(`${process.env.REACT_APP_API}/listKomen`, {
            method: 'POST',
            body: JSON.stringify(senDataProg),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json()).then(proses => {
                console.log('data', proses);
                if (proses.status === 'berhasil') {
                    setDataKomen(proses.data);
                } else {
                    alert(proses.status);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <>
            <ListGroup as="ul">
                <ListGroup.Item as="li" active>
                    Dapur Diskusi
                </ListGroup.Item>
                {
                    dataKomen ? dataKomen.map((dat, index) => {
                        return (
                            <ListGroup.Item key={index} as="li">
                                <h5>{dat.nama_user}</h5>
                                <p>{dat.komen}</p>
                            </ListGroup.Item>
                        )
                    }) : ''
                }
                <Form>
                    <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Komentar Anda:</Form.Label>
                        <Form.Control value={komen} onChange={(e) => setKomen(e.target.value)} as="textarea" rows={3} />
                    </Form.Group>
                    <Button onClick={(e) => handleSubmit(e)} variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </ListGroup>


        </>
    )
}