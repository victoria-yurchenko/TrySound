import React from 'react'
import imageToBase64 from 'image-to-base64/browser';
import { useState } from 'react';

export default function AddForm() {

  const [art, setArt] = useState({ id: 0, title: '', description: '', cover: '', artistid: 3, mp3: '' });
  const [cover, setCover] = useState('');
  const [mp3, setMp3] = useState('');

  const selectCover = (event) => {
    let coverUrl = URL.createObjectURL(event.target.files[0]);
    let cover64 = '';
    imageToBase64(coverUrl)
      .then((response) => {
        cover64 = response;
        console.log("cover: " + cover64);
      }
      ).then(() => setCover(cover64))
      .catch((error) => { console.log(error) })
  }

  const selectMp3 = (event) => {
    let mp3Url = URL.createObjectURL(event.target.files[0]);
    let audio64 = '';
    imageToBase64(mp3Url)
      .then((response) => {
        audio64 = response;
        console.log("mp3: " + audio64);
      }
      ).then(() => setMp3(audio64))
      .catch((error) => { console.log(error) })
  }

  const handleSubmit = (event) => {
    let toSend = art;
    toSend.cover = cover;
    toSend.mp3 = mp3;
    const url = "http://localhost:5242/api/trysound";
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(toSend)
    };
    fetch(url, options)
      .then((response) => { console.log(response); })
      .catch((error) => { console.log(error) })
  }

  return (
    <div>
      <form
        encType='multipart/form-data'
        className='form-group'
      >
        <input
          type='text'
          placeholder='Enter title'
          value={art.title}
          className="form-control m-2"
          onChange={(event) => setArt({ ...art, title: event.target.value })}
        />
        <input
          type='text'
          placeholder='Description'
          value={art.description}
          className="form-control m-2"
          onChange={(event) => setArt({ ...art, description: event.target.value })}
        />
        <input
          type='file'
          accept='.jpg'
          className="form-control m-2"
          onChange={selectCover}
        />
        <input
          type='file'
          accept='.mp3'
          className="form-control m-2"
          onChange={selectMp3}
        />
        <button
          className="form-control m-2 text-black btn btn-outline-primary" style={{ backgroundColor: "#e3f2fd" }}
          onClick={handleSubmit}
        >Add New</button>
      </form>
    </div>
  )
}
