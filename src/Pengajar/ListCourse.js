import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { Modal, Button } from 'react-bootstrap';

export const ListCourse = () =>{
    const history = useHistory();
    const [lgShow, setLgShow] = useState(false);
    const [dataListCourse, setDataListCourse] = useState([]);
    const [mencari, setMencari] = useState('');
    const [namaCourse, setNamaCourse] = useState('');
    const [thumbnailCourse, setThumbnailCourse] = useState('');
    const [idUpdate, setIdUpdate] = useState('');
    const [showEdit, setShowEdit] = useState(false);
    const [show, setShow] = useState(false);
    const [idDel, setIdDel] = useState('');
    
    useEffect(() => {
        const login = localStorage.getItem('dataLoginUser');
        if (!login) {
            history.push('/');
            return;
        }
        getDataCourse();
    }, []);

    const clearState = () => {
        setNamaCourse('');
        setThumbnailCourse('');
    }

    const handleShow = (id) => {
        setShow(true);
        setIdDel(id);
    }

    const handleClose = () => {
        setShow(false)
    }

    const handleDelete = () => {
        const token = localStorage.getItem('dataLoginUser');
        const dataSend = {
            id_course : idDel,
            token: token
        }
        fetch(`${process.env.REACT_APP_API}/hapusCourse`, {
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
        })
        .catch(err =>{
            alert(err)
        })
    }

    const handleShowUpdate = (dat) => {
        setShowEdit(true);
        setIdUpdate(dat.id_course);
        setNamaCourse(dat.nama_course);
        setThumbnailCourse(dat.thumbnail_course);
    }

    const getDataCourse = () => {
        const token = localStorage.getItem('dataLoginUser');
        const senData = {
            token : token
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
            token : token,
            nama_course : namaCourse,
            thumbnail_course : thumbnailCourse
        }
        if (namaCourse === '' || thumbnailCourse === '') {
            swal("Failed", "Semua Data Harus Diisi!", "error")
        } else {
            fetch(`${process.env.REACT_APP_API}/tambahCourse`, {
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
                        getDataCourse();
                        clearState();
                        setLgShow(false);
                    }else {
                        swal("failed", hasil.message, "error")
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
            id_course: idUpdate,
            nama_course : namaCourse,
            thumbnail_course : thumbnailCourse,
            token: token
        }
        if (namaCourse === '' || thumbnailCourse === '') {
            swal("Gagal", "Form Harus Terisi Semua!", "error")
            return;
        }
        fetch(`${process.env.REACT_APP_API}/updateCourse`, {
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
                getDataCourse();
            } else {
                clearState();
                swal("failed", hasil.message, "error")
            }
        })
        .catch(err =>{
            alert(err)
        })
    }

    return(
        <>
            {/* modal hapus */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Hapus Data Course</Modal.Title>
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

            <Modal
                size="lg"
                show={lgShow}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Tambah Course
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="nama_course">Nama Course</label>
                            <input onChange={(e) => setNamaCourse(e.target.value)} value={namaCourse} type="text" className="form-control" id="nama_course" placeholder="Nama Course"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="thumbnail_course">Thumbnail Course</label>
                            <input onChange={(e) => setThumbnailCourse(e.target.value)} value={thumbnailCourse} type="text" className="form-control" id="thumbnail_course" placeholder="Link Thumbnail Course"></input>
                        </div>
                        <button onClick={(e) => handleSubmit(e)} className="btn btn-primary">Simpan</button>
                        <button onClick={() => setLgShow(false)} className="btn btn-warning ml-3">Batal</button>
                    </form>
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
                        Edit Course
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                    <div className="form-group">
                            <label htmlFor="nama_course">Nama Course</label>
                            <input onChange={(e) => setNamaCourse(e.target.value)} value={namaCourse} type="text" className="form-control" id="nama_course" placeholder="Nama Course"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="thumbnail_course">Thumbnail Course</label>
                            <input onChange={(e) => setThumbnailCourse(e.target.value)} value={thumbnailCourse} type="text" className="form-control" id="thumbnail_course" placeholder="Link Thumbnail Course"></input>
                        </div>
                        <button onClick={(e) => handleUpdateSimpan(e)} className="btn btn-primary">Simpan</button>
                        <button onClick={() => setShowEdit(false)} className="btn btn-warning ml-3">Batal</button>
                    </form>
                </Modal.Body>
            </Modal>

            <button onClick={() => setLgShow(true)} class="btn btn-primary btn-md mr-3 mt-3" role="button">
                Tambah Course
            </button>
            <div className="row justify-content-center">
            <h2>List Course</h2>
            <input onChange={(e) => setMencari(e.target.value)} type="text" className="form-control" placeholder="Cari Course"></input>
                {
                    dataListCourse?dataListCourse.filter((dat) =>{
                        if(mencari === ""){
                            return dat
                        }else if (dat.nama_course.toLowerCase().includes(mencari.toLocaleLowerCase())){
                            return dat
                        }
                    }).map((dat, index) => {
                        return (
                            <div key={index} className="card m-3 col-md-4 col-lg-3" style={{ width: '10rem', height: 'auto', border: '1' }}>
                                <img style={{ width: '10rem', height: '8rem' }} src={dat.thumbnail_course} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{dat.nama_course}</h5>
                                    <button onClick={() => handleShow(dat.id_course)} className="btn btn-sm btn-danger mr-1">DELETE</button>
                                    <button onClick={() => handleShowUpdate(dat)} className="btn btn-sm btn-secondary mr-1">EDIT</button>
                                </div>
                            </div>
                        )
                    }):''
                }
            </div>
        </>
    )
}