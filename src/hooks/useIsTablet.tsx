import * as React from "react"

// Define breakpoints directly in this file to avoid import issues
const MOBILE_BREAKPOINT = 640 // Small mobile devices
const TABLET_BREAKPOINT = 1024 // Tablets and small laptops

// Use named function for better Fast Refresh compatibility
function useIsTablet() {
  const [isTablet, setIsTablet] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${MOBILE_BREAKPOINT + 1}px) and (max-width: ${TABLET_BREAKPOINT}px)`)
    const onChange = () => {
      setIsTablet(window.innerWidth > MOBILE_BREAKPOINT && window.innerWidth <= TABLET_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsTablet(window.innerWidth > MOBILE_BREAKPOINT && window.innerWidth <= TABLET_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isTablet
}

export default useIsTablet
