import React from 'react';
import './facerecognition.css'

const FaceRecognition=({ imageUrl, box })=>{
	return (
		<div className='center'>
	   		  <div className='fcim'>
		      <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto' />
			  <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
			  </div>
	    </div>
	);
}


export default FaceRecognition;