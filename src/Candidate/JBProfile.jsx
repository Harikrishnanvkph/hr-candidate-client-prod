import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { updatePhoneNumber, uploadImage,updateSkiller, getUserDetail } from "../API";
import { addUser } from "../ReduxStore/Slicer";


export default function JBProfile(){
    const currentUser = useSelector((state)=>state.myStore.userCE);
    const dispatch = useDispatch();
    const [num,setNum] = useState(currentUser.phone_number === "" || currentUser.phone_number == null ? "" : currentUser.phone_number);
    const [upBNum, setUpBNum] = useState(0);
    const [image,setImage] = useState(currentUser.image.data ?
        `data:image/png;base64,${currentUser.image.data}` : '/defaultProfile.jpg'
    )

    const setUpBNumer = async()=>{
        setUpBNum(upBNum+1);
        if(upBNum == 1){
            console.log(currentUser);
            const updateNumber = await updatePhoneNumber(num,currentUser.mail);
            dispatch(addUser(updateNumber));
            setUpBNum(0);
        }
    }

    const imageUpload = async(e)=>{
        const form = new FormData();
        form.append('profile-image',e.target.files[0]);
        form.append("mail",currentUser.mail);
        const host = await uploadImage(form);
        if(host.status === 200) {
            const img = URL.createObjectURL(e.target.files[0])
            setImage(img);
        }
    }

    useEffect(()=>{
        const getUser = async()=>{
            const user = await getUserDetail(currentUser.mail);
            dispatch(addUser(user));
        }
        getUser().catch();
    },[image])

    return<>
        <div className="jbprofile-all h-100 d-flex align-items-center flex-column justify-content-center">
            <div className="jbprofile-pic m-2 d-flex flex-column justify-content-center align-items-center">
                <label htmlFor="btn-profile" className="jb-label">
                    <img src={image} alt="profile-pic" />
                    <div className="btn btn-primary mt-3">Upload</div>
                    <input accept="image/*" type="file" id="btn-profile" style={{display : "none"}} onChange={imageUpload}  />
                </label>
            </div>
            <div className="jbprofile-details container-fluid mt-4 text-center">
                <div className="row p-2 px-md-auto px-0 d-flex flex-sm-row flex-column align-items-center">
                    <p className="col-sm-4 col-12 p-0">User Name</p>
                    <p className="col-2 d-sm-flex d-none p-0">-</p>
                    <p className="col-sm-6 col-12 p-0 pricing-highlighter">{currentUser.firstName}</p>
                </div>
                <div className="row p-2 px-md-auto px-0  d-flex flex-sm-row flex-column align-items-center">
                    <p className="col-sm-4 col-12 p-0">Mobile Number</p>
                    <p className="col-2 p-0 d-sm-flex d-none p-0">-</p>
                    <div className="col-sm-6 col-12 p-0 pricing-highlighter d-flex justify-content-center jb-update">
                        <input type="text" placeholder="Mobile No." className="text-center profile-number" value={num} onChange={(e)=>{
                            setNum(e.target.value);
                        }} maxLength={12} disabled={upBNum === 0} />
                        <button className="ml-1 btn btn-primary" onClick={setUpBNumer}>{`${upBNum === 0 ? "Edit" : "Update"}`}</button>
                    </div>
                </div>
                <div className="row p-2 d-flex flex-sm-row flex-column align-items-center">
                    <p className="col-sm-4 col-12 p-0">Mail Address</p>
                    <p className="col-2 p-0 d-sm-flex d-none p-0">-</p>
                    <p className="col-sm-6 col-12 p-0 pricing-highlighter">{currentUser.mail}</p>
                </div>
            </div>
        </div>
    </>
}