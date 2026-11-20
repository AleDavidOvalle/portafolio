import { Component, ElementRef, computed, inject, output, signal, viewChild } from '@angular/core';
import { LangService } from './lang.service';

export interface PaletteItem {
  id: string;
  label: string;
  group: 'sections' | 'actions';
  hint?: string;
}

@Component({
  selector: 'app-command-palette',
  host: { '(document:keydown)': 'globalKeys($event)' },
  template: `
    <dialog #dlg class="cp" (close)="onClose()" (click)="backdrop($event)" [attr.aria-label]="t().nav.search">
      <div class="cp-inner">
        <input
          #box
          id="cp-input"
          class="cp-input"
          type="text"
          autocomplete="off"
          spellcheck="false"
          [placeholder]="t().palette.placeholder"
          [value]="query()"
          (input)="onInput($event)"
          (keydown)="nav($event)"
          role="combobox"
          aria-controls="cp-list"
          aria-expanded="true"
          [attr.aria-activedescendant]="'cp-' + (filtered()[active()]?.id ?? '')"
        />
        <ul id="cp-list" class="cp-list" role="listbox">
          @for (item of filtered(); track item.id; let i = $index) {
            @if (i === 0 || filtered()[i - 1].group !== item.group) {
              <li class="cp-group" role="presentation">{{ item.group === 'sections' ? t().palette.sections : t().palette.actions }}</li>
            }
            <li
              [id]="'cp-' + item.id"
              role="option"
              class="cp-item"
              [class.on]="i === active()"
              [attr.aria-selected]="i === active()"
              (mouseenter)="active.set(i)"
              (click)="choose(item)"
            >
              <span>{{ item.label }}</span>
              @if (item.hint) { <small>{{ item.hint }}</small> }
            </li>
          } @empty {
            <li class="cp-empty">{{ t().palette.empty }}</li>
          }
        </ul>
      </div>
    </dialog>
  `,
})
export class CommandPalette {
  protected readonly t = inject(LangService).t;
  readonly picked = output<string>();

  protected readonly query = signal('');
  protected readonly active = signal(0);
  private readonly dlg = viewChild.required<ElementRef<HTMLDialogElement>>('dlg');
  private readonly box = viewChild.required<ElementRef<HTMLInputElement>>('box');

  private readonly items = computed<PaletteItem[]>(() => {
    const t = this.t();
    return [
      { id: 'about', label: t.nav.about, group: 'sections' },
      { id: 'experience', label: t.nav.experience, group: 'sections' },
      { id: 'projects', label: t.nav.projects, group: 'sections' },
      { id: 'stack', label: t.nav.stack, group: 'sections' },
      { id: 'credentials', label: t.nav.credentials, group: 'sections' },
      { id: 'contact', label: t.nav.contact, group: 'sections' },
      { id: 'gallery', label: t.projects.featured.labels.gallery, group: 'actions', hint: t.projects.featured.title },
      { id: 'copy-email', label: t.palette.copyEmail, group: 'actions' },
      { id: 'cv', label: t.palette.downloadCv, group: 'actions', hint: 'PDF' },
      { id: 'lang', label: t.palette.switchLang, group: 'actions', hint: 'ES / EN' },
      { id: 'github', label: 'GitHub', group: 'actions', hint: '↗' },
      { id: 'linkedin', label: 'LinkedIn', group: 'actions', hint: '↗' },
    ];
  });

  protected readonly filtered = computed(() => {
    const q = this.normalize(this.query());
    if (!q) return this.items();
    return this.items().filter((i) => this.normalize(i.label + ' ' + (i.hint ?? '')).includes(q));
  });

  open(): void {
    const d = this.dlg().nativeElement;
    if (d.open) return;
    this.query.set('');
    this.active.set(0);
    d.showModal();
    queueMicrotask(() => this.box().nativeElement.focus());
  }

  protected globalKeys(e: KeyboardEvent): void {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const d = this.dlg().nativeElement;
      if (d.open) d.close();
      else this.open();
    }
  }

  protected onInput(e: Event): void {
    this.query.set((e.target as HTMLInputElement).value);
    this.active.set(0);
  }

  protected nav(e: KeyboardEvent): void {
    const n = this.filtered().length;
    if (!n) return;
    if (e.key === 'ArrowDown') { this.active.update((i) => (i + 1) % n); e.preventDefault(); }
    if (e.key === 'ArrowUp') { this.active.update((i) => (i - 1 + n) % n); e.preventDefault(); }
    if (e.key === 'Enter') { this.choose(this.filtered()[this.active()]); e.preventDefault(); }
  }

  protected choose(item: PaletteItem): void {
    this.dlg().nativeElement.close();
    this.picked.emit(item.id);
  }

  protected onClose(): void {
    this.query.set('');
  }

  protected backdrop(e: MouseEvent): void {
    if (e.target === this.dlg().nativeElement) this.dlg().nativeElement.close();
  }

  private normalize(s: string): string {
    return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
  }
}
