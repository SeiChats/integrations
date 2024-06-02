import inbox from '../assets/inbox.svg'
import inboxActive from '../assets/inbox-active.svg'
import sent from '../assets/sent.svg'
import sentActive from '../assets/sent-active.svg'
import draft from '../assets/draft.svg'
import draftActive from '../assets/draft-active.svg'
import logoWhite from '../assets/logo-white.svg'
import { twMerge } from 'tailwind-merge'
import { useContext, useEffect, useState } from 'react'
import RouteContext from '../providers/ContextProvider'

interface FooterProps {
  className?: string
}

const Footer = function ({ className }: FooterProps) {
  const { navigateTo, route, prevRoute } = useContext(RouteContext)
  const [activeRoute, setActiveRoute] = useState('inbox')

  useEffect(() => {
    if (route === 'inbox') {
      setActiveRoute('inbox')
    }
    if (
      route === 'sent-messages' ||
      (route.startsWith('sent-message/') && prevRoute === 'sent-messages')
    ) {
      setActiveRoute('sent-messages')
    }
    if (
      route === 'drafts' ||
      (route.startsWith('messages/') && prevRoute === 'drafts')
    ) {
      setActiveRoute('drafts')
    }
  }, [route])

  return (
    <footer
      className={twMerge(
        'flex flex-wrap items-center justify-between capitalize mt-auto text-sm',
        className
      )}
    >
      <div className="w-full h-[1px] bg-white/5 my-4" />
      <div onClick={() => navigateTo('inbox')} className="cursor-pointer">
        <img
          src={activeRoute === 'inbox' ? inboxActive : inbox}
          alt="inbox"
          className="mx-auto mb-1"
        />
        <span className="opacity-80">inbox</span>
      </div>
      <div
        onClick={() => navigateTo('sent-messages')}
        className="cursor-pointer"
      >
        <img
          src={activeRoute === 'sent-messages' ? sentActive : sent}
          alt="sent"
          className="mx-auto mb-1 mt-1"
        />
        <span className="opacity-80">sent</span>
      </div>
      <div onClick={() => navigateTo('drafts')} className="cursor-pointer">
        <img
          src={activeRoute === 'drafts' ? draftActive : draft}
          alt="draft"
          className="mx-auto mb-1 mt-1"
        />
        <span className="opacity-80">draft</span>
      </div>
      <a href="https://app.seichats.com" target="_blank">
        <img src={logoWhite} alt="home" className="mx-auto" />
      </a>
    </footer>
  )
}

export default Footer
