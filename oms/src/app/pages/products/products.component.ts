import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [CommonModule, MatCardModule, MatIconModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {}
