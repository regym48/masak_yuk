import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { Modal, Table, Form, Button } from 'react-bootstrap';
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
    const [dataListSoal, setDataListSoal] = useState([]);
    const [lgShow, setLgShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [idUpdate, setIdUpdate] = useState('');
    const [idCouUpdate, setIdCouUpdate] = useState('');
    const [pertanyaanEdit, setpertanyaanEdit] = useState('');
    const [opsi1Edit, setopsi1Edit] = useState('');
    const [opsi2Edit, setopsi2Edit] = useState('');
    const [opsi3Edit, setopsi3Edit] = useState('');
    const [opsi4Edit, setopsi4Edit] = useState('');
    const [jawabanEdit, setjawabanEdit] = useState('');
    const [show, setShow] = useState(false);
    const [idDel, setIdDel] = useState('');

    useEffect(() => {
        const login = localStorage.getItem('dataLoginUser');
        if (!login) {
            history.push('/');
            return;
        }
        getDataCourse();
        clearState();
        getDataSoal();
    }, []);

    const clearState = () => {
        setpertanyaan('');
        setopsi1('');
        setopsi2('');
        setopsi3('');
        setopsi4('');
        setjawaban('');
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
        setIdUpdate(dat.id_soal);
        setIdCouUpdate(dat.id_course);
        setpertanyaanEdit(dat.pertanyaan);
        setopsi1Edit(dat.opsi1);
        setopsi2Edit(dat.opsi2);
        setopsi3Edit(dat.opsi3);
        setopsi4Edit(dat.opsi4);
        setjawabanEdit(dat.jawaban);
    }

    const getDataSoal = (e) => {
        const token = localStorage.getItem('dataLoginUser');
        const senData = {
            token: token,
            id_course: idCou
        }
        fetch(`${process.env.REACT_APP_API}/listSoalPengajar`, {
            method: 'POST',
            body: JSON.stringify(senData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json()).then(hasil => {
                console.log('data', hasil);
                if (hasil.status === 'berhasil') {
                    setDataListSoal(hasil.data);
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
        if (idCou === '' || pertanyaan === '' || opsi1 === '' || opsi2 === '' || opsi3 === '' || opsi4 === '' || jawaban === '') {
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
                        setLgShow(false);
                        getDataSoal();
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
            id_soal: idUpdate,
            id_course: idCouUpdate,
            pertanyaan: pertanyaanEdit,
            opsi1: opsi1Edit,
            opsi2: opsi2Edit,
            opsi3: opsi3Edit,
            opsi4: opsi4Edit,
            jawaban: jawabanEdit
        }
        if (pertanyaanEdit === '' || opsi1Edit === '' || opsi2Edit === '' || opsi3Edit === '' || opsi4Edit === '' || jawabanEdit === '') {
            swal("Gagal", "Form Harus Terisi Semua!", "error")
            return;
        }
        fetch(`${process.env.REACT_APP_API}/updateSoal`, {
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
                    getDataSoal();
                    setShowEdit(false);
                } else {
                    clearState();
                    swal("failed", hasil.message, "error")
                }
            })
            .catch(err => {
                alert(err)
            })
    }

    const handleDelete = () => {
        const token = localStorage.getItem('dataLoginUser');
        const dataSend = {
            id_soal : idDel,
            token: token
        }
        fetch(`${process.env.REACT_APP_API}/hapusSoal`, {
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
            getDataSoal();
        })
        .catch(err =>{
            alert(err)
        })
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
                        Tambah Soal
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                        Edit Soal
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Pertanyaan</Form.Label>
                            <Form.Control onChange={(e) => setpertanyaanEdit(e.target.value)} value={pertanyaanEdit} as="textarea" rows={3} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Id Course</Form.Label>
                            <input onChange={(e) => setIdCouUpdate(e.target.value)} value={idCouUpdate} type="text" className="form-control" disabled></input>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Opsi 1</Form.Label>
                            <input onChange={(e) => setopsi1Edit(e.target.value)} value={opsi1Edit} type="text" className="form-control"></input>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Opsi 2</Form.Label>
                            <input onChange={(e) => setopsi2Edit(e.target.value)} value={opsi2Edit} type="text" className="form-control"></input>
                        </Form.Group>
                        <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Opsi 3</Form.Label>
                            <input onChange={(e) => setopsi3Edit(e.target.value)} value={opsi3Edit} type="text" className="form-control"></input>
                        </Form.Group>
                        <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Opsi 4</Form.Label>
                            <input onChange={(e) => setopsi4Edit(e.target.value)} value={opsi4Edit} type="text" className="form-control"></input>
                        </Form.Group>
                        <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Jawaban</Form.Label>
                            <input onChange={(e) => setjawabanEdit(e.target.value)} value={jawabanEdit} type="text" className="form-control"></input>
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
                    <Modal.Title>Hapus Data Soal</Modal.Title>
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
                    Tambah Soal
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
                <button onClick={(e) => getDataSoal(e)} class="btn btn-primary btn-md ml-3" role="button">
                    Cari
                </button>
                <Table responsive striped bordered>
                    <thead className="thead-dark">
                        <tr>
                            <th>No.</th>
                            <th>Pertanyaan</th>
                            <th>Opsi 1</th>
                            <th>Opsi 2</th>
                            <th>Opsi 3</th>
                            <th>Opsi 4</th>
                            <th>Jawaban</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataListSoal ? dataListSoal.map((dat, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{dat.pertanyaan}</td>
                                        <td>{dat.opsi1}</td>
                                        <td>{dat.opsi2}</td>
                                        <td>{dat.opsi3}</td>
                                        <td>{dat.opsi4}</td>
                                        <td>{dat.jawaban}</td>
                                        <td>
                                            <button onClick={() => handleShow(dat.id_soal)} className="btn btn-sm btn-danger mr-1 mb-1">DELETE</button>
                                            <button onClick={() => handleShowUpdate(dat)} className="btn btn-sm btn-secondary mr-1">EDIT</button>
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