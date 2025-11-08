import { Component } from '@angular/core';
import { ItemCard } from "./item-card/item-card";
import { JsItems, AngularItems } from "./item-card/items";

@Component({
  selector: 'app-basic-js',
  imports: [ItemCard],
  templateUrl: './basic-js.html',
  styleUrl: './basic-js.scss'
})
export class BasicJs {

  JsItems = JsItems;
  AngularItems = AngularItems;

}
