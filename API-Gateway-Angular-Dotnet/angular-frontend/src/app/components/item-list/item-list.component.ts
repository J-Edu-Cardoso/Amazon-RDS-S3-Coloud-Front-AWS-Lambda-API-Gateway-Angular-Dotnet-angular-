import { Component, OnInit } from '@angular/core';
import { ItemService, Item } from '../../services/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];
  newItemName = '';
  editingItem: Item | null = null;
  editedName = '';

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.itemService.getItems().subscribe(data => this.items = data);
  }

  addItem() {
    if (!this.newItemName.trim()) return;
    this.itemService.addItem({ name: this.newItemName }).subscribe(() => {
      this.newItemName = '';
      this.loadItems();
    });
  }

  startEdit(item: Item) {
    this.editingItem = { ...item };
    this.editedName = item.name;
  }

  saveEdit() {
    if (this.editingItem && this.editedName.trim()) {
      this.itemService.updateItem(this.editingItem.id, { name: this.editedName }).subscribe(() => {
        this.editingItem = null;
        this.editedName = '';
        this.loadItems();
      });
    }
  }

  cancelEdit() {
    this.editingItem = null;
    this.editedName = '';
  }

  deleteItem(id: number) {
    this.itemService.deleteItem(id).subscribe(() => this.loadItems());
  }
}
