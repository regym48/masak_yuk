import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { Container, Card, Form, Button, Table, Modal } from 'react-bootstrap';
import logo from "./logo-masak.png"
import swal from 'sweetalert';
import { Navigasi } from "./Navigasi";
import ReactPlayer from 'react-player/lazy';

export const ListVideoPengajar = () => {
    const history = useHistory();
    const [dataListCourse, setDataListCourse] = useState([]);
    const [judulVideo, setJudulVideo] = useState('');
    const [thumbnailVideo, setThumbnailVideo] = useState('');
    const [linkVideo, setLinkVideo] = useState('');
    const [idCou, setIdCou] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [dataListVideo, setDataListVideo] = useState([]);
    const [lgShow, setLgShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [judulVideoEdit, setJudulVideoEdit] = useState('');
    const [thumbnailVideoEdit, setThumbnailVideoEdit] = useState('');
    const [linkVideoEdit, setLinkVideoEdit] = useState('');
    const [deskripsiEdit, setDeskripsiEdit] = useState('');
    const [idUpdate, setIdUpdate] = useState('');
    const [idCouUpdate, setIdCouUpdate] = useState('');
    const [show, setShow] = useState(false);
    const [idDel, setIdDel] = useState('');
    const [handleShowVideo, setHandleShowVideo] = useState(false);
    const [namaLinkVideo, setNamaLinkVideo] = useState('');
    const [linkVideoWatch, setLinkVideoWatch] = useState('');

    useEffect(() => {
        const login = localStorage.getItem('dataLoginUser');
        if (!login) {
            history.push('/');
            return;
        }
        getDataCourse();
        getDataVideo();
        clearState();
    }, []);

    const clearState = () => {
        setJudulVideo('');
        setThumbnailVideo('');
        setLinkVideo('');
        setDeskripsi('');
    }

    const handleShow = (id) => {
        setShow(true);
        setIdDel(id);
    }

    const handleClose = () => {
        setShow(false)
    }

    const handleShowUpdate = (dat) => {
        setShowEdit(true);
        setIdUpdate(dat.id_video);
        setIdCouUpdate(dat.id_course)
        setJudulVideoEdit(dat.judul_video);
        setThumbnailVideoEdit(dat.thumbnail_video);
        setLinkVideoEdit(dat.link_video);
        setDeskripsiEdit(dat.deskripsi);
    }

    const getDataVideo = (e) => {
        const token = localStorage.getItem('dataLoginUser');
        const senData = {
            token: token,
            id_course: idCou
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
                    swal("failed", hasil.message, "error")
                }
            })
            .catch(err => {
                console.log(err)
            })
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
        if (idCou === '' || judulVideo === '' || thumbnailVideo === '' || linkVideo === '' || deskripsi === '') {
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
                        setLgShow(false);
                        getDataVideo();
                    } else {
                        swal("failed", hasil.message, "error")
                        clearState();
                    }
                })
                .catch(err => {
                    alert(err)
                })
        }
    }

    const handleUpdateSimpan = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('dataLoginUser');
        const dataSend = {
            token: token,
            id_video: idUpdate,
            id_course: idCouUpdate,
            judul_video: judulVideoEdit,
            thumbnail_video: thumbnailVideoEdit,
            link_video: linkVideoEdit,
            deskripsi: deskripsiEdit
        }
        if (judulVideoEdit === '' || thumbnailVideoEdit === '' || linkVideoEdit === '' || deskripsiEdit === '') {
            swal("Gagal", "Form Harus Terisi Semua!", "error")
            return;
        }
        fetch(`${process.env.REACT_APP_API}/updateVideo`, {
            method: 'POST',
            body: JSON.stringify(dataSend),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json()).then(hasil => {
            console.log('hasil', hasil);
            setShowEdit(false);
            if (hasil.status === "berhasil") {
                clearState();
                swal("success", hasil.message, "success")
                getDataVideo();
                setShowEdit(false);
            } else {
                clearState();
                swal("failed", hasil.message, "error")
            }
        })
        .catch(err =>{
            alert(err)
        })
    }

    const handleDelete = () => {
        const token = localStorage.getItem('dataLoginUser');
        const dataSend = {
            id_video : idDel,
            token: token
        }
        fetch(`${process.env.REACT_APP_API}/hapusVideo`, {
            method: 'POST',
            body: JSON.stringify(dataSend),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json()).then(hasil => {
            getDataCourse();
            setShow(false);
            swal("success", hasil.message, "success")
            getDataVideo();
        })
        .catch(err =>{
            alert(err)
        })
    }

    const handleClickVideo = (dat) =>{
        setHandleShowVideo(true);
        setLinkVideoWatch(dat.link_video);
        setNamaLinkVideo(dat.judul_video);
    }

    return (
        <>
            {/* modal tambah video */}
            <Modal
                size="lg"
                show={lgShow}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Tambah Video
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                        <button onClick={() => setLgShow(false)} className="btn btn-warning ml-3">Batal</button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* modal edit */}
            <Modal
                size="lg"
                show={showEdit}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Edit Video
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Judul Video</Form.Label>
                            <input onChange={(e) => setJudulVideoEdit(e.target.value)} value={judulVideoEdit} type="text" className="form-control" placeholder="Judul Video"></input>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Id Course</Form.Label>
                            <input onChange={(e) => setIdCouUpdate(e.target.value)} value={idCouUpdate} type="text" className="form-control" disabled></input>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Thumbnail Video</Form.Label>
                            <input onChange={(e) => setThumbnailVideoEdit(e.target.value)} value={thumbnailVideoEdit} type="text" className="form-control" placeholder="Thumbnail Video"></input>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Link Video</Form.Label>
                            <input onChange={(e) => setLinkVideoEdit(e.target.value)} value={linkVideoEdit} type="text" className="form-control" placeholder="Link Video"></input>
                        </Form.Group>
                        <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Deskripsi Video</Form.Label>
                            <Form.Control onChange={(e) => setDeskripsiEdit(e.target.value)} value={deskripsiEdit} as="textarea" rows={3} />
                        </Form.Group>
                        <Button onClick={(e) => handleUpdateSimpan(e)} variant="primary" type="submit">
                            Update
                        </Button>
                        <button onClick={() => setShowEdit(false)} className="btn btn-warning ml-3">Batal</button>
                    </Form>
                </Modal.Body>
            </Modal>

             {/* modal hapus */}
             <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Hapus Data Video</Modal.Title>
                </Modal.Header>
                <Modal.Body>Apakah Anda Yakin Menghapus Data?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

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
                                    url={`${linkVideoWatch}`}
                                />
                            </>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setHandleShowVideo(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Navigasi />
            <div className="text-center mb-10">
                <img
                    alt=""
                    src={logo}
                    width="400"
                    height="250"

                />
            </div>
            <div className="container justify-content-center" style={{ marginTop: 50 }}>
                <button onClick={() => setLgShow(true)} style={{ marginLeft: 'auto' }} class="btn btn-primary btn-md ml-3 mr-3" role="button">
                    Tambah Video
                </button>
                <Form.Select className="mb-3" onChange={(e) => setIdCou(e.target.value)} aria-label="Default select example">
                    <option selected value="1">--Pilih Course--</option>
                    {
                        dataListCourse ? dataListCourse.map((dat, index) => {
                            return (
                                <option key={index} value={dat.id_course}>{dat.nama_course}</option>
                            )
                        }) : ''
                    }
                </Form.Select>
                <button onClick={(e) => getDataVideo(e)} class="btn btn-primary btn-md ml-3" role="button">
                    Cari
                </button>
                <Table responsive striped bordered>
                    <thead className="thead-dark">
                        <tr>
                            <th>No.</th>
                            <th>Judul Video</th>
                            <th>Deskripsi</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataListVideo ? dataListVideo.map((dat, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{dat.judul_video}</td>
                                        <td>{dat.deskripsi}</td>
                                        <td>
                                            <button onClick={() => handleShow(dat.id_video)} className="btn btn-sm btn-danger mr-1">DELETE</button>
                                            <button onClick={() => handleShowUpdate(dat)} className="btn btn-sm btn-secondary mr-1">EDIT</button>
                                            <button onClick={() => handleClickVideo(dat)} className="btn btn-sm btn-success mr-1 mt-1">Lihat Video</button>
                                        </td>
                                    </tr>
                                )
                            }) : ''
                        }
                    </tbody>
                </Table>
            </div>
        </>
    )
}