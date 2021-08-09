import { useEffect, useState } from "react";
import { useHistory, Link } from 'react-router-dom';
import swal from 'sweetalert';

export const Skor = () =>{
    const history = useHistory();
    const [skor, setSkor] = useState([]);
    const [dataSoal, setDataSoal] = useState('');
    const [nilai, setNilai] = useState('');
    // const [nilai, setNilai] = useState('');
    // console.log(nilai);

    useEffect(() => {
        const login = localStorage.getItem('dataLoginUser');
        if(!login){
            history.push('/');
            return;
        }
        getNilai();
        getListSoal();
        setNilai((skor.skor/dataSoal) * 100);
    }, []);

    const getNilai = () =>{
        const token = localStorage.getItem('dataLoginUser');
        const dataSend = {
            token
        }
        fetch(`${process.env.REACT_APP_API}/hitungSkor`, {
            method: 'POST',
            body: JSON.stringify(dataSend),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json()).then(hasil => {
            // console.log(hasil);
            if(hasil.status === 'gagal'){
                history.push('/');
                return;
            }
            setSkor(hasil);
        })
        .catch(err => {
            alert(err)
        })
    }

    const getListSoal = () =>{
        const token = localStorage.getItem('dataLoginUser');
        const idCourse = localStorage.getItem('dataIdCourse');
        const senData = {
            token,
            id_course: idCourse
        }
        fetch(`${process.env.REACT_APP_API}/listSoal`, {
            method: 'POST',
            body: JSON.stringify(senData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json()).then(hasil => {
                // console.log(hasil);
                if(hasil.status ==='berhasil'){
                    setDataSoal(hasil.data.length);
                }else{
                    history.push('/');
                    localStorage.removeItem('dataLoginUser')
                }
            })
            .catch(err => {
                alert(err)
            })
    }

    const handleCobaLagi = () =>{
        const token = localStorage.getItem('dataLoginUser');
        const idUs = localStorage.getItem('dataIdUser');
        const name = localStorage.getItem('dataNamaUser');
        const name_course = localStorage.getItem('dataNamaCourse');
        const idCo = localStorage.getItem('dataIdCourse');
        const dataSend = {
            token: token,
            id_course: idCo,
            nama_course: name_course,
            id_user: idUs,
            nama: name,
            nilai: (skor.skor/dataSoal) * 100
        }
        const dataSend2 = {
            token
        }
        fetch(`${process.env.REACT_APP_API}/tambahNilai`, {
            method: 'POST',
            body: JSON.stringify(dataSend),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json()).then(hasil => {
                console.log(hasil);
                if (hasil.status === 'berhasil') {
                    swal("success", hasil.message, "success");
                }
                fetch(`${process.env.REACT_APP_API}/selesaiUjian`, {
                    method: 'POST',
                    body: JSON.stringify(dataSend2),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json()).then(hasil => {
                    if(hasil.status === 'berhasil'){
                        history.push('/list-video');
                        return;
                    }else{
                        history.replace('/');
                        return;
                    }
                })
                .catch(err => {
                    alert(err)
                })
            })
            .catch(err => {
                alert(err)
            })
    }

    return(
        <>
            <div className="card" style={{marginLeft:'auto', marginRight:'auto'}}>
                <div className="card-content" style={{padding: 80}}>
                    <div className="content text-center text-black">
                        <h3>Nilai yang Kamu Peroleh</h3>
                        <h1>{skor.skor? (skor.skor/dataSoal) * 100 : 'Tidak Ada Skor'}</h1>
                        <button onClick={() => handleCobaLagi()} className="btn btn-info mt-2 mb-2 mr-2">Selesai</button>
                    </div>
                </div>
            </div>
        </>
    )
}