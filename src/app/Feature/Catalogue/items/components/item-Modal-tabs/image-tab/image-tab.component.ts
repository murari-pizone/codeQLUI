import { Component } from '@angular/core';

@Component({
  selector: 'app-image-tab',
  standalone: true,
  imports: [],
  templateUrl: './image-tab.component.html',
  styleUrl: './image-tab.component.scss'
})
export class ImageTabComponent {
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
