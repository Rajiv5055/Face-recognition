import React from 'react';

const Rank=({name, entries}) => {
	return (
		<div>
		 <div className="f3 lh-copy b">
		  {`${name}, Your current entry count is...`}
		 </div>
		 <div className=" f1 b white">
		 {entries}
		 </div>
       </div>
	);
}


export default Rank;
