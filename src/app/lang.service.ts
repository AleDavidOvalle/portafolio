import { DOCUMENT, Injectable, computed, effect, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { CONTENT, Lang } from './content';

const STORAGE_KEY = 'ao-lang';

function readStoredLang(): Lang | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'es' || v === 'en' ? v : null;
  } catch {
    return null;
  }
}

function detectLang(): Lang {
  const stored = readStoredLang();
  if (stored) return stored;
  const nav = typeof navigator !== 'undefined' ? navigator.language : 'es';
  return nav?.toLowerCase().startsWith('es') ? 'es' : 'en';
}

@Injectable({ providedIn: 'root' })
export class LangService {
  private readonly doc = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  readonly lang = signal<Lang>(detectLang());
  readonly t = computed(() => CONTENT[this.lang()]);

  constructor() {
    effect(() => {
      const lang = this.lang();
      const t = CONTENT[lang];
      this.doc.documentElement.lang = lang;
      this.title.setTitle(t.meta.title);
      this.meta.updateTag({ name: 'description', content: t.meta.description });
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch {
        /* storage blocked: language still works for this visit */
      }
    });
  }

  set(lang: Lang): void {
    this.lang.set(lang);
  }

  toggle(): void {
    this.lang.update((l) => (l === 'es' ? 'en' : 'es'));
  }
}
