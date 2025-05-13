import { useEffect, useRef, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Input } from '../ui/input';
import { ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Label } from '../ui/label';

interface MultiSelectDropdownProps {
  items: string[];
  label?: string;
  error?: string;
  selected: string[];
  placeholder?: string;
  setSelected: (string: string[]) => void;
}

export const MultiSelectDropdown = ({
  items,
  label,
  selected,
  error,
  setSelected,
  placeholder,
}: MultiSelectDropdownProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState<string>('');
  const [width, setWidth] = useState<number>(100);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState<boolean>(false);
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

  useEffect(() => {
    if (inputRef.current && divRef.current) {
      setWidth(divRef.current.offsetWidth);
    }
  }, [inputRef, open]);

  return (
    <div className="my-1 flex flex-col space-y-1">
      {label && <Label>{label}</Label>}
      <div className="border-input flex flex-col overflow-hidden rounded-md border shadow-sm">
        <div ref={divRef} className="flex h-9 w-full flex-col">
          <DropdownMenu
            open={open}
            modal={false}
            onOpenChange={(open) => {
              setOpen(open);
              if (inputRef.current && open) {
                setTimeout(() => {
                  inputRef.current?.focus();
                  setOpen(true);
                }, 10);
              }
            }}
          >
            <DropdownMenuTrigger
              className={cn(
                open ? 'border-primary' : 'border-transparent',
                'flex h-9 items-center justify-end border-b-2',
              )}
            >
              <Input
                id={label}
                ref={inputRef}
                value={query}
                className="border-0 shadow-none ring-0 outline-0 outline-none focus:outline-0 focus-visible:ring-0"
                placeholder={placeholder}
                onChange={(event) => {
                  if (event.target.value) {
                    setOpen(open);
                  }
                  setQuery(event.target.value);
                  handleFilter(event.target.value);
                }}
              />
              <ChevronDown className="mx-2 size-6 cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent tabIndex={0} style={{ width: width }} className="max-h-80">
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
        </div>
        {selected.length > 0 && (
          <div
            className={cn(
              selected.length > 0 && 'py-2',
              'flex w-full flex-row flex-wrap gap-2 px-2 text-xs',
            )}
          >
            {selected
              .sort((a, b) => a.localeCompare(b))
              .map((item) => (
                <div
                  key={item}
                  title={item}
                  className="bg-primary/15 flex h-7 cursor-pointer items-center justify-center gap-2 rounded-full p-1 px-3 whitespace-nowrap"
                >
                  {item}
                  <X
                    className="hover:text-destructive size-4"
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
