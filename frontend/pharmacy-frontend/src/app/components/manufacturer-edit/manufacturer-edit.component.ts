import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManufacturerService } from 'src/app/services/manufacturer.service';

@Component({
  selector: 'app-manufacturer-edit',
  templateUrl: './manufacturer-edit.component.html',
  styleUrls: ['./manufacturer-edit.component.scss']
})
export class ManufacturerEditComponent  implements OnInit{
updateSuccess: boolean = false;
    id: number = 0;
    constructor(private manufacturerService: ManufacturerService,
      private router: ActivatedRoute,
      private rout: Router
    ) { }
  
    manufacturerFormEdit: FormGroup = new FormGroup({
    tenNhaSX: new FormControl(),
    noiSX: new FormControl()
    });
  
    ngOnInit(): void {
      this.id = Number(this.router.snapshot.paramMap.get('id'));
      this.manufacturerService.getById(this.id).subscribe((data: any) => {
        
        this.manufacturerFormEdit.setValue({
          tenNhaSX: data.tenNhaSX,
          noiSX: data.noiSX
        });
      });
      
    
    }
  
   
    
  
    onUpdate() {
      const formData: FormData = new FormData();
      formData.append('tenNhaSX', this.manufacturerFormEdit.get('tenNhaSX')?.value || '');
     
      formData.append('noiSX', this.manufacturerFormEdit.get('noiSX')?.value || '');
    
      const updatecate = this.manufacturerFormEdit.value;
  
      this.manufacturerService.update(this.id, updatecate).subscribe(data => {
        this.updateSuccess = true; // Hiển thị thông báo thành công
  
        // Ẩn thông báo sau 2 giây
        setTimeout(() => {
          this.updateSuccess = false;
          this.rout.navigate(['/admin/manufacturer']);
        }, 2000);
  
      });
    }
  
  
    onHome() {
      this.rout.navigate(['/admin/manufacturer']);
    }
}
