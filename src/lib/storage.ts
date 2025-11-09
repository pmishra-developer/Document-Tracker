export interface DRNStatus {
  id?: string;
  document_title: string;
  outstanding_numbers: number;
  deadline_date: string;
  status: string;
  comments_raised: number;
  comment_rejected: number;
  notes_comments: string;
  created_at?: string;
  updated_at?: string;
}

export interface UCMStatus {
  id?: string;
  document_id: string;
  title: string;
  deadline_date: string;
  owner: string;
  status: string;
  reviewer: string;
  reviewer_status: string;
  approver: string;
  approver_status: string;
  external: boolean;
  created_at?: string;
  updated_at?: string;
}

const DRN_STORAGE_KEY = 'drn_status_items';
const UCM_STORAGE_KEY = 'ucm_status_items';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export const drnStorage = {
  getAll(): DRNStatus[] {
    const data = localStorage.getItem(DRN_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  save(items: DRNStatus[]): void {
    localStorage.setItem(DRN_STORAGE_KEY, JSON.stringify(items));
  },

  add(item: Partial<DRNStatus>): DRNStatus {
    const items = this.getAll();
    const newItem: DRNStatus = {
      ...item,
      id: generateId(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as DRNStatus;
    items.unshift(newItem);
    this.save(items);
    return newItem;
  },

  update(id: string, updates: Partial<DRNStatus>): void {
    const items = this.getAll();
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
      items[index] = {
        ...items[index],
        ...updates,
        updated_at: new Date().toISOString(),
      };
      this.save(items);
    }
  },

  delete(id: string): void {
    const items = this.getAll();
    const filtered = items.filter(item => item.id !== id);
    this.save(filtered);
  },
};

export const ucmStorage = {
  getAll(): UCMStatus[] {
    const data = localStorage.getItem(UCM_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  save(items: UCMStatus[]): void {
    localStorage.setItem(UCM_STORAGE_KEY, JSON.stringify(items));
  },

  add(item: Partial<UCMStatus>): UCMStatus {
    const items = this.getAll();
    const newItem: UCMStatus = {
      ...item,
      id: generateId(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as UCMStatus;
    items.unshift(newItem);
    this.save(items);
    return newItem;
  },

  update(id: string, updates: Partial<UCMStatus>): void {
    const items = this.getAll();
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
      items[index] = {
        ...items[index],
        ...updates,
        updated_at: new Date().toISOString(),
      };
      this.save(items);
    }
  },

  delete(id: string): void {
    const items = this.getAll();
    const filtered = items.filter(item => item.id !== id);
    this.save(filtered);
  },
};
