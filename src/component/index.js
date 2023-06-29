import React, { useState, useEffect } from 'react';
import firebase from '../firebase';

import './index.css';


const Task = () => {

    const [data, setData] = useState([])
    const [description, setDescription] = useState('')
    const [keys, setKeys] = useState('')


    // Fetch initial data from Firebase Realtime Database
    const fetchData = () => {
      const ref = firebase.database().ref('/items');
      ref.on('value', (snapshot) => {
        const dataFromDB = snapshot.val();
        const dataArray = dataFromDB ? Object.entries(dataFromDB) : [];
        setData(dataArray);
      });
    };

    useEffect(() => {
        fetchData();
        return () => {
          // Clean up the Firebase listener when component unmounts
          const ref = firebase.database().ref('/items');
          ref.off();
        };
        //useeffect to fetching data before loading the page
      }, []);
    


    //Adding data into firebase realtime database
    const handleAddItem = async () => {
        try {
            const newItemRef = firebase.database().ref('/items').push();
            await newItemRef.set({ value: description });
            setDescription('');
            fetchData();
          } catch (error) {
            console.log('Error adding item:', error);
          }
        };

    
      //Updating data present in realtime database
      const handleUpdateItem = async itemId => {
        try {
            const itemRef = firebase.database().ref(`/items/${itemId}/value`);
            await itemRef.set(description);
            fetchData();
            setKeys('')
            setDescription('')
          } catch (error) {
            console.log('Error updating item:', error);
          }
      };


    //Deleting data from realtime database
    const handleDelete =  async itemId =>{
        try {
            await firebase.database().ref(`/items/${itemId}`).remove();
            setKeys('')
            setDescription('')
            fetchData()
          } catch (error) {
            console.log('Error deleting item:', error);
          }
      
    } 

    const handleUpdate = (key, value) =>{
        setDescription(value)
        setKeys(key)
    }

    //Function to handle add or update button
    const handleAddorUpdateItem = () =>{
        if(keys.length){
            handleUpdateItem(keys)
        }else{
            handleAddItem()
        }
    }



  return (
    <>
        <div className='mycontainer'> 
            <div className='cardContainer'>
                {data.map(([key, item])  => (
                    <div key={key} className='cardItem' onClick={()=> handleUpdate(key, item.value)}>
                        <div className='crossIcon'><i className="fas fa-times cross-icon" onClick={() =>handleDelete(key)}></i></div>
                        {item.value}
                    </div>
                ))}
                <div className='textWrapper'>
                    <textarea 
                    className="textCard" 
                    aria-label="With textarea" 
                    value={description} 
                    onChange={(e) =>{
                        setDescription(e.target.value)
                    }}>
                    </textarea>  
                    <div className='button' onClick={()=>handleAddorUpdateItem()}>+ ADD & UPDATE</div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Task;