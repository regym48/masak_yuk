import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { Container, Card, Form, Button } from 'react-bootstrap';
import logo from "./logo-masak.png"
import swal from 'sweetalert';
import { Navigasi } from "./Navigasi";

export const ListVideoPengajar = () => {
    const history = useHistory();
    const [dataListCourse, setDataListCourse] = useState([]);
    const [judulVideo, setJudulVideo] = useState('');
    const [thumbnailVideo, setThumbnailVideo] = useState('');
    const [linkVideo, setLinkVideo] = useState('');
    const [idCou, setIdCou] = useState('');
    const [deskripsi, setDeskripsi] = useState('');

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
        setJudulVideo('');
        setThumbnailVideo('');
        setLinkVideo('');
        setDeskripsi('');
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
                    swal("failed", hasil.message, "error")
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
            judul_video: judulVideo,
            thumbnail_video: thumbnailVideo,
            link_video: linkVideo,
            deskripsi: deskripsi
        }
        if (idCou === '' || judulVideo === '' ||thumbnailVideo === '' || linkVideo === '' || deskripsi === '' ) {
            swal("Failed", "Semua Data Harus Diisi!", "error")
        } else {
            fetch(`${process.env.REACT_APP_API}/tambahVideo`, {
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
                        <h4>Tambah Video</h4>
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Judul Video</Form.Label>
                                <input onChange={(e) => setJudulVideo(e.target.value)} type="text" className="form-control" placeholder="Judul Video"></input>
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
                                <Form.Label>Thumbnail Video</Form.Label>
                                <input onChange={(e) => setThumbnailVideo(e.target.value)} type="text" className="form-control" placeholder="Thumbnail Video"></input>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Link Video</Form.Label>
                                <input onChange={(e) => setLinkVideo(e.target.value)} type="text" className="form-control" placeholder="Link Video"></input>
                            </Form.Group>
                            <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Deskripsi Video</Form.Label>
                                <Form.Control onChange={(e) => setDeskripsi(e.target.value)} as="textarea" rows={3} />
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