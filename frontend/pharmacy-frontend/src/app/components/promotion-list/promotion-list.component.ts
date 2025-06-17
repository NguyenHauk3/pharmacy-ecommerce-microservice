import { Component } from '@angular/core';
import { Promotion } from 'src/app/modal/Promotion';
// import { Promotion } from 'src/app/modal/Promotion';
import { PromotionService } from 'src/app/services/promotion.service';

@Component({
  selector: 'app-promotion-list',
  templateUrl: './promotion-list.component.html',
  styleUrls: ['./promotion-list.component.scss']
})
export class PromotionListComponent {
  promotions :Promotion[]=[];
       page = 0; //Trang hiện tại
  size = 100; // Số lượng bản ghi trên mỗi trang
  sort = 'id,asc';
    
      
      constructor(private promotionService: PromotionService
      ) { }
     
    
      ngOnInit(): void {
        this.getALL();
       
      }
    
      
    
      getALL(): void {
        this.promotionService.getPromotions(this.page, this.size, this.sort).subscribe(data => {
          console.log(data);
          this.promotions = data.content; // Lấy danh sách sản phẩm từ API
        });
      }
  
      onDelete(id: number | undefined){
        if(id != undefined)
        this.promotionService.delete(id).subscribe(data => {
          this.getALL();
        })
      }
}
