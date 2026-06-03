import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nations — Casa del Fútbol',
  description:
    'Explore the footballing nations of the world. From five-time World Cup winners to rising continental powers — discover histories, playing styles, and legends across every continent.',
}

export default function NationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
