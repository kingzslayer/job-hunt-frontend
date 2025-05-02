import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Input } from '../ui/input';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MultiSelectDropdownProps {
  items: string[];
  selected: string[];
  placeholder?: string;
  setSelected: Dispatch<SetStateAction<string[]>>;
}

export const MultiSelectDropdown = ({
  items,
  selected,
  setSelected,
  placeholder,
}: MultiSelectDropdownProps) => {
  const [query, setQuery] = useState<string>('');
  const [width, setWidth] = useState<number>(200);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [filteredItems, setFilteredItems] = useState<string[]>(items);

  const handleSelectItem = (item: string) => {
    setSelected((prev: string[]) =>
      prev.includes(item) ? prev.filter((s) => s !== item) : [...prev, item],
    );
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
    if (inputRef.current) {
      setWidth(inputRef.current.offsetWidth);
    }
  }, [inputRef, open]);

  return (
    <div className="flex flex-col overflow-hidden border">
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
        <DropdownMenuTrigger className="flex">
          <Input
            id="query_input"
            ref={inputRef}
            value={query}
            className="focus:border-primary border-x-0 border-y-0 ring-0 outline-0 outline-none focus:border-b focus:outline-0 focus-visible:ring-0"
            placeholder={placeholder}
            onChange={(event) => {
              if (event.target.value) {
                setOpen(open);
              }
              setQuery(event.target.value);
              handleFilter(event.target.value);
            }}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent tabIndex={0} style={{ width: width }} className="max-h-80 min-w-sm">
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
    </div>
  );
};
