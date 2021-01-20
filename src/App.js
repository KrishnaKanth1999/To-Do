import React, { Component } from 'react';
import './App.css';
import './css/bulma.min.css'
import './css/font-awesome-4.7.0/css/font-awesome.min.css'
import Header from './Components/Header.js';
import Todo from './Components/ToDo.js';
import SubmitForm from './Containers/Submit.js'
import Completed from './Components/Completed.js'
import Axios from 'axios';
import axios from 'axios';
Axios.defaults.baseURL="http://192.168.1.5:6039"
Axios.defaults.headers={'Access-Control-Allow-Origin': '*'}
class App extends React.Component {
 

  constructor(props)
  {
super(props)
this.todos=[]
this.completed1=[]
Axios.get('/todos',{ crossDomain: true })
.then(res => {
const persons = res.data.map(r=>{
  r.status=='complete'?this.completed1.push(r):this.todos.push(r)
});
console.log(res)
this.setState({tasks:this.todos,completed:this.completed1});
}).catch(e=>{console.log(e)})
  }
  state = {
    // tasks: [{id:'1','task':'task 1'},{id:'2','task':'task 2'} ,{id:'3','task':'task 3'}],
    // completed:[{id:'11','task':'task 1'},{id:'12','task':'task 2'} ,{id:'13','task':'task 3'}]
    tasks:[],
    completed:[]
  };
  handleSubmit = task => {
    axios.post("/addtodo",{task:task}).then(res=>{
      console.log(res.data)
      this.newtask={...res.data}
      this.setState({tasks: [...this.state.tasks, this.newtask]});
    }).catch(e=>console.log(e))
    
  }
  handleToDoDelete=(id)=>{
    axios.put("/tododeleted/"+id).then(res=>{
      console.log(res)
      this.copyTasks= this.state.tasks.filter((item) => item.id !== id)
      this.setState({tasks:this.copyTasks});
    }).catch(e=>{
      console.log(e)
    })
  
  }
  handleToAddComplete=(id)=>{
    axios.put("/todotocomplete/"+id).then(res=>{
    this.deletedTask= this.state.tasks.filter((item) => item.id == id)
    this.copyTasks= this.state.tasks.filter((item) => item.id !== id)
    this.copyTasks1=[...this.state.completed,...this.deletedTask]
    this.setState({tasks:this.copyTasks,completed:this.copyTasks1});
  }).catch(e=>{
    console.log(e)
  })
}

  handleCompletedDelete=(id)=>{
    axios.put("/completetodeleted/"+id).then(res=>{
    this.copyTasks= this.state.completed.filter((item) => item.id !== id)
    this.setState({completed:this.copyTasks});
  }).catch(e=>console.log(e))
}
  // componentDidMount() {
  //   this.todos=[]
  //       this.completed1=[]
  //   Axios.get('/todos',{ crossDomain: true })
  //     .then(res => {
  //       const persons = res.data.map(r=>{
  //         r.status=='complete'?this.completed1.push(r):this.todos.push(r)
  //       });
  //       console.log(res)
  //       this.setState({tasks:this.todos,completed:this.completed1});
  //     }).catch(e=>{console.log(e)})
  // }

  render() {
    let ToDos=this.state.tasks.map(todo=>{
      return <Todo todoid={todo.id} taskcontent={todo.task} handleToDoDelete={this.handleToDoDelete} handleToAddComplete={this.handleToAddComplete}/>
    });

    let completed=this.state.completed.map(comp=>{
      return <Completed todoid={comp.id} taskcontent={comp.task} handleCompletedDelete={this.handleCompletedDelete} />
    });
    return(
       <div className='wrapper'>
        <div className='card frame'>
        <h1 className="title is-1" style={{textAlign:"center"}}>To-Do Application </h1>

          <Header content={"You have to do "+this.state.tasks.length+" tasks"}/>
    
        <div className='list-wrapper'>
{ToDos}</div>
<Header content={"You have completed "+this.state.completed.length+" tasks"}/>

<div className='list-wrapper'>
{completed}</div>
<SubmitForm onFormSubmit={this.handleSubmit} />
      </div>
      </div>
    );
  }
}

export default App;
