import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white/95 group-[.toaster]:backdrop-blur-xl group-[.toaster]:text-slate-900 group-[.toaster]:border-slate-100 group-[.toaster]:shadow-[0_20px_50px_rgba(0,0,0,0.1)] group-[.toaster]:rounded-2xl group-[.toaster]:p-4",
          description: "group-[.toast]:text-slate-500 font-medium",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-white group-[.toast]:rounded-xl group-[.toast]:font-bold",
          cancelButton:
            "group-[.toast]:bg-slate-100 group-[.toast]:text-slate-500 group-[.toast]:rounded-xl group-[.toast]:font-bold",
          error: "group-[.toaster]:bg-red-50/90 group-[.toaster]:border-red-100 group-[.toaster]:text-red-900",
          success: "group-[.toaster]:bg-emerald-50/90 group-[.toaster]:border-emerald-100 group-[.toaster]:text-emerald-900",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
