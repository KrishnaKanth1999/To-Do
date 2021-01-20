
const header = (props) => {
    return(
      <div className='card-header'>
        <h1 className='card-header-title header'>
        {props.content}
        </h1>
      </div>
    )
  }
  export default header;