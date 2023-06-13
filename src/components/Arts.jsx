import React from 'react'
import { useState, useEffect } from 'react';
import AddForm from './AddForm';

export default function Arts({pattern}) {

  const [arts, setArts] = useState([]);

  useEffect(() => {
    const url = "http://localhost:5242/api/trysound";
    fetch(url)
      .then((response) => {
        response.json().then((data) => { setArts(data); });
      })
      .catch((error) => { console.log(error) });
  }, []);

  return (
    <div>
      <h3>Art Objects</h3>
      {
        pattern == ''
          ?
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Description</th>
                <th>Cover</th>
                <th>MP3</th>
              </tr>
            </thead>
            <tbody>
              {
                arts.map((a) => {
                  return <tr key={a.id}>
                    <td>{a.id}</td>
                    <td>{a.title}</td>
                    <td>{a.description}</td>
                    <td><img src={"http://localhost:5242/api/trysound/image/" + a.id} alt='Album cover' height='100px' /></td>
                    <td><audio src={"http://localhost:5242/api/trysound/mp3/" + a.id} controls /></td>
                  </tr>
                })
              }
            </tbody>
          </table>
          :
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Description</th>
                <th>Cover</th>
                <th>MP3</th>
              </tr>
            </thead>
            <tbody>
              {
                arts.filter(a => a.description.includes(pattern))
                  .map((a) => {
                    return <tr key={a.id}>
                      <td>{a.id}</td>
                      <td>{a.title}</td>
                      <td>{a.description}</td>
                      <td><img src={"http://localhost:5242/api/trysound/image/" + a.id} alt='Album cover' height='100px' /></td>
                      <td><audio src={"http://localhost:5242/api/trysound/mp3/" + a.id} controls /></td>
                    </tr>
                  })
              }
            </tbody>
          </table>
      }
      <hr />
      <AddForm />
    </div>
  )
}
