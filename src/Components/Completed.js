import React from 'react';
const Completed = (props) => {
    return(
      <div className='list-item'>
           
{props.taskcontent}
<button class="is-pulled-right" onClick={()=>props.handleCompletedDelete(props.todoid)}>
         <i class="fa fa-times" aria-hidden="true"></i>
         </button>
      </div>
    );
  }
export default Completed;