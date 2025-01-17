import { Component, OnInit } from '@angular/core';
import { SeoService } from 'projects/materialgrammi/src/public-api';

@Component({
  selector: 'app-comp-chip',
  templateUrl: './comp-chip.component.html',
  styleUrls: ['./comp-chip.component.css']
})
export class CompChipComponent implements OnInit {
  inputOptions = [{
    name: "theme",
    allowed: "primary | success | warning | danger | info | lite | dark",
    type: "string",
    default: "dark"
  }, {
    name: "outline",
    allowed: "true | false",
    type: "boolean",
    default: "false"
  }];

  selector = "mg-chip";

  title = "Chip";
  
  code = `<mg-chip>Chip</mg-chip>`;

  optionsApplied = {}

  outputOptions = [];

  constructor(private seo: SeoService) { }

  ngOnInit(): void {
    this.seo.setTitle("Materialgrammi | Chip");
  }

}
