import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Task } from '../../Task'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter;
  text!: string;
  day!: string;
  time!: string;
  reminder: boolean = false;
  showAddTask: boolean = true;
  subscription: Subscription;
  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe((value) => (this.showAddTask = value));
  }

  ngOnInit(): void {
  }

  onSubmit(){
    if (!this.text){
      alert('Please add a task!');
      return;
    }
    const newTask = {
      text: this.text,
      day: this.day,
      time: this.time,
      reminder: this.reminder
    }

    this.onAddTask.emit(newTask);

    this.text = '';
    this.day = '';
    this.time = '';
    this.reminder = false;
  }

}
