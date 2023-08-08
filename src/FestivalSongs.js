import React, { useState } from 'react';
import raw from './lifeIsBeautifulLineup.txt'

function FestivalSongs(){

    showFile = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => {
            const text = (e.targer.result)
            console.log(text)
            alert(text)
        };
        reader.readAsText(e.target.files[0])
    }

    return(
        <div>
            <input type="file" onChange={(e) => this.showFile(e)}/>
        </div>
    )
}

export default FestivalSongs;