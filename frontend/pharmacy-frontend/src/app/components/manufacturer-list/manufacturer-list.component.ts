import { Component, OnInit } from '@angular/core';
import { Manufacturer } from 'src/app/modal/Manufacturer';
import { ManufacturerService } from 'src/app/services/manufacturer.service';

@Component({
  selector: 'app-manufacturer-list',
  templateUrl: './manufacturer-list.component.html',
  styleUrls: ['./manufacturer-list.component.scss']
})
export class ManufacturerListComponent implements OnInit {

  page = 0; //Trang hiện tại
    size = 100; // Số lượng bản ghi trên mỗi trang
    sort = 'id,asc';
    manufacturers :Manufacturer[]=[];
      
    
      constructor(private manufacturerService: ManufacturerService
      ) { }
     
    
      ngOnInit(): void {
        this.getALL();
       
      }
    
      getALL(): void {
        this.manufacturerService.getManufacturers(this.page,this.size,this.sort).subscribe(data => {
          
          this.manufacturers = data.content;
          console.log(this.manufacturers); // Lấy danh sách sản phẩm từ API
        });
      }
  
      onDelete(id: number | undefined){
        if(id != undefined)
        this.manufacturerService.delete(id).subscribe(data => {
          this.getALL();
        })
      }
}
