import {
  a as __toESM,
  n as require_react,
  t as require_jsx_runtime,
} from './jsx-runtime-CpkZU50A.js'
import { I as Primitive, U as cn } from './index-BcGnSmFb.js'
//#region ../../cache/modules/barbearia-pro-cee5d/node_modules/.pnpm/@radix-ui+react-context@1.1.3_@types+react@19.2.14_react@19.2.5/node_modules/@radix-ui/react-context/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1)
var import_jsx_runtime = require_jsx_runtime()
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = []
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = import_react.createContext(defaultContext)
    BaseContext.displayName = rootComponentName + 'Context'
    const index = defaultContexts.length
    defaultContexts = [...defaultContexts, defaultContext]
    const Provider = (props) => {
      const { scope, children, ...context } = props
      const Context = scope?.[scopeName]?.[index] || BaseContext
      const value = import_react.useMemo(() => context, Object.values(context))
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Context.Provider, {
        value,
        children,
      })
    }
    Provider.displayName = rootComponentName + 'Provider'
    function useContext2(consumerName, scope) {
      const Context = scope?.[scopeName]?.[index] || BaseContext
      const context = import_react.useContext(Context)
      if (context) return context
      if (defaultContext !== void 0) return defaultContext
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``)
    }
    return [Provider, useContext2]
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return import_react.createContext(defaultContext)
    })
    return function useScope(scope) {
      const contexts = scope?.[scopeName] || scopeContexts
      return import_react.useMemo(
        () => ({
          [`__scope${scopeName}`]: {
            ...scope,
            [scopeName]: contexts,
          },
        }),
        [scope, contexts],
      )
    }
  }
  createScope.scopeName = scopeName
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)]
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0]
  if (scopes.length === 1) return baseScope
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName,
    }))
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const currentScope = useScope(overrideScopes)[`__scope${scopeName}`]
        return {
          ...nextScopes2,
          ...currentScope,
        }
      }, {})
      return import_react.useMemo(
        () => ({ [`__scope${baseScope.scopeName}`]: nextScopes }),
        [nextScopes],
      )
    }
  }
  createScope.scopeName = baseScope.scopeName
  return createScope
}
//#endregion
//#region ../../cache/modules/barbearia-pro-cee5d/node_modules/.pnpm/@radix-ui+react-progress@1.1.8_@types+react-dom@19.2.3_@types+react@19.2.14__@types+rea_2c4b8744ce0dc5f890a5d292a627ca43/node_modules/@radix-ui/react-progress/dist/index.mjs
var PROGRESS_NAME = 'Progress'
var DEFAULT_MAX = 100
var [createProgressContext, createProgressScope] = createContextScope(PROGRESS_NAME)
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME)
var Progress$1 = import_react.forwardRef((props, forwardedRef) => {
  const {
    __scopeProgress,
    value: valueProp = null,
    max: maxProp,
    getValueLabel = defaultGetValueLabel,
    ...progressProps
  } = props
  if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp))
    console.error(getInvalidMaxError(`${maxProp}`, 'Progress'))
  const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX
  if (valueProp !== null && !isValidValueNumber(valueProp, max))
    console.error(getInvalidValueError(`${valueProp}`, 'Progress'))
  const value = isValidValueNumber(valueProp, max) ? valueProp : null
  const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressProvider, {
    scope: __scopeProgress,
    value,
    max,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
      'aria-valuemax': max,
      'aria-valuemin': 0,
      'aria-valuenow': isNumber(value) ? value : void 0,
      'aria-valuetext': valueLabel,
      role: 'progressbar',
      'data-state': getProgressState(value, max),
      'data-value': value ?? void 0,
      'data-max': max,
      ...progressProps,
      ref: forwardedRef,
    }),
  })
})
Progress$1.displayName = PROGRESS_NAME
var INDICATOR_NAME = 'ProgressIndicator'
var ProgressIndicator = import_react.forwardRef((props, forwardedRef) => {
  const { __scopeProgress, ...indicatorProps } = props
  const context = useProgressContext(INDICATOR_NAME, __scopeProgress)
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
    'data-state': getProgressState(context.value, context.max),
    'data-value': context.value ?? void 0,
    'data-max': context.max,
    ...indicatorProps,
    ref: forwardedRef,
  })
})
ProgressIndicator.displayName = INDICATOR_NAME
function defaultGetValueLabel(value, max) {
  return `${Math.round((value / max) * 100)}%`
}
function getProgressState(value, maxValue) {
  return value == null ? 'indeterminate' : value === maxValue ? 'complete' : 'loading'
}
function isNumber(value) {
  return typeof value === 'number'
}
function isValidMaxNumber(max) {
  return isNumber(max) && !isNaN(max) && max > 0
}
function isValidValueNumber(value, max) {
  return isNumber(value) && !isNaN(value) && value <= max && value >= 0
}
function getInvalidMaxError(propValue, componentName) {
  return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`
}
function getInvalidValueError(propValue, componentName) {
  return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`
}
var Root = Progress$1
var Indicator = ProgressIndicator
//#endregion
//#region src/components/ui/progress.tsx
var Progress = import_react.forwardRef(({ className, value, ...props }, ref) =>
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
    'data-uid': 'src/components/ui/progress.tsx:11:3',
    'data-prohibitions': '[editContent]',
    ref,
    className: cn('relative h-4 w-full overflow-hidden rounded-full bg-secondary', className),
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
      'data-uid': 'src/components/ui/progress.tsx:16:5',
      'data-prohibitions': '[editContent]',
      className: 'h-full w-full flex-1 bg-primary transition-all',
      style: { transform: `translateX(-${100 - (value || 0)}%)` },
    }),
  }),
)
Progress.displayName = Root.displayName
//#endregion
export { Progress as t }

//# sourceMappingURL=progress-Bg5B0Er8.js.map
