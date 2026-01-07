import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        return (
          <Toast key={id} variant={variant} {...props}>
            <div className="flex gap-4 items-start w-full">
              <div className="mt-1">
                {variant === 'destructive' && <AlertCircle className="h-5 w-5 text-red-500" />}
                {variant === 'success' && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
                {(!variant || variant === 'default') && <Info className="h-5 w-5 text-primary" />}
              </div>
              <div className="grid gap-1.5 flex-1">
                {title && <ToastTitle className="text-base font-bold tracking-tight">{title}</ToastTitle>}
                {description && (
                  <ToastDescription className="text-sm font-medium opacity-80 leading-relaxed">
                    {description}
                  </ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose className="hover:bg-slate-100/50 rounded-xl" />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
