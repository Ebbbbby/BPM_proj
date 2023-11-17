
export default function LoadingSpinner({backgroundColor, color, className, size}){
  if(size && size === 'lg'){
    return (
      <div className={`loading-spinner loading-spinner-lg ${className}`}
           style={{
             borderTopColor: color ? color : undefined,
             borderColor: backgroundColor ? backgroundColor : undefined
           }}>
      </div>
    )
  }
  return (
    <span className={`loading-spinner loading-spinner-sm ${className}`}
          style={{
            borderTopColor: color ? color : undefined,
            borderColor: backgroundColor ? backgroundColor : undefined
          }}
    ></span>
  )
}