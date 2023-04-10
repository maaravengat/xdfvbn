import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useMutation, gql, useQuery } from '@apollo/client'


const ADD_MUTATIONS = gql`
mutation AddFavicon($fileName: String!){
    addfavicon(fileName: $fileName, ){
        id
        fileName

    }
}`
const UPDATE_MUTATIONS = gql`
mutation UpdateUser($id: Int,$fileName: String!){
    updateuser( id:$id,fileName: $fileName, ){
     id
     filename
    }
}`

const Favicon_Data = gql`
query languagequery{
    favicon {
      id
      fileName
    }
  }`
function Favicon() {

    const { data } = useQuery(Favicon_Data)
    const [updatefavicon] = useMutation(UPDATE_MUTATIONS, {
        refetchQueries: [
            { query: Favicon_Data }
        ],

    })
    const [imageName, setImageName] = useState(null)
    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(null);

    const onChangePicture = e => {
        if (e.target.files[0]) {
            console.log("picture: ", e.target.files);
            setPicture(e.target.files[0])
            const reader = new FileReader()
            reader.addEventListener("load", () => {
                setImgData(reader.result)
            })
            // reader.readAsDataURL(e.target.files[0]);
            // reader.onloadend = () => {
            //     const favicon = document.querySelector(('link[rel="icon"]'))
            //     favicon.href = reader.result

            // }
        }
    };

    const upload = () => {
        updatefavicon({

            variables: {
                id:data.id,
                fileName:imageName
            }
        })
        const reader = new FileReader()
        reader.readAsDataURL(picture);
        reader.onloadend = () => {
            const favicon = document.querySelector(('link[rel="icon"]'))
            favicon.href = reader.result

        }

        const formData = new FormData();
        formData.append('file', picture)

        axios.post('http://localhost:4000/favicon', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            if (response.status === 200) {
                console.log(response.data.file.filename, 'fdsdf');
                setImageName(response.data.file.filename)
            }
        })
    }


    useEffect(() => {
        async function getFavicon() {

             const iamgeURL = URL.createObjectURL(new Blob([imageName], { type: 'image/png' }))

            const favicon = document.querySelector('link[rel="icon"]')
            favicon.href = iamgeURL
        }
        getFavicon()
    }, [])
    return (
        <div>
            {/* <img src={imgData} height="300px" /> */}
              <p>
                {data && data.favicon.map(user => {
                    return (
                          <img src = {require(`../public/image/${user.fileName}`)}  height='200'/>
                    )
                })}
            </p>

            <br />
            <br />
            <br />
            <input type="file" name="fileName" onChange={onChangePicture} />
            <button onClick={upload}>Upload</button>
            <br />
          
        </div>
    )
}

export default Favicon
