import { Component, ComponentRef, inject, OnDestroy, OnInit, signal, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MicroFrontendService } from './services/micro-frontend.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App  implements OnInit, OnDestroy{
private readonly microFrontendService = inject(MicroFrontendService);

  @ViewChild('todosList', { read : ViewContainerRef,  static: true }) todosContainer!: ViewContainerRef;
  @ViewChild('invoice', {  read : ViewContainerRef, static: true }) invoiceContainer!: ViewContainerRef;
  protected readonly title = signal('MainApp');

  private  todosContainerRef : ComponentRef<any> | null = null;
  private  invoiceContainerRef : ComponentRef<any> | null = null;

  constructor() {  }

  async ngOnInit(){
    // Dynamically load the micro-frontend when needed
    try{
     const todosModule =   await this.microFrontendService.loadMicroFrontend(environment.remotes.todos, 'todos');
     this.todosContainer.clear();
     this.todosContainerRef = this.todosContainer.createComponent(todosModule.App);
     this.todosContainerRef.changeDetectorRef.detectChanges();

     const invoiceModule =   await this.microFrontendService.loadMicroFrontend(environment.remotes.invoice, 'invoice');
     this.invoiceContainer.clear();
     this.invoiceContainerRef = this.invoiceContainer.createComponent(invoiceModule.App);
     this.invoiceContainerRef.changeDetectorRef.detectChanges();
    }catch(err){
      console.error('Error loading micro-frontend in ngOnInit:', err);
    }
  }

  ngOnDestroy(){
    // Clean up if necessary
    if(this.todosContainerRef){
      this.todosContainerRef.destroy();
    }
    if(this.invoiceContainerRef){
      this.invoiceContainerRef.destroy();
    }
  }
   
}
