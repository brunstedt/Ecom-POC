import Icon, { type Icons } from '../icon/Icon'

type IconButtonProps = {
  'aria-label': string
  backgroundColor?:
    | 'primary'
    | 'secondary'
    | 'transparent'
    | 'white'
    | 'black'
    | 'gray'
  icon: Icons
  onClick?: () => void
  size?: 'small' | 'medium' | 'large'
  testId?: string
}

export default function IconButton({
    'aria-label': ariaLabel,
    backgroundColor = 'transparent',
    icon,
    onClick,
    size,
    testId = 'icon-button',
}: IconButtonProps) {
    function buttonSize() {
        switch (size) {
        case 'small':
            return 'w-8 h-8'
        case 'medium':
            return 'w-10 h-10'
        case 'large':
            return 'w-10 h-10 md:w-12 md:h-12'
        default:
            return 'w-10 h-10'
        }
    }

    function buttonColor() {
        switch (backgroundColor) {
        case 'primary':
            return 'bg-primary-30 text-white'
        case 'secondary':
            return 'bg-secondary text-white'
        case 'transparent':
            return 'bg-transparent text-primary-30'
        case 'white':
            return 'bg-white text-black'
        case 'black':
            return 'bg-black text-white'
        case 'gray':
            return 'bg-neutral-95 text-black'
        default:
            return 'bg-primary-30 text-white'
        }
    }

    return (
        <button
            aria-label={ariaLabel}
            data-testid={testId}
            className={`flex items-center justify-center rounded-full ${buttonSize()} ${buttonColor()}`}
            onClick={onClick}
        >
            <Icon name={icon} />
        </button>
    )
}
