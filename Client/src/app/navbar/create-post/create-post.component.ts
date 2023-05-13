import { Component, EventEmitter, Output } from '@angular/core';
import { NavbarService } from '../navbar.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {

  @Output() close = new EventEmitter<any>()
  public step: boolean[] = [true, false]
  public file: FormControl = new FormControl(null)

  public cpForm: FormGroup = this.fb.group({
    user_id: [null, Validators.required],
    title: [null, Validators.required],
    tags: [''],
    contents: [[]]
  })
  //  onchange = "document.getElementById('blah').src = window.URL.createObjectURL(this.files[0])"

  constructor(private dbService: NavbarService, private fb: FormBuilder, private toastr: ToastrService) { }

  selectFile(event: any) {
    this.file.patchValue(event.target.files)
    console.log(this.file.value);
    this.step = [false, true]
  }

  getFileType(ext: string) {
    const videoExtensions = [".avi", ".mp4", ".wmv", ".mov", ".flv", ".mkv", ".m4v", ".mpg", ".mpeg", ".3gp", ".rm", ".swf", ".vob", ".webm", ".ts"];
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg", ".tif", ".tiff"];

    if (videoExtensions.includes(ext)) {
      return "video"
    } else if (imageExtensions.includes(ext)) {
      return "image"
    } else {
      return "other"
    }


  }

  createPost() {
    if (this.cpForm.get('title')?.invalid) {
      this.toastr.info('Please enter a caption of your post')
      return
    }
    var user = localStorage.getItem('_user')
    let body = new FormData()
    for (let i = 0; i < this.file.value.length; i++) {
      body.append('fileArr', this.file.value[i], this.file.value[i].name);
    }
    body.append("fileArr", this.file.value)
    this.dbService.fileUpload(body).subscribe((d: any) => {
      console.log(d);
      // this.toastr.success("Post uploadded")
      if (d?.data?.length > 0) {
        this.cpForm.patchValue({
          user_id: JSON.parse(user ? user : "")._id,
          contents: [{
            "type": this.getFileType(d.data[0].ext),
            "url": d.data[0].name + d.data[0].ext
          }]
        })
        this.dbService.createPost(this.cpForm.value).subscribe(
          d => {
            this.toastr.success("Post added successfully")
            this.closeEvent()
          }, e => {
            this.toastr.error("Something error")
          }
        )
      }


    }, e => {
      this.toastr.error("Something error")
    })
  }

  closeEvent() {
    this.close.emit()
  }

  back() {
    this.step = [true, false]
    this.file.reset()
  }

}
