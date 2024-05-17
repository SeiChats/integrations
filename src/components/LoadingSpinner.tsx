interface LoaderProps {
  ringColor: string
  radii: number
  ringWidth: number
}

const Loader = function ({ ringColor, ringWidth, radii }: LoaderProps) {
  return (
    <div
      className=" aspect-square  bg-transparent border-r-transparent rounded-[50%] opacity-80 animate-[rotate_500ms_linear_infinite]"
      style={{
        border: `${ringWidth}px solid ${ringColor}`,
        width: `${radii}px`,
      }}
    />
  )
}

export default Loader
