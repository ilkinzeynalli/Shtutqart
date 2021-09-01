import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { AuthService } from "../../admin/login/services/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertifyService } from "app/core/services/alertify.service";
import { ProductEnterDto } from "./models/productEnterDto";
import { translate } from "@angular/localize/src/utils";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-product-enter",
  templateUrl: "./product-enter.component.html",
  styleUrls: ["./product-enter.component.css"],
})
export class ProductEnterComponent implements OnInit {
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  productEnterForm: FormGroup;
  productEnterItem:ProductEnterDto;
  productEnterItems:any[] = [];
  //
  displayedColumns: string[] = [
    "modelName",
    "productCode",
    "productName",
    "unitType",
    "firmName",
    "place",
    "purchasePrice",
    "salePrice",
    "update",
    "delete",
  ];

  constructor(
    private formBuilder: FormBuilder,
    private alertifyService: AlertifyService,
    private authService: AuthService,
    private translateService: TranslateService
  ) {}

  

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource([
      {
        modelName: "model 1",
        productCode: "code 1",
        productName: "name 1",
        unitType: "unit typ 1",
        firmName: "firm 1",
        place: "place 1",
        purchasePrice: "1230",
        salePrice: "3434",
      },
      {
        modelName: "model 1",
        productCode: "code 1",
        productName: "name 1",
        unitType: "unit typ 1",
        firmName: "firm 1",
        place: "place 1",
        purchasePrice: "1230",
        salePrice: "3434",
      },
      {
        modelName: "model 1",
        productCode: "code 1",
        productName: "name 1",
        unitType: "unit typ 1",
        firmName: "firm 1",
        place: "place 1",
        purchasePrice: "1230",
        salePrice: "3434",
      },
    ]);

    this.createProductEnterForm();
  }

  createProductEnterForm() {
    this.productEnterForm = this.formBuilder.group({
      model: ["",Validators.required],
      productCode:["",Validators.required],
      productName:["",Validators.required],
      unitType:["",Validators.required],
      firm:["",Validators.required],
      shelfPlace:["",Validators.required],
      purchasePrice:["",Validators.required],
      salePrice:["",Validators.required],
      description:[]
    })
  }

  addProductEnterItem(){
    if (this.productEnterForm.valid){
      this.productEnterItem = Object.assign({}, this.productEnterForm.value)
      this.productEnterItems.push(this.productEnterItem);
      this.translateService.get('Added').subscribe(value=>{
        this.alertifyService.success(value);
      })
    }
  }

  deleteFromProductEnterItems(item: any){
    let index = this.productEnterItems.find(f=>f.productCode == item.productCode);
    this.productEnterItems.splice(index,1);

    this.translateService.get('Deleted').subscribe(value=>{
      this.alertifyService.error(value);
    })
  }

  clearFormGroup(group: FormGroup) {
    Object.keys(group.controls).forEach((key) => {
        const control = group.controls[key];
        control.setValue(null);
        control.markAsPristine();
        control.markAsUntouched();
    });
  }

  clearProductEnterItems(){
    this.productEnterItems = [];
  }

  save() {
    if (this.productEnterForm.valid) {
    }
  }


  checkClaim(claim: string): boolean {
    return this.authService.claimGuard(claim);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
