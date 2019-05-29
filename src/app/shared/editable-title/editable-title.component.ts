import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-editable-title',
  templateUrl: './editable-title.component.html',
  styleUrls: ['./editable-title.component.css']
})

export class EditableTitleComponent implements OnInit {
  @Input()
  title:string;
  @Output()
  titleUpdate = new EventEmitter();
  editingTitle: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  editTitle(){
    this.editingTitle = true;
  }

  updateTitle(){
    if(this.title){
      this.titleUpdate.emit(this.title);
      this.editingTitle = false
    }else{
      this.editingTitle = true;
    }
  }

  blurOnEnter(event) {
    if (event.keyCode === 13) {
      event.target.blur();
    }
  }

}
