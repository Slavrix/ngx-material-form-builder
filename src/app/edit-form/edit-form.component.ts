import { copyArrayItem, moveItemInArray, transferArrayItem,  } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { field, section, value } from '../global.model';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {

  title = 'ngx-custom-form-builder';

  value: value = {
    label:"",
    value:""
  };

  section: section = {
    name: '',
    description: '',
    id: '',
    attributes: []
  }

  success = false;
  opened = true;
  showJson = false;
  showForm = false;

  fieldModels:Array<field>=[
    {
      "type": "text",
      "icon": "text_fields",
      "label": "Text",
      "description": "",
      "placeholder": "",
      "regex" : "",
      "required": false,
      "validation": false
    },
    {
      "type": "email",
      "icon": "alternate_email",
      "required": true,
      "label": "Email",
      "description": "Enter a valid email address",
      "placeholder": "",
      "errorText": "Please enter a valid email",
      "validation": true
    },
    {
      "type": "phone",
      "icon": "phone",
      "label": "Phone",
      "description": "Enter your phone number including country code",
      "placeholder": "",
      "errorText": "Please enter a valid phone number",
      "required": false,
      "validation": false
    },
    {
      "type": "number",
      "label": "Number",
      "icon": "dialpad",
      "description": "",
      "placeholder": "",
      "min": 0,
      "max": 100,
      "required": false,
      "validation": false
    },
    {
      "type": "date",
      "icon": "calendar_month",
      "label": "Date",
      "placeholder": "",
      "required": false
    },
    {
      "type": "datetime-local",
      "icon": "calendar_month",
      "label": "DateTime",
      "placeholder": "",
      "required": false,
      "validation": false
    },
    {
      "type": "textarea",
      "icon": "notes",
      "label": "Textarea" ,
      "required": false,
      "validation": false
    },
    {
      "type": "paragraph",
      "icon": "short_text",
      "label": "Paragraph",
      "placeholder": "Type your text to display here only" ,
      "required": false,
      "validation": false
    },
    {
      "type": "checkbox",
      "required": true,
      "validation": false,
      "label": "Checkbox",
      "icon":"check_box",
      "description": "heckbox",
      "inline": true,
      "values": [
        {
          "label": "Option 1",
          "value": "option-1"
        },
        {
          "label": "Option 2",
          "value": "option-2"
        }
      ]
    },
    {
      "type": "radio",
      "icon":"radio_button_checked",
      "label": "Radio",
      "description": "",
      "required": false,
      "validation": false,
      "values": [
        {
          "label": "Option 1",
          "value": "option-1"
        },
        {
          "label": "Option 2",
          "value": "option-2"
        }
      ]
    },
    {
      "type": "select",
      "icon":"list",
      "label": "Select",
      "description": "",
      "placeholder": "",
      "required": false,
      "validation": false,
      "values": [
        {
          "label": "Option 1",
          "value": "option-1"
        },
        {
          "label": "Option 2",
          "value": "option-2"
        },
        {
          "label": "Option 3",
          "value": "option-3"
        }
      ]
    },
    {
      "type": "file",
      "icon": "file_upload",
      "label": "File Upload",
      "required": false,
      "validation": false
    },
    {
      "type": "rating",
      "icon": "star",
      "label": "Rating",
      "required": false,
      "validation": false,
      "max": 5
    }
  ];

  modelFields:Array<field>=[];

  model:any = {
    name:'',
    description:'',
    theme:{
      // bgColor:"ffffff",
      // textColor:"555555",
      // bannerImage:""
    },
    sections: [{
      name: '',
      description: '',
      id: '',
      attributes: []
    }, {
      name: '',
      description: '',
      id: '',
      attributes: []
    }]
    
  };

  constructor() { }

  ngOnInit() {
  }

  onDragStart(event: any) {
    console.log("drag started", event);
  }
  
  onDragEnd(event: any) {
    console.log("drag ended", event);
  }
  
  onDragged(event: any) {
    console.log("dragged", event);
  }

  onDrop(event: any) {
    console.log("dropped", event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else if(event.previousContainer.id == 'list-select') {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  addValue(values: any){
    values.push(this.value);
    this.value={label:"",value:""};
  }

  updateForm(){
    let input = new FormData;
    input.append('id',this.model._id);
    input.append('name',this.model.name);
    input.append('description',this.model.description);
    input.append('bannerImage',this.model.theme.bannerImage);
    input.append('bgColor',this.model.theme.bgColor);
    input.append('textColor',this.model.theme.textColor);
    input.append('attributes',JSON.stringify(this.model.attributes));
  }

  toggleValue(item: any){
    item.selected = !item.selected;
  }

  connectSections() {

    let arr: string[] = [];

    for (let i = 0; i < this.model.sections.length; i++) {
      arr.push('list-'+i);
    }
    return arr;
  }

  removeField(j: number, i: number){
    this.model.sections[j].attributes.splice(i,1);
  }

  addSection() {
    this.model.sections.push(this.section);
  }

  removeSection(j: number) {
    this.model.sections.splice(j,1);
  }
  // submit() {
  //   let valid = true;
  //   let validationArray = JSON.parse(JSON.stringify(this.model.attributes));
  //   validationArray.reverse().forEach((field: any) => {

  //     console.log(field.label+'=>'+field.required+"=>"+field.value);

  //     if(field.required && !field.value && field.type != 'checkbox') {
  //       valid = false;
  //       return false;
  //     }

  //     if(field.required && field.regex){
  //       let regex = new RegExp(field.regex);
  //       if(regex.test(field.value) == false){
  //         valid = false;
  //         return false;
  //       }
  //     }

  //     if(field.required && field.type == 'checkbox'){
  //       if(field.values.filter((r: any)=>r.selected).length == 0){
  //         valid = false;
  //         return false;
  //       }

  //     }
  //   });

  //   if(!valid){
  //     return false;
  //   }

  //   console.log('Save',this.model);
  //   let input = new FormData;
  //   input.append('formId',this.model._id);
  //   input.append('attributes',JSON.stringify(this.model.attributes))

  // }

}