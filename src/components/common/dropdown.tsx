import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Input } from '../ui/input';
import { ChevronDown, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Label } from '../ui/label';

interface MultiSelectDropdownProps {
  items: string[];
  label?: string;
  error?: string;
  mode?: 'default' | 'add';
  required?: boolean;
  selected: string[];
  placeholder?: string;
  setSelected: (string: string[]) => void;
}

export const MultiSelectDropdown = ({
  items,
  label,
  error,
  selected,
  required,
  mode = 'default',
  setSelected,
  placeholder,
}: MultiSelectDropdownProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState<string>('');
  const [width, setWidth] = useState<number>(100);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [focus, setFocus] = useState<boolean>(false);
  const [filteredItems, setFilteredItems] = useState<string[]>(items);

  const handleSelectItem = (item: string) => {
    setSelected(selected.includes(item) ? selected.filter((s) => s !== item) : [...selected, item]);
    if (filteredItems.length === 0) {
      setFilteredItems(items);
    }
    setQuery('');
  };

  const handleFilter = (query: string) => {
    setOpen(true);
    setFilteredItems(items.filter((item) => item.toLowerCase().includes(query.toLowerCase())));
  };

  const handleSearchFocus = (open: boolean) => {
    setOpen(open);
    if (inputRef.current && open) {
      setTimeout(() => {
        inputRef.current?.focus();
        setOpen(true);
      }, 10);
    }
  };

  const handleAddItem = () => {
    setFocus(true);
    setQuery('');
    inputRef.current?.focus();
    if (query !== '' && !selected.includes(query)) {
      setSelected([...selected, query]);
    }
  };

  const handleSearchQuery = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setOpen(open);
    }
    setQuery(event.target.value);
    if (mode !== 'add') {
      handleFilter(event.target.value);
    }
  };

  useEffect(() => {
    if (inputRef.current && divRef.current && mode !== 'add') {
      setWidth(divRef.current.offsetWidth);
    }
  }, [inputRef, open, mode]);

  return (
    <div className="mb-1 flex flex-col space-y-1 overflow-hidden rounded-md shadow-sm">
      {label && (
        <Label>
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
      )}
      <div ref={divRef} className="border-input flex flex-col overflow-hidden rounded-md border">
        {mode === 'default' && (
          <DropdownMenu open={open} modal={false} onOpenChange={handleSearchFocus}>
            <div
              className={cn(
                open ? 'border-primary' : 'border-transparent',
                'flex w-full flex-row items-center justify-end overflow-hidden border-b-2',
              )}
            >
              <DropdownMenuTrigger className="flex w-full items-center">
                <Input
                  id={label}
                  ref={inputRef}
                  value={query}
                  onFocus={() => setFocus(true)}
                  className="h-8 border-0 shadow-none ring-0 outline-0 outline-none focus:outline-0 focus-visible:ring-0"
                  placeholder={placeholder}
                  onChange={handleSearchQuery}
                />
              </DropdownMenuTrigger>
              {selected.length > 0 ? (
                <X
                  className="hover:text-destructive mx-2 size-5 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelected([]);
                  }}
                />
              ) : (
                <ChevronDown className="mx-2 size-5 cursor-pointer" />
              )}
            </div>
            <DropdownMenuContent
              align="start"
              tabIndex={0}
              style={{ width: width }}
              className="max-h-80"
            >
              {filteredItems.map((item, i) => (
                <DropdownMenuCheckboxItem
                  key={`dropdown-item-${item}-${i}`}
                  tabIndex={-1}
                  onSelect={(e) => {
                    e.preventDefault(); // Prevent closing
                  }}
                  checked={selected.includes(item)}
                  onCheckedChange={() => handleSelectItem(item)}
                >
                  {item}
                </DropdownMenuCheckboxItem>
              ))}
              {filteredItems.length === 0 && (
                <div className="flex flex-col">
                  <div className="p-2 text-sm">No search result found.</div>{' '}
                  <DropdownMenuItem
                    tabIndex={-1}
                    onClick={() => {
                      handleSelectItem(query);
                      setOpen(false);
                    }}
                  >
                    {query}
                  </DropdownMenuItem>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {mode === 'add' && (
          <div
            className={cn(
              focus ? 'border-primary' : 'border-transparent',
              'flex w-full flex-row items-center justify-end overflow-hidden border-b-2',
            )}
          >
            <Input
              id={label}
              ref={inputRef}
              value={query}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              className="h-8 border-0 shadow-none ring-0 outline-0 outline-none focus:outline-0 focus-visible:ring-0"
              placeholder={placeholder}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddItem();
                }
              }}
              onChange={handleSearchQuery}
            />
            <div
              className={cn(focus && 'hover:bg-primary/20', 'flex h-8 items-center justify-center')}
            >
              <Plus className="mx-2 size-5 cursor-pointer" onClick={handleAddItem} />
            </div>
          </div>
        )}
        {selected.length > 0 && (
          <div
            className={cn(
              selected.length > 0 && 'pt-2 pb-2',
              'flex w-full flex-row flex-wrap gap-2 px-2',
            )}
          >
            {selected
              .sort((a, b) => a.localeCompare(b))
              .map((item) => (
                <div
                  key={`selected-item-${item}`}
                  title={item}
                  className="bg-primary/15 flex h-6 cursor-pointer items-center justify-center gap-2 rounded-full px-2 py-1 text-center text-xs whitespace-nowrap"
                >
                  {item}
                  <X
                    className="hover:text-destructive size-3"
                    onClick={() => setSelected([...selected.filter((fn) => fn !== item)])}
                  />
                </div>
              ))}
          </div>
        )}
      </div>
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
};
