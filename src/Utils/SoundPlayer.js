import React from "react";
import { Audio } from 'expo-av';


export const SoundPlayer = async ()=>{
    
    const soundObject = new Audio.Sound();
    try {
    await soundObject.loadAsync(require('./../Assets/Sounds/snd.mp3'));
    await soundObject.playAsync();
    // Your sound is playing!

    //umload
    // await soundObject.unloadAsync();
    } catch (error) {
    // An error occurred!
    }
}