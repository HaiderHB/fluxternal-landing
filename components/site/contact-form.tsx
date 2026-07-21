'use client'

import { useState, type FormEvent } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const fieldClass =
  'w-full rounded-xl border border-foreground/10 bg-foreground/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 outline-none transition-colors focus:border-foreground/30'

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="liquid-glass flex flex-col items-center gap-4 rounded-3xl p-10 text-center">
        <CheckCircle2 className="size-10 text-amber-400" aria-hidden="true" />
        <h2 className="text-xl font-semibold text-foreground">
          Thanks for reaching out
        </h2>
        <p className="max-w-sm text-hero-sub opacity-80 text-pretty">
          Your message has been received. A member of the Fluxternal team will
          get back to you shortly.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="liquid-glass flex flex-col gap-5 rounded-3xl p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground/80">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Jane Doe"
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground/80">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@company.com"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="subject" className="text-sm font-medium text-foreground/80">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          placeholder="How can we help?"
          className={fieldClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground/80">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us a little about your inquiry..."
          className={cn(fieldClass, 'resize-none')}
        />
      </div>

      <button
        type="submit"
        className={cn(
          buttonVariants({ variant: 'heroSecondary' }),
          'mt-1 self-start px-7 py-6 text-base',
        )}
      >
        Send Message
      </button>
    </form>
  )
}
