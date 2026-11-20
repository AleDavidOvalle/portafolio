import { Component, DestroyRef, afterNextRender, computed, inject, signal, viewChild } from '@angular/core';
import { CommandPalette } from './command-palette';
import { EMAIL, LINKS, MARQUEE } from './content';
import { LangService } from './lang.service';
import { Lightbox } from './lightbox';

const SECTIONS = ['about', 'experience', 'projects', 'stack', 'credentials', 'contact'] as const;
const CEFR = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

@Component({
  selector: 'app-root',
  imports: [Lightbox, CommandPalette],
  templateUrl: './app.html',
  host: { '(window:scroll)': 'onScroll()' },
})
export class App {
  private readonly langSvc = inject(LangService);
  protected readonly t = this.langSvc.t;
  protected readonly lang = this.langSvc.lang;

  protected readonly email = EMAIL;
  protected readonly links = LINKS;
  protected readonly marquee = [...MARQUEE, ...MARQUEE];
  protected readonly sections = SECTIONS;
  protected readonly cefr = CEFR;
  protected readonly year = new Date().getFullYear();

  protected readonly cvHref = computed(() => (this.lang() === 'es' ? LINKS.cvEs : LINKS.cvEn));
  protected readonly activeSection = signal<string>('');
  protected readonly scrolled = signal(false);
  protected readonly menuOpen = signal(false);
  protected readonly toast = signal('');
  protected readonly copied = signal(false);

  private readonly lightbox = viewChild.required(Lightbox);
  protected readonly palette = viewChild.required(CommandPalette);
  private toastTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) if (e.isIntersecting) this.activeSection.set(e.target.id);
        },
        { rootMargin: '-45% 0px -50% 0px' },
      );
      SECTIONS.forEach((id) => {
        const el = document.getElementById(id);
        if (el) io.observe(el);
      });
      destroyRef.onDestroy(() => io.disconnect());
    });
  }

  protected navLabel(id: (typeof SECTIONS)[number]): string {
    return this.t().nav[id];
  }

  protected isBasic(item: string): boolean {
    return item.endsWith('*');
  }

  protected clean(item: string): string {
    return item.replace(/\*$/, '');
  }

  protected toggleLang(): void {
    this.langSvc.toggle();
  }

  protected onScroll(): void {
    this.scrolled.set(window.scrollY > 24);
  }

  protected go(id: string, e?: Event): void {
    e?.preventDefault();
    this.menuOpen.set(false);
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(null, '', '#' + id);
  }

  protected openGallery(i = 0): void {
    this.lightbox().open(i);
  }

  protected async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(EMAIL);
      this.copied.set(true);
      this.showToast(this.t().contact.copied + ' · ' + EMAIL);
      setTimeout(() => this.copied.set(false), 1800);
    } catch {
      this.showToast(EMAIL);
    }
  }

  protected onPick(id: string): void {
    switch (id) {
      case 'gallery': this.go('projects'); setTimeout(() => this.openGallery(0), 350); break;
      case 'copy-email': void this.copyEmail(); break;
      case 'cv': window.open(this.cvHref(), '_blank', 'noopener'); break;
      case 'lang': this.toggleLang(); break;
      case 'github': window.open(LINKS.github, '_blank', 'noopener'); break;
      case 'linkedin': window.open(LINKS.linkedin, '_blank', 'noopener'); break;
      default: this.go(id);
    }
  }

  private showToast(msg: string): void {
    this.toast.set(msg);
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toast.set(''), 2400);
  }
}
