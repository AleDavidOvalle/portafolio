import { Component, ElementRef, computed, inject, input, signal, viewChild } from '@angular/core';
import { Shot } from './content';
import { LangService } from './lang.service';

@Component({
  selector: 'app-lightbox',
  template: `
    <dialog #dlg class="lb" (close)="onClose()" (click)="backdrop($event)" (keydown)="keys($event)" [attr.aria-label]="current()?.caption">
      @if (current(); as shot) {
        <div class="lb-inner">
          <header class="lb-head">
            <span class="lb-count">{{ index() + 1 }} {{ t().lightbox.of }} {{ shots().length }}</span>
            <p class="lb-cap">{{ shot.caption }}</p>
            <button type="button" class="lb-btn" (click)="close()" [attr.aria-label]="t().lightbox.close">✕</button>
          </header>
          <div class="lb-stage">
            <button type="button" class="lb-nav prev" (click)="step(-1)" [attr.aria-label]="t().lightbox.prev">‹</button>
            <img [src]="shot.src" [alt]="shot.caption" />
            <button type="button" class="lb-nav next" (click)="step(1)" [attr.aria-label]="t().lightbox.next">›</button>
          </div>
          <div class="lb-thumbs">
            @for (s of shots(); track s.src; let i = $index) {
              <button type="button" [class.on]="i === index()" (click)="index.set(i)" [attr.aria-label]="s.caption">
                <img [src]="s.src" alt="" loading="lazy" />
              </button>
            }
          </div>
        </div>
      }
    </dialog>
  `,
})
export class Lightbox {
  readonly shots = input.required<Shot[]>();
  protected readonly t = inject(LangService).t;
  protected readonly index = signal(0);
  protected readonly current = computed(() => this.shots()[this.index()]);
  private readonly dlg = viewChild.required<ElementRef<HTMLDialogElement>>('dlg');

  open(i = 0): void {
    this.index.set(i);
    this.dlg().nativeElement.showModal();
    document.documentElement.classList.add('locked');
  }

  close(): void {
    this.dlg().nativeElement.close();
  }

  protected onClose(): void {
    document.documentElement.classList.remove('locked');
  }

  protected step(d: number): void {
    const n = this.shots().length;
    this.index.update((i) => (i + d + n) % n);
  }

  protected keys(e: KeyboardEvent): void {
    if (e.key === 'ArrowRight') { this.step(1); e.preventDefault(); }
    if (e.key === 'ArrowLeft') { this.step(-1); e.preventDefault(); }
  }

  protected backdrop(e: MouseEvent): void {
    if (e.target === this.dlg().nativeElement) this.close();
  }
}
