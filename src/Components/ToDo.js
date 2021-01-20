import React from 'react';
const Todo = (props) => {
    return(
      <div className='list-item'>
           
{props.taskcontent}
        {/* <button class="delete is-pulled-right has-text-danger" onClick={()=>props.handleToDoDelete(props.todoid)}></button> */}
       
         <button class="is-pulled-right" onClick={()=>props.handleToAddComplete(props.todoid)}>
         <i class="fa fa-check" aria-hidden="true"></i>    
         </button>
         <button class="is-pulled-right" onClick={()=>props.handleToDoDelete(props.todoid)}>
         <i class="fa fa-times" aria-hidden="true"></i>
         </button>
     
      </div>
       
    );
  }
export default Todo;