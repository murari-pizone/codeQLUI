import { Component } from '@angular/core';

@Component({
  selector: 'app-modifiers-tab-images',
  standalone: true,
  imports: [],
  templateUrl: './modifiers-tab-images.component.html',
  styleUrl: './modifiers-tab-images.component.scss'
})
export class ModifiersTabImagesComponent {
  preview!: string;
  useAsDefault! : string 
  onDragOver(event: DragEvent):void {
    event.preventDefault();
    event.stopPropagation();
    const element = event.target as HTMLElement;
    element.classList.add('dragover');
  }

  onDragLeave(event: DragEvent):void {
    event.preventDefault();
    event.stopPropagation();
    const element = event.target as HTMLElement;
    element.classList.remove('dragover');
  }

  onDrop(event: DragEvent) :void{
    event.preventDefault();
    event.stopPropagation();
    const element = event.target as HTMLElement;
    element.classList.remove('dragover');

    if (event.dataTransfer?.files) {
      const file = event.dataTransfer.files[0];
      this.readFile(file);
    }
  }

  onFileSelected(event: Event):void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      this.readFile(file);
    }
  }

  private readFile(file: File):void {
    const reader = new FileReader();
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    reader.onload = () => {
      this.preview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  empty():void{
    console.log('')
  }
}
