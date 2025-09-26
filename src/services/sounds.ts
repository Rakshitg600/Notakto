import Sound from 'react-native-sound';

Sound.setCategory('Playback');

export const playMoveSound = (mute:boolean) => {
    if(mute){return;}
    const sound = new Sound(require('../../android/app/src/main/res/raw/click.mp3'),(error)=>{
      if(error){
        console.log('Failed to load sound',error);
        return;
      }
      sound.play(()=>sound.release());
    });
  };
export  const playWinSound = (mute: boolean) => {
    if(mute){return;}
    const sound = new Sound(require('../../android/app/src/main/res/raw/wins.mp3'),(error)=>{
      if(error){
        console.log('Failed to load sound',error);
        return;
      }
      sound.play(()=>sound.release());
    });
  };
