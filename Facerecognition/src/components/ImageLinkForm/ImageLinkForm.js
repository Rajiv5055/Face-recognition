import React from 'react';
//import './Navigation.css';
import './ImageLinkForm.css';



const ImageLinkForm=({onInputChange, onButtonSubmit})=>{
	return (
		<div>
		<p className='i'>
		{'Wanna Detect your face,try it!!!'}
		</p>
		<div className='center'>
	    	
	      <div className='center detect'>
	      	<input className='inputurl' type='text' 
	    	onChange={onInputChange}/>
            <button className='Button'
             onClick={onButtonSubmit}>Detect</button>
		  </div>
		</div>
	    </div>
	);
}


export default ImageLinkForm;
