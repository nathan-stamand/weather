export const Compass = ({ degree }: { degree: number }) => {
  return (
    <div className='w-8 h-8 bg-black dark:bg-white rounded-full grid overflow-clip'>
      <div
        className='w-1 h-8 bg-red-500 place-self-center origin-bottom'
        style={{ transform: `translateY(-50%) rotate(${degree}deg)` }}></div>
    </div>
  )
}
