import { twMerge } from 'tailwind-merge'

export const icons = [
    'arrow-top-right-on-square',
    'bars-3',
    'check-circle',
    'chevron-down',
    'chevron-left',
    'chevron-right',
    'chevron-up',
    'exclamation-circle',
    'exclamation-hexagon',
    'exclamation-triangle',
    'eye',
    'eye-slash',
    'facebook',
    'file',
    'heart',
    'information-circle',
    'instagram',
    'minus',
    'phone',
    'play',
    'plus',
    'shopping-cart',
    'user',
    'x-mark',
    'trash',
    'pin',
    'tv'
] as const

export type Icons = (typeof icons)[number]

type IconProps = {
  className?: string
  name: Icons
  size?: 'small' | 'medium'
  testid?: string
}

export default function Icon({
    className,
    name,
    size = 'medium',
    testid = 'icon',
}: IconProps) {
    return (
        <svg
            data-icon={name}
            data-testid={testid}
            className={twMerge(
                'shrink-0',
                size === 'small' ? 'h-5 w-5' : 'h-6 w-6',
                className,
            )}
            fill="currentColor"
        >
            <use href={`/sprite.svg#${name}`} />
        </svg>
    )
}
