import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PromotionService } from 'src/app/services/promotion.service';

@Component({
  selector: 'app-promotion-edit',
  templateUrl: './promotion-edit.component.html',
  styleUrls: ['./promotion-edit.component.scss']
})
export class PromotionEditComponent implements OnInit{
updateSuccess: boolean = false;
    id: number = 0;
    constructor(private promotionService: PromotionService,
      private router: ActivatedRoute,
      private rout: Router
    ) { }
  
    promotionFormEdit: FormGroup = new FormGroup({
    name: new FormControl(),
    date: new FormControl(),
    percent: new FormControl()
    });
  
    ngOnInit(): void {
      this.id = Number(this.router.snapshot.paramMap.get('id'));
      this.promotionService.getById(this.id).subscribe((data: any) => {
        
        const tgkm = new Date(data.date);
        const year = tgkm.getFullYear();

        const month = String(tgkm.getMonth() + 1).padStart(2, '0');

        const day = String(tgkm.getDate()).padStart(2, '0');

        const hours = String(tgkm.getHours()).padStart(2, '0');

        const minutes = String(tgkm.getMinutes()).padStart(2, '0');

        const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
        this.promotionFormEdit.setValue({
          name: data.name,
          date: formattedDateTime,
          percent: data.percent
        });
      });
      
    
    }
  
   
    
  
    onUpdate() {
       // Ghép thêm giây vào nếu backend yêu cầu định dạng có :ss
    const rawDateTime = this.promotionFormEdit.get('thoiGianKm')?.value;
    const fullDateTime = rawDateTime ? rawDateTime + ':00' : '';
     
      const formData: FormData = new FormData();
      formData.append('name', this.promotionFormEdit.get('name')?.value || '');
     
      formData.append('date', fullDateTime);
      formData.append('percent', this.promotionFormEdit.get('percent')?.value || '');
    
      const updatepromo = this.promotionFormEdit.value;
  
      this.promotionService.update(this.id, updatepromo).subscribe(data => {
        this.updateSuccess = true; // Hiển thị thông báo thành công
  
        // Ẩn thông báo sau 2 giây
        setTimeout(() => {
          this.updateSuccess = false;
          this.rout.navigate(['/promotions']);
        }, 2000);
  
      });
    }
  
  
    onHome() {
      this.rout.navigate(['/promotions']);
    }
}
