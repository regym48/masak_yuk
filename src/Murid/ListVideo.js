import { Modal, Container, Button, Breadcrumb, Row, Col, Form } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { Navigasi } from "./Navigasi";
import { Komen } from './Komen';
import ReactPlayer from 'react-player/lazy';

export const ListVideo = () => {
    const history = useHistory();
    const [dataListVideo, setDataListVideo] = useState([]);
    const [dataListProgress, setDataListProgress] = useState('');
    const [dataIndexVid, setDataIndexVid] = useState('');
    const [handleShowVideo, setHandleShowVideo] = useState(false);
    const [linkVideo, setLinkVideo] = useState('')
    const [namaLinkVideo, setNamaLinkVideo] = useState('');
    const [deskripsi, setDeskripsi] = useState('');

    useEffect(() => {
        const login = localStorage.getItem('dataLoginUser');
        if (!login) {
            history.push('/');
        }
        getDataVideo();
        getDataProgress();
    }, []);

    const handleClose = () => {
        setHandleShowVideo(false);
    }

    const getDataProgress = () => {
        const token = localStorage.getItem('dataLoginUser');
        const idCourse = localStorage.getItem('dataIdCourse');
        const idUs = localStorage.getItem('dataIdUser');
        // const indux = localStorage.getItem('dataIndexVideo');
        const senDataProg = {
            token: token,
            id_course: idCourse,
            id_user: idUs
        }
        fetch(`${process.env.REACT_APP_API}/listProgress`, {
            method: 'POST',
            body: JSON.stringify(senDataProg),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json()).then(proses => {
                console.log('data', proses);
                if (proses.status === 'berhasil') {
                    setDataListProgress(proses.data[0].judul_video);
                    setDataIndexVid(proses.data[0].index_video);
                    localStorage.setItem('dataIdProgress', proses.data[0].id_progress);
                } else {
                    alert(proses.status);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const getDataVideo = () => {
        const token = localStorage.getItem('dataLoginUser');
        const idCourse = localStorage.getItem('dataIdCourse');
        const senData = {
            token: token,
            id_course: idCourse
        }
        fetch(`${process.env.REACT_APP_API}/listVideo`, {
            method: 'POST',
            body: JSON.stringify(senData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json()).then(hasil => {
                console.log('data', hasil);
                if (hasil.status === 'berhasil') {
                    setDataListVideo(hasil.data);
                } else {
                    <p>data gagal diambil</p>
                }
            })
            .catch(err => {
                alert(err)
            })
    }

    const handleBack = (e) => {
        localStorage.removeItem('dataIdCourse');
        localStorage.removeItem('dataIndexVideo');
        localStorage.removeItem('dataIdProgress');
        history.push('/halaman-murid');
    }

    const handleClickVideo = (dat, index) => {
        setHandleShowVideo(true);
        setLinkVideo(dat.link_video);
        setNamaLinkVideo(dat.judul_video);
        setDeskripsi(dat.deskripsi);
        const token = localStorage.getItem('dataLoginUser');
        const idUs = localStorage.getItem('dataIdUser');
        const idCo = localStorage.getItem('dataIdCourse');
        const idPro = localStorage.getItem('dataIdProgress');
        const dataSend = {
            token: token,
            id_user: idUs,
            id_course: idCo,
            judul_video: dat.judul_video,
            index_video: index
        }
        const dataSend2 = {
            token: token,
            judul_video: dat.judul_video,
            index_video: index,
            id_progress: idPro
        }
        console.log(dataSend);
        // console.log(dataSend2);
        fetch(`${process.env.REACT_APP_API}/tambahProgress`, {
            method: 'POST',
            body: JSON.stringify(dataSend),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json()).then(hasil => {
                console.log(hasil);
                if (hasil.status === 'berhasil') {
                    getDataProgress();
                } else {
                    fetch(`${process.env.REACT_APP_API}/updateProgress`, {
                        method: 'POST',
                        body: JSON.stringify(dataSend2),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(res => res.json()).then(hasil => {
                            console.log(hasil);
                            if (hasil.status === 'berhasil') {
                                getDataProgress();
                            } else {
                                console.log(hasil.message);
                            }
                        })
                        .catch(err => {
                            alert(err)
                        })
                }
            })
            .catch(err => {
                alert(err)
            })
    }

    const handleClickSoal = () => {
        history.push('/soal-kuis');
    }

    return (
        <>
            {/* modal player */}
            <Modal
                show={handleShowVideo}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>{namaLinkVideo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="h-auto">
                        {
                            <>
                                <ReactPlayer
                                    pip={true}
                                    config={{
                                        youtube: {
                                            playerVars: {
                                                showinfo: 1,
                                                origin: window.location.origin
                                            }
                                        }
                                    }}
                                    width="100%"
                                    height="350px"
                                    controls={true}
                                    url={`${linkVideo}`}
                                />
                                <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Control value={deskripsi} as="textarea" rows={4} disabled/>
                                </Form.Group>
                            </>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Navigasi />
            {/* <h5 className="card-title">Anda Sedang Belajar Materi {dataListProgress}</h5> */}
            <Breadcrumb>
                <Breadcrumb.Item active>Materi yang anda pelajari sebelumnya adalah : {dataListProgress}</Breadcrumb.Item>
            </Breadcrumb>
            <Button onClick={(e) => handleBack(e)} variant="primary" type="submit">
                Kembali ke List Course
            </Button>
            <div className="row justify-content-center">
                {
                    dataListVideo ? dataListVideo.map((dat, index) => {
                        return (
                            <div key={index} onClick={() => handleClickVideo(dat, index)} className="card m-3 col-md-4 col-lg-3" style={{ width: '10rem', height: 'auto', border: '1' }}>
                                <img style={{ width: 'auto', height: '12rem' }} src={dat.thumbnail_video} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{dat.judul_video}</h5>
                                </div>
                            </div>
                        )
                    }) : ''
                }
                {
                    dataIndexVid + 1 === dataListVideo.length ?
                        <>
                            <div onClick={() => handleClickSoal()} className="card m-3 col-md-4 col-lg-3" style={{ width: '10rem', height: 'auto', border: '1' }}>
                                <div className="card-body">
                                    <h5 className="card-title">Soal Kuis</h5>
                                </div>
                            </div>
                        </> : ''
                }
            </div>
            <Container className="pt-5">
                <Row className="justify-content-center">
                    <Col sm={2}>
                    </Col>
                    <Col sm={8}>
                        <Komen />
                    </Col>
                    <Col sm={2}>
                    </Col>
                </Row>
            </Container>
        </>
    )
}