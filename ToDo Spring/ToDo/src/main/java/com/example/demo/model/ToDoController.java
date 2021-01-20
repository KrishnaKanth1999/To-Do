package com.example.demo.model;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.repositories.ToDoRepository;
import com.example.demo.model.SequenceGeneratorService;
@RestController
public class ToDoController {

	@Autowired
	public ToDoRepository toDoRepository;
	
	@Autowired
    private SequenceGeneratorService sequenceGeneratorService;
	
    @CrossOrigin(origins = "http://192.168.1.5:3000")
	@GetMapping(value = "/todos")
	public List<ToDo> getToDos(){
		return toDoRepository.findBystatusNot("deleted");
		
	}
    @CrossOrigin(origins = "http://192.168.1.5:3000")
	@PostMapping(value="addtodo")
	public ToDo createrToDo(@RequestBody ToDo todo) {
		todo.setId(sequenceGeneratorService.generateSequence(ToDo.SEQUENCE_NAME));
todo.setStatus("todo");
	ToDo insertedToDo= toDoRepository.insert(todo);
		return insertedToDo;
	}
    
    @CrossOrigin(origins = "http://192.168.1.5:3000")
	@PutMapping(value="tododeleted/{id}")
	public ResponseEntity<ToDo> toDoDelete(@PathVariable(value = "id") Long toDoId){
	        ToDo toDo = toDoRepository.findById(toDoId).orElseThrow();
	        toDo.setStatus("deleted");
	        final ToDo updatedtoDo = toDoRepository.save(toDo);
	        return ResponseEntity.ok(updatedtoDo);
	    }
    @CrossOrigin(origins = "http://192.168.1.5:3000")
	@PutMapping(value="todotocomplete/{id}")
	public ResponseEntity<ToDo> moveToDoToComplete(@PathVariable(value = "id") Long toDoId) {
	        ToDo toDo = toDoRepository.findById(toDoId).orElseThrow();
	        toDo.setStatus("complete");
	        final ToDo updatedtoDo = toDoRepository.save(toDo);
	        return ResponseEntity.ok(updatedtoDo);
	    }
    @CrossOrigin(origins = "http://192.168.1.5:3000")
	@PutMapping(value="completetodeleted/{id}")
	public ResponseEntity<ToDo> completedToDeleted(@PathVariable(value = "id") Long toDoId){
	        ToDo toDo = toDoRepository.findById(toDoId).orElseThrow();
	        toDo.setStatus("deleted");
	        final ToDo updatedtoDo = toDoRepository.save(toDo);
	        return ResponseEntity.ok(updatedtoDo);
	    }
}
