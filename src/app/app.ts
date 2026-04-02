import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FundsService } from './core/services/funds-service';
import { Fund } from './shared/models/fund';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('fondos-app');
  private fundsService = inject(FundsService);
  funds = signal<Fund[]>([]); // falta interface
  hasFunds = signal(false);

  constructor() {
  }

  ngOnInit() {
    this.getAllFunds();
  }

  getAllFunds(): void {
    this.fundsService.getFunds().subscribe({
      next: (res) => {
        const getDataFunds = res ?? [];
        this.funds.set(getDataFunds);
        this.hasFunds.set(getDataFunds.length > 0);
      }, error: (error) => {
        console.error('Error loading funds', error);
        this.funds.set([]);
        this.hasFunds.set(false);
      }
    });
  }

  addFunds(): void {
    //  this.funds.set([...this.funds(),
    //   { id: 3, name: 'Fondo de Inversión A', category: 'FF', valueFund: 2500 }
    // ]);

    const body = {
      id: '3', name: 'Fondo de Inversión A', category: 'FF', valueFund: 2500
    };

    this.fundsService.addFund(body).subscribe({
      next: (res) => {
        console.log('Fund added successfully', res);
        this.getAllFunds();
      }, error: (error) => {
        console.error('Error adding fund', error);
      }
    });

  }

  deleteFund(): void {
    this.fundsService.deleteFund('_u1Mqmze8F0').subscribe({
      next: (res) => {
        console.log('delete successfully', res);
        this.getAllFunds();
      }, error: (error) => {
        console.error('Error deleting fund', error);
      }
    });
  }

  updateFund(): void {
    const body = {
      name: 'Fondo de Inversión C', category: 'FF', valueFund: 36000
    };

    this.fundsService.updateFund('EJza8CLk5A4', body).subscribe({
      next: (res) => {
        console.log('update successfully', res);
        this.getAllFunds();
      }, error: (error) => {
        console.error('Error updating fund', error);
      }
    });
  }

}
