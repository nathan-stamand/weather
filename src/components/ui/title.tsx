import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const titleVariants = cva(
  "text-gray-900 dark:text-gray-200",
  {
    variants: {
      size: {
        h1: "text-6xl",
        h2:
          "text-4xl",
        h3:
          "text-3xl",
      },
    },
    defaultVariants: {
      size: "h1",
    },
  }
)


interface TitleProps
  extends React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof titleVariants> {
  children: React.ReactNode;
}

export const Title = ({ size, children }: TitleProps) => {
  let heading;
  size = size || 'h1';
  switch (size) {
    case 'h1':
      heading = <h1 className={cn(titleVariants({ size }))}>{children}</h1>
      break;
    case 'h2':
      heading = <h2 className={cn(titleVariants({ size }))}>{children}</h2>
      break;
    case 'h3':
      heading = <h3 className={cn(titleVariants({ size }))}>{children}</h3>
      break;
    default:
      const _exhaustiveCheck: never = size;
      throw new Error(`Unhandled size: ${_exhaustiveCheck}`);
  }
  return heading;
}
