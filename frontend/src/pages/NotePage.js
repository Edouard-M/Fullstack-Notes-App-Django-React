import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom';
import { ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'

const NotePage = () => {

    const { id } = useParams();
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

    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <Link to="/">
                        <ArrowLeft/>
                    </Link>
                </h3>
            </div>
            <textarea defaultValue={note?.body}></textarea>
        </div>
    )
}

export default NotePage

