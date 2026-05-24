import {
  a as __toESM,
  n as require_react,
  t as require_jsx_runtime,
} from './jsx-runtime-CpkZU50A.js'
import { J as cn } from './index-C5u061c7.js'
//#region src/components/ui/table.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1)
var import_jsx_runtime = require_jsx_runtime()
var Table = import_react.forwardRef(({ className, wrapperClassName, ...props }, ref) =>
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
    'data-uid': 'src/components/ui/table.tsx:10:3',
    'data-prohibitions': '[editContent]',
    className: cn('relative w-full h-full overflow-auto', wrapperClassName),
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)('table', {
      'data-uid': 'src/components/ui/table.tsx:11:5',
      'data-prohibitions': '[editContent]',
      ref,
      className: cn('w-full caption-bottom text-sm', className),
      ...props,
    }),
  }),
)
Table.displayName = 'Table'
var TableHeader = import_react.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('thead', {
    'data-uid': 'src/components/ui/table.tsx:20:3',
    'data-prohibitions': '[editContent]',
    ref,
    className: cn('[&_tr]:border-b', className),
    ...props,
  }),
)
TableHeader.displayName = 'TableHeader'
var TableBody = import_react.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('tbody', {
    'data-uid': 'src/components/ui/table.tsx:27:37',
    'data-prohibitions': '[editContent]',
    ref,
    className: cn(className),
    ...props,
  }),
)
TableBody.displayName = 'TableBody'
var TableFooter = import_react.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('tfoot', {
    'data-uid': 'src/components/ui/table.tsx:34:3',
    'data-prohibitions': '[editContent]',
    ref,
    className: cn('border-t bg-muted/50 font-medium', className),
    ...props,
  }),
)
TableFooter.displayName = 'TableFooter'
var TableRow = import_react.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('tr', {
    'data-uid': 'src/components/ui/table.tsx:40:5',
    'data-prohibitions': '[editContent]',
    ref,
    className: cn('transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted', className),
    ...props,
  }),
)
TableRow.displayName = 'TableRow'
var TableHead = import_react.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('th', {
    'data-uid': 'src/components/ui/table.tsx:56:3',
    'data-prohibitions': '[editContent]',
    ref,
    className: cn(
      'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
      className,
    ),
    ...props,
  }),
)
TableHead.displayName = 'TableHead'
var TableCell = import_react.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('td', {
    'data-uid': 'src/components/ui/table.tsx:71:3',
    'data-prohibitions': '[editContent]',
    ref,
    className: cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className),
    ...props,
  }),
)
TableCell.displayName = 'TableCell'
var TableCaption = import_react.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('caption', {
    'data-uid': 'src/components/ui/table.tsx:83:3',
    'data-prohibitions': '[editContent]',
    ref,
    className: cn('mt-4 text-sm text-muted-foreground', className),
    ...props,
  }),
)
TableCaption.displayName = 'TableCaption'
//#endregion
export {
  TableHeader as a,
  TableHead as i,
  TableBody as n,
  TableRow as o,
  TableCell as r,
  Table as t,
}

//# sourceMappingURL=table-Ltl_F7lh.js.map
