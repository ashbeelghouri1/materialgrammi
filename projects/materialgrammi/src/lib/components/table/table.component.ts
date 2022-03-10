import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'mg-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {
  @Input() theme = "dark";
  @Input() mgData: any = [];
  @Input() ignoredColumns: any = ["id"];
  @Input() sortBy: any = "";
  @Input() sortDirection = "ASC";
  @Input() tableTitle = "Table";
  @Input() fixedHeader = false;
  @Input() dragableSort = false;
  @Input() paginate = {
    status: false, 
    perPage: 5
  };
  @Input() columnsOrder:any = [];

  @Input() showOptions = {
    title: false,
    filter: false,
    sort: false,
    count: false
  };

  show = false;
  setShowTimer(): any {
    var $this = this;
    setTimeout(function () {
      $this.show = true;
    }, 1000);
  }
  reformedData: any = [];
  reformedHeads: any = {};

  headings: any = [];

  filterQuery: any = [];

  count = 0;

  paginatedData = [];

  openFilterBox = false;
  openSortBox = false;
  sortOptions: any = [];
  constructor() { }

  ngOnInit(): void {
    this.init();
    this.setShowTimer();
  }

  ngOnChanges(): void {
    this.init();
  }

  init() {
    this.extractHeadings();
    this.refactorData();
    this.count = this.reformedData.length;
  }

  concatHeads(headObj: any) {
    for (let i = 0; i < headObj.length; i++) {
      if (!this.headings.includes(headObj[i]) && !this.ignoredColumns.includes(headObj[i])) {
        this.headings.push(headObj[i]);
        this.sortOptions.push({ name: headObj[i], val: headObj[i] });
        this.filterQuery.push({ name: headObj[i], val: new FormControl("") });
      }
    }
  }

  sortColumns(){
    if(this.columnsOrder && this.columnsOrder.length > 0){
      let newHeads:any = [];
      for(let i = 0; i < this.columnsOrder.length; i++){
        for(let j = 0; j < this.headings.length; j++){
          if(this.columnsOrder[i] === this.headings[j]){
            newHeads.push(this.headings[j]);
          }
        }
      }

      let newDiff = this.headings.filter((x:any) => !newHeads.includes(x));
      newHeads = [...newHeads, ...newDiff];
      this.headings = newHeads;
    }
  }

  extractHeadings() {
    for (let i = 0; i < this.mgData.length; i++) {
      let objHeads = Object.keys(this.mgData[i]);
      this.concatHeads(objHeads);
    }
    this.sortColumns();
  }

  refactorData(dataToUpdate: any[] = this.mgData) {

    this.reformedData = [];

    for (let i = 0; i < dataToUpdate.length; i++) {
      let data: any = [];

      for (let j = 0; j < this.headings.length; j++) {

        let d = dataToUpdate[i][this.headings[j]] != undefined ? dataToUpdate[i][this.headings[j]] : "-";
        data.push(d);
      }

      this.reformedData.push(data);

    }

    this.reformedHeads = this.reformedData[0];
    this.sortByException();
  }

  sortFlip(newKey: any) {
    this.sortDirection = this.sortDirection === "" ? "ASC" : this.sortDirection;
    if (this.sortBy != "") {
      if (this.sortBy == newKey) {
        if (this.sortDirection == "ASC") {
          this.sortDirection = "DESC";
        } else {
          this.sortDirection = "ASC";
        }
      } else {
        this.sortDirection = "ASC";
      }
    }
  }

  sort(sortKey: any) {
    console.log("key ==> ", sortKey);
    this.sortByException();
    if (this.sortBy != "") {
      this.sortFlip(sortKey);
      this.sortBy = sortKey;
      let sorter = this.headings.indexOf(this.sortBy);
      var $this = this;
      let compare = (a: any, b: any) => {
        a[sorter] = a[sorter].toString();
        b[sorter] = b[sorter].toString();

        if (a[sorter] < b[sorter]) {
          return $this.sortDirection === "ASC" ? -1 : 1;
        }
        if (a[sorter] > b[sorter]) {
          return $this.sortDirection === "ASC" ? 1 : -1;
        }
        return 0;
      }
      this.reformedData = this.reformedData.sort(compare);
    }

  }

  sortByException() {
    if (this.sortBy == "") {
      this.sortBy = this.headings[0];
    }
  }


  filter(filterKey: any) {
    this.reformedData = this.reformedData.filter(function (el: any) {
      return el.price <= 1000 &&
        el.sqft >= 500 &&
        el.num_of_beds >= 2 &&
        el.num_of_baths >= 2.5;
    });
  }

  openSorter() {
    this.openSortBox = !this.openSortBox;
    this.openFilterBox = false;
  }

  openFilter() {
    this.openFilterBox = !this.openFilterBox;
    this.openSortBox = false;
  }

  search(enable: boolean) {
    console.log(enable);
  }

  recieveData(event: any, k: number){
    if(this.dragableSort){
      let fromColumn = this.columnsOrder[event.order];
      this.columnsOrder[event.order] = this.columnsOrder[k];
      this.columnsOrder[k] = fromColumn;
      fromColumn = undefined;
      this.extractHeadings();
      if(this.paginate.status){
        this.refactorData(this.paginatedData);
      }else {
        this.refactorData();
      }
    }
  }

  updatePaginatedData(data:any){
    
    this.paginatedData = data;
    if(this.paginate.status) this.refactorData(this.paginatedData);
  }

}