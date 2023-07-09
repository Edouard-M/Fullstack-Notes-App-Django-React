import React, {useState, useEffect} from 'react'
import { useParams, useNavigate  } from 'react-router-dom';
import { ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'

const NotePage = () => {

    const { id } = useParams();
    //const { history } = useParams();
    const navigate = useNavigate();
    let noteId = id

    let [note, setNote] = useState(null)

    useEffect(()=>{
        
        let getNote = async ()=>{
            let response = await fetch(`/api/notes/${noteId}`)
            let data = await response.json()
            setNote(data)
        }

        getNote()
    }, [noteId])

    let updateNote = async () => {
        fetch(`/api/notes/${noteId}/update/`, {
            method: "PUT",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    let handleSubmit = () => {
        updateNote()
        navigate('/')
    }

    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <ArrowLeft onClick={handleSubmit}/>
                </h3>
            </div>
            <textarea onChange={(e) => {setNote({...note, 'body':e.target.value})}} defaultValue={note?.body}></textarea>
        </div>
    )
}

export default NotePage

