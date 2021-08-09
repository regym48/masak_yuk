import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { Container, Card, Form, Button } from 'react-bootstrap';
import logo from "./logo-masak.png"
import swal from 'sweetalert';
import { Navigasi } from "./Navigasi";

export const ListSoalPengajar = () => {
    const history = useHistory();
    const [dataListCourse, setDataListCourse] = useState([]);
    const [idCou, setIdCou] = useState('');
    const [pertanyaan, setpertanyaan] = useState('');
    const [opsi1, setopsi1] = useState('');
    const [opsi2, setopsi2] = useState('');
    const [opsi3, setopsi3] = useState('');
    const [opsi4, setopsi4] = useState('');
    const [jawaban, setjawaban] = useState('');

    useEffect(() => {
        const login = localStorage.getItem('dataLoginUser');
        if (!login) {
            history.push('/');
            return;
        }
        getDataCourse();
        clearState();
    }, []);

    const clearState = () => {
        setpertanyaan('');
        setopsi1('');
        setopsi2('');
        setopsi3('');
        setopsi4('');
        setjawaban('');
    }

    const getDataCourse = () => {
        const token = localStorage.getItem('dataLoginUser');
        const senData = {
            token: token
        }
        fetch(`${process.env.REACT_APP_API}/listCourse`, {
            method: 'POST',
            body: JSON.stringify(senData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json()).then(hasil => {
                console.log('data', hasil);
                if (hasil.status === 'berhasil') {
                    setDataListCourse(hasil.data);
                } else {
                    <p>data gagal diambil</p>
                }
            })
            .catch(err => {
                alert(err)
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('dataLoginUser');
        const dataSend = {
            token: token,
            id_course: idCou,
            pertanyaan: pertanyaan,
            opsi1: opsi1,
            opsi2: opsi2,
            opsi3: opsi3,
            opsi4: opsi4,
            jawaban: jawaban
        }
        if (idCou === '' || pertanyaan === '' ||opsi1 === '' || opsi2 === '' || opsi3 === '' || opsi4 === '' || jawaban === '') {
            swal("Failed", "Semua Data Harus Diisi!", "error")
        } else {
            fetch(`${process.env.REACT_APP_API}/tambahSoal`, {
                method: 'POST',
                body: JSON.stringify(dataSend),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json()).then(hasil => {
                    console.log(hasil);
                    if (hasil.status === 'berhasil') {
                        swal("success", hasil.message, "success")
                        clearState();
                    }else{
                        swal("failed", hasil.message, "error")
                        clearState();
                    }
                })
                .catch(err => {
                    alert(err)
                })
        }
    }

    return (
        <>
            <Navigasi/>
            <div className="text-center mb-10">
                <img
                    alt=""
                    src={logo}
                    width="400"
                    height="250"

                />
            </div>
            <Container className="justify-content-center">
                <Card>
                    <Card.Header>
                        <h4>Tambah Soal</h4>
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Pertanyaan</Form.Label>
                                <Form.Control onChange={(e) => setpertanyaan(e.target.value)} as="textarea" rows={3} />
                            </Form.Group>
                            <Form.Select className="mb-3" onChange={(e) => setIdCou(e.target.value)} aria-label="Default select example">
                                <option selected value="">--Pilih Course--</option>
                                {
                                    dataListCourse ? dataListCourse.map((dat, index) => {
                                        return (
                                            <option key={index} value={dat.id_course}>{dat.nama_course}</option>
                                        )
                                    }) : ''
                                }
                            </Form.Select>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Opsi 1</Form.Label>
                                <input onChange={(e) => setopsi1(e.target.value)} type="text" className="form-control"></input>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Opsi 2</Form.Label>
                                <input onChange={(e) => setopsi2(e.target.value)} type="text" className="form-control"></input>
                            </Form.Group>
                            <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Opsi 3</Form.Label>
                                <input onChange={(e) => setopsi3(e.target.value)} type="text" className="form-control"></input>
                            </Form.Group>
                            <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Opsi 4</Form.Label>
                                <input onChange={(e) => setopsi4(e.target.value)} type="text" className="form-control"></input>
                            </Form.Group>
                            <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Jawaban</Form.Label>
                                <input onChange={(e) => setjawaban(e.target.value)} type="text" className="form-control"></input>
                            </Form.Group>
                            <Button onClick={(e) => handleSubmit(e)} variant="primary" type="submit">
                                Tambahkan
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}