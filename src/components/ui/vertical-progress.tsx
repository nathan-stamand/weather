export const VerticalProgress = ({ value, background = 'bg-blue-700' }: { value: number, background?: string }) => {
  return (
    <div
      className='relative h-20 w-8 rounded-2xl overflow-clip'
      style={{
        boxShadow: '0px 0px 0px 3px hsl(var(--background)), 0px 0px 0px 5px hsl(var(--foreground))',
      }}>
      <div
        className={`absolute ${background} bottom-0 left-0 right-0`}
        style={{ height: `${value}%` }}
      ></div>
    </div >
  )
}


