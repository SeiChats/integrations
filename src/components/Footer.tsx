import inbox from '../assets/inbox.svg'
import sent from '../assets/sent.svg'
import draft from '../assets/draft.svg'
import logoWhite from '../assets/logo-white.svg'
import { twMerge } from 'tailwind-merge'

interface FooterProps {
  className?: string
}

const Footer = function ({ className }: FooterProps) {
  return (
    <footer
      className={twMerge(
        'flex flex-wrap items-center justify-between capitalize mt-auto text-sm',
        className
      )}
    >
      <div className="w-full h-[1px] bg-white/5 my-4" />
      {/* TODO change links to buttons */}
      <a href="/">
        <img src={inbox} alt="inbox" className="mx-auto mb-1" />
        <span className="opacity-80">inbox</span>
      </a>
      <a href="/">
        <img src={sent} alt="sent" className="mx-auto mb-1 mt-1" />
        <span className="opacity-80">sent</span>
      </a>
      <a href="/">
        <img src={draft} alt="draft" className="mx-auto mb-1 mt-1" />
        <span className="opacity-80">draft</span>
      </a>
      <a href="/">
        <img src={logoWhite} alt="home" className="mx-auto" />
      </a>
    </footer>
  )
}

export default Footer
