package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="todo")
public class ToDo {
	@Transient
    public static final String SEQUENCE_NAME = "todo_sequence";
	@Id
	private long id;
	private String task;
	private String status;
	public ToDo() {
		super();
		// TODO Auto-generated constructor stub
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getTask() {
		return task;
	}
	public void setTask(String task) {
		this.task = task;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public ToDo(String task) {
		super();
		this.task = task;
		this.status = "todo";
	}
	
	
}
