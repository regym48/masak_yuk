import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

export const ListCourse = () =>{
    const history = useHistory();
    const [dataListCourse, setDataListCourse] = useState([]);
    const [mencari, setMencari] = useState('');
    
    useEffect(() => {
        getDataCourse();
    }, []);

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

    const handleOpenVideo = (dat) => {
        localStorage.setItem('dataIdCourse',dat.id_course);
        localStorage.setItem('dataNamaCourse',dat.nama_course);
        history.push('/list-video');
    }

    return(
        <>
            <div className="row justify-content-center">
            <h2>List Course</h2>
            <input onChange={(e) => setMencari(e.target.value)} type="text" className="form-control" placeholder="Search"></input>
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
                                <img style={{ width: '10rem', height: '8rem' }} onClick={() => handleOpenVideo(dat)} src={dat.thumbnail_course} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{dat.nama_course}</h5>
                                </div>
                            </div>
                        )
                    }):''
                }
            </div>
        </>
    )
}